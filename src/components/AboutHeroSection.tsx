import Image from 'next/image'
import { HiBadgeCheck } from "react-icons/hi";
import world_map from '@public/images/world-map.png'

export default function AboutHeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <div className="bg-teal-100 rounded-lg p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">Our Goal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div key={1} className="space-y-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
              <HiBadgeCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-primary">Promote Green Products and Brands</h3>
            <p className="text-sm">To prioritize and promote eco-friendly brands and products, ensuring every item sold meets high environmental standards.</p>
          </div>
          <div key={2} className="space-y-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
              <HiBadgeCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-primary">Reduce Carbon Footprint in Every Transaction</h3>
            <p className="text-sm">To minimize carbon emissions through eco-friendly packaging, optimized shipping methods, and support for renewable energy-powered facilities.</p>
          </div>
          <div key={3} className="space-y-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
            <HiBadgeCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-primary">Educate and Engage Consumers on Sustainability</h3>
            <p className="text-sm">To educate consumers on the importance of sustainable shopping while providing transparent information about product origins, materials, and environmental impacts.</p>
          </div>
          <div key={4} className="space-y-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
            <HiBadgeCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg text-primary">Support Local and Ethical Sourcing</h3>
            <p className="text-sm">To collaborate with local and ethically-driven suppliers, reducing transportation emissions and supporting communities aligned with sustainable values.</p>
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
