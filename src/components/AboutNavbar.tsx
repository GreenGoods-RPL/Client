import { Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'

export default function AboutNavbar() {
  return (
    <nav className="bg-teal-600 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Image src="/logo.png" alt="GreenGoods" width={40} height={40} />
          <div className="space-x-4">
            <a href="#" className="text-white">Leaderboard</a>
            <a href="#" className="text-white">Home</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-96 px-4 py-2 rounded-lg"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <ShoppingCart className="text-white" />
          <User className="text-white" />
        </div>
      </div>
    </nav>
  )
}