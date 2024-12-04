import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

export default function AboutFooter() {
  const footerSections = [
    {
      title: 'COMPANY',
      links: ['About', 'Features', 'Works', 'Career']
    },
    {
      title: 'HELP',
      links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy']
    },
    {
      title: 'FAQ',
      links: ['Account', 'Manage Deliveries', 'Orders', 'Payments']
    },
    {
      title: 'RESOURCES',
      links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist']
    }
  ]

  return (
    <footer className="bg-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">GreenGoods</h3>
            <div className="flex space-x-4">
              <Twitter className="text-gray-400" />
              <Facebook className="text-gray-400" />
              <Instagram className="text-gray-400" />
              <Youtube className="text-gray-400" />
            </div>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">GreenGoods © 2000-2023. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}