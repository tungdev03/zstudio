export type MenuItem = {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
  children?: MenuItem[]
  badge?: string | number
}

export const mainMenuConfig: MenuItem[] = [
  {
    id: 'home',
    label: 'Trang chủ',
    href: '/',
  },
  {
    id: 'services',
    label: 'Dịch vụ',
    href: '/services',
    // children: [
    //   {
    //     id: 'web-design',
    //     label: 'Thiết kế web',
    //     href: '/services/web-design',
    //   },
    //   {
    //     id: 'mobile-app',
    //     label: 'Ứng dụng di động',
    //     href: '/services/mobile-app',
    //   },
    //   {
    //     id: 'branding',
    //     label: 'Branding',
    //     href: '/services/branding',
    //   },
    // ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    id: 'about',
    label: 'Về chúng tôi',
    href: '/about',
  },
  {
    id: 'contact',
    label: 'Liên hệ',
    href: '/contact',
  },
]

export const footerMenuConfig: MenuItem[] = [
  {
    id: 'privacy',
    label: 'Chính sách bảo mật',
    href: '/privacy',
  },
  {
    id: 'terms',
    label: 'Điều khoản sử dụng',
    href: '/terms',
  },
  {
    id: 'sitemap',
    label: 'Sơ đồ trang',
    href: '/sitemap',
  },
]

export default mainMenuConfig
