import Image from 'next/image'
import collaboration from '@public/images/collaboration.png'

export default function AboutFutureSection() {
  return (
    <div className="flex justify-between">
      <div className="rounded-lg overflow-hidden h-[480px]">
        <Image
          src={collaboration}
          alt="People collaborating"
          width={800}
          height={1200}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="bg-teal-100 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">The Future</h2>
        <p className="mb-8">Digitalized citizens using Eco-label products.</p>
        
        <div className="grid grid-cols-2 gap-8">
          <div key={1} className="space-y-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Image src="/icon.png" alt={`Icon 1`} width={24} height={24} />
            </div>
            <h3 className="font-semibold">Empower Sustainable Choices</h3>
           <p className="text-sm">To inspire and empower consumers to make sustainable choices by providing an eco-conscious shopping platform that promotes environmentally friendly products.</p>
          </div>
          <div key={2} className="space-y-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Image src="/icon.png" alt={`Icon 2`} width={24} height={24} />
            </div>
            <h3 className="font-semibold">A Future of Zero-Waste Commerce</h3>
           <p className="text-sm">To lead the shift toward zero-waste e-commerce by offering products and packaging solutions that minimize environmental impact and contribute to a circular economy.</p>
          </div>
          <div key={3} className="space-y-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Image src="/icon.png" alt={`Icon 3`} width={24} height={24} />
            </div>
            <h3 className="font-semibold">Accessible Sustainability for All</h3>
           <p className="text-sm">To make sustainable products accessible and affordable for everyone, ensuring that environmental responsibility is a part of every shopping experience.</p>
          </div>
          <div key={4} className="space-y-2">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Image src="/icon.png" alt={`Icon 4`} width={24} height={24} />
            </div>
            <h3 className="font-semibold">Driving Global Environmental Impact Through Commerce</h3>
           <p className="text-sm">To leverage e-commerce as a tool to reduce global carbon footprints and champion the adoption of green business practices across industries.</p>
          </div>
        </div>
      </div>
    </div>
  )
}