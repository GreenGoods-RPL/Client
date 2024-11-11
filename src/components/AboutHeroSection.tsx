import Image from 'next/image'
import world_map from '@public/images/world-map.png'

export default function AboutHeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="bg-teal-100 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Our Goal</h2>
        <p className="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.</p>
        
        <div className="grid grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="space-y-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Image src="/icon.png" alt={`Icon ${num}`} width={24} height={24} />
              </div>
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-900 rounded-lg overflow-hidden">
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