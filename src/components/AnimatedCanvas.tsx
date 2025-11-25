"use client"

import React, { useEffect, useRef, useState } from 'react'
import { CanvasConfig, CanvasBlob } from '@/lib/canvasConfig'

interface AnimatedBlob extends CanvasBlob {
  image: HTMLImageElement | null
}

type Props = {
  className?: string
  config: CanvasConfig
}

export default function AnimatedCanvas({ className = '', config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animatedBlobsRef = useRef<AnimatedBlob[]>([])
  const bgImageRef = useRef<HTMLImageElement | null>(null)
  const bgColorRef = useRef<string | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Load blob images and optional background image
  useEffect(() => {
    let mounted = true

    const blobLoaders = config.blobs.map((blob) => {
      return new Promise<AnimatedBlob>((resolve) => {
        if (blob.src) {
          const img = new Image()
          img.onload = () => resolve({ ...blob, image: img })
          img.onerror = () => {
            console.error(`Failed to load image for blob`, blob.src)
            resolve({ ...blob, image: null })
          }
          img.src = blob.src
        } else {
          resolve({ ...blob, image: null })
        }
      })
    })

    const isUrl = (s?: string) => !!s && (/^(https?:)?\//.test(s) || s.startsWith('http'))

    const bgPromise: Promise<HTMLImageElement | null> = isUrl(config.background)
      ? new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = () => {
            console.error('Failed to load background image', config.background)
            resolve(null)
          }
          img.src = config.background as string
        })
      : Promise.resolve(null)

    Promise.all([Promise.all(blobLoaders), bgPromise]).then(([loadedBlobs, bgImg]) => {
      if (!mounted) return
      const loaded = loadedBlobs as AnimatedBlob[]
      animatedBlobsRef.current = loaded
      bgImageRef.current = bgImg
      // if background wasn't an image, store as color for fallback
      if (!bgImg && typeof config.background === 'string') {
        // only set color if it looks like a CSS color (not URL)
        if (!/^(https?:)?\//.test(config.background)) {
          bgColorRef.current = config.background
        } else {
          bgColorRef.current = null
        }
      } else {
        bgColorRef.current = null
      }
      setImagesLoaded(true)
    })

    return () => {
      mounted = false
    }
  }, [config.blobs, config.background])

  useEffect(() => {
    if (!imagesLoaded) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      const c = canvasRef.current!
      const rect = c.getBoundingClientRect()
      c.width = Math.max(1, Math.floor(rect.width * dpr))
      c.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    let raf = 0

    const draw = () => {
      resizeCanvas()
      const c = canvasRef.current!
      const w = c.width / dpr
      const h = c.height / dpr
      const minDim = Math.min(w, h)

      ctx.clearRect(0, 0, w, h)

      // draw background: if a background image was provided and loaded, draw it
      const currentBg = bgImageRef.current
      if (currentBg) {
        // draw background covering the canvas (cover-like behavior)
        const img = currentBg
        const imgRatio = img.width / img.height
        const canvasRatio = w / h
        let dw = w
        let dh = h
        let dx = 0
        let dy = 0

        if (imgRatio > canvasRatio) {
          // image is wider -> fit height, crop sides
          dh = h
          dw = h * imgRatio
          dx = -(dw - w) / 2
        } else {
          // image is taller -> fit width, crop top/bottom
          dw = w
          dh = w / imgRatio
          dy = -(dh - h) / 2
        }

        ctx.drawImage(img, dx, dy, dw, dh)
      } else if (bgColorRef.current) {
        // treat background as color
        ctx.fillStyle = bgColorRef.current
        ctx.fillRect(0, 0, w, h)
      }

      const currentBlobs = animatedBlobsRef.current
      currentBlobs.forEach((blob) => {
        // simple movement
        blob.x += blob.vx
        blob.y += blob.vy
        if (blob.x - blob.r < 0 || blob.x + blob.r > 1) blob.vx *= -1
        if (blob.y - blob.r < 0 || blob.y + blob.r > 1) blob.vy *= -1

        const radius = blob.r * minDim
        const size = radius * 2
        const dx = blob.x * w - radius
        const dy = blob.y * h - radius

        if (blob.image) {
          ctx.drawImage(blob.image, dx, dy, size, size)
        } else {
          // fallback: draw gradient circle
          const cx = blob.x * w
          const cy = blob.y * h
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
          g.addColorStop(0, `hsla(${blob.hue},85%,65%,0.95)`)
          g.addColorStop(0.35, `hsla(${(blob.hue + 30) % 360},85%,60%,0.6)`)
          g.addColorStop(1, `hsla(${(blob.hue + 60) % 360},85%,55%,0.12)`)
          ctx.globalCompositeOperation = 'screen'
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalCompositeOperation = 'source-over'
        }
      })

        raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resizeCanvas)
    }
    }, [imagesLoaded])

  return <canvas ref={canvasRef} className={className} />
}