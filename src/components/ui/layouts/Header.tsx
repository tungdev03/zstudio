'use client'

import Button from '@/components/ui/atoms/Button'
import { mainMenuConfig } from '@/lib/menuConfig'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {

    return (
        <>
            <div className="w-full h-20 shadow-md flex items-center justify-between px-28">
                <Image src="/assets/logo.png" alt="Z-Studio Logo" width={100} height={100} className='p-2' />
                {/* Menu Navigation */}
                <nav className='flex gap-8 items-center'>
                    {mainMenuConfig.map((item) => (
                        <div key={item.id} className='relative group flex gap-3.5'>
                            <Link
                                href={item.href}
                                className='text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2'
                            >
                                {item.label}
                                {/* {item.children && (
                                    <span className='ml-1 text-xs'>▼</span>
                                )} */}
                            </Link>

                            {/* Dropdown Menu */}
                            {/* {item.children && (
                                <div
                                    className={`absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-50`}
                                >
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.id}
                                            href={child.href}
                                            className='block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 first:rounded-t-md last:rounded-b-md transition-colors'
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )} */}
                        </div>
                    ))}
                </nav>

                <Button variant="primary" className="w-32 h-11">
                    Đăng nhập
                </Button>
            </div>
        </>
    )
}

export default Header
