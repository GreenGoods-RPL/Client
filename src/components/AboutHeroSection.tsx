import Image from 'next/image'
import { HiBadgeCheck } from "react-icons/hi";
import world_map from '@public/images/world-map.png'

export default function AboutHeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <div className="bg-teal-100 rounded-lg p-8 flex flex-col justify-center">
        <h2 className="text-6xl font-bold mb-6">Our Goal</h2>
        <p className="mb-10 text-lg">Empowering responsible choices and reducing our environmental impact, one order at a time.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div key={1} className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <HiBadgeCheck className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl">Promote Green Products and Brands</h3>
            <p className="text-base">To prioritize and promote eco-friendly brands and products, ensuring every item sold meets high environmental standards.</p>
          </div>
          <div key={2} className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <HiBadgeCheck className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl">Reduce Carbon Footprint in Every Transaction</h3>
            <p className="text-base">To minimize carbon emissions through eco-friendly packaging, optimized shipping methods, and support for renewable energy-powered facilities.</p>
          </div>
          <div key={3} className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <HiBadgeCheck className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl">Educate and Engage Consumers on Sustainability</h3>
            <p className="text-base">To educate consumers on the importance of sustainable shopping while providing transparent information about product origins, materials, and environmental impacts.</p>
          </div>
          <div key={4} className="space-y-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <HiBadgeCheck className="w-10 h-10" />
            </div>
            <h3 className="font-semibold text-xl">Support Local and Ethical Sourcing</h3>
            <p className="text-base">To collaborate with local and ethically-driven suppliers, reducing transportation emissions and supporting communities aligned with sustainable values.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-900 rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src={world_map}
          alt="World connection"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
