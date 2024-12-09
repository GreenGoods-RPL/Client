import Image from 'next/image'
import collaboration from '@public/images/collaboration.png'
import { HiOutlineBadgeCheck } from "react-icons/hi";

export default function AboutFutureSection() {
  return (
    <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 space-y-8 lg:space-y-0">
      <div className="rounded-lg overflow-hidden h-[600px] w-full lg:w-1/2">
        <Image
          src={collaboration}
          alt="People collaborating"
          layout="responsive"
          width={800}
          height={800}
          className="object-cover"
        />
      </div>
      
      <div className="bg-teal-100 rounded-lg p-8 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-primary">The Future</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div key={1} className="space-y-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <HiOutlineBadgeCheck className="w-7 h-7 text-primary"/>
            </div>
            <h3 className="text-lg font-semibold text-primary">Empower Sustainable Choices</h3>
            <p className="text-sm">To inspire and empower consumers to make sustainable choices by providing an eco-conscious shopping platform that promotes environmentally friendly products.</p>
          </div>
          <div key={2} className="space-y-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <HiOutlineBadgeCheck className="w-7 h-7 text-primary"/>
            </div>
            <h3 className="text-lg font-semibold text-primary">A Future of Zero-Waste Commerce</h3>
            <p className="text-sm">To lead the shift toward zero-waste e-commerce by offering products and packaging solutions that minimize environmental impact and contribute to a circular economy.</p>
          </div>
          <div key={3} className="space-y-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <HiOutlineBadgeCheck className="w-7 h-7 text-primary"/>
            </div>
            <h3 className="text-lg font-semibold text-primary">Accessible Sustainability for All</h3>
            <p className="text-sm">To make sustainable products accessible and affordable for everyone, ensuring that environmental responsibility is a part of every shopping experience.</p>
          </div>
          <div key={4} className="space-y-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <HiOutlineBadgeCheck className="w-7 h-7 text-primary"/>
            </div>
            <h3 className="text-lg font-semibold text-primary">Driving Global Environmental Impact Through Commerce</h3>
            <p className="text-sm">To leverage e-commerce as a tool to reduce global carbon footprints and champion the adoption of green business practices across industries.</p>
          </div>
        </div>
      </div>
    </div>
  )
}