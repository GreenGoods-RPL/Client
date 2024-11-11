import Image from 'next/image'
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
            <h3 className="font-bold text-xl mb-4">GREENGOODS</h3>
            <p className="text-sm text-gray-600 mb-4">
              We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
            </p>
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
          <p className="text-sm text-gray-600">GREENGOODS © 2000-2023. All Rights Reserved</p>
          <div className="flex space-x-4">
            <Image src="/visa.png" alt="Visa" width={40} height={25} />
            <Image src="/mastercard.png" alt="Mastercard" width={40} height={25} />
            <Image src="/paypal.png" alt="PayPal" width={40} height={25} />
            <Image src="/apple-pay.png" alt="Apple Pay" width={40} height={25} />
            <Image src="/google-pay.png" alt="Google Pay" width={40} height={25} />
          </div>
        </div>
      </div>
    </footer>
  )
}