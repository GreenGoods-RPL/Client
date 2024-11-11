import Image from 'next/image'

export default function AboutFutureSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="rounded-lg overflow-hidden">
        <Image
          src="/collaboration.jpg"
          alt="People collaborating"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="bg-teal-100 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">The Future</h2>
        <p className="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.</p>
        
        <div className="grid grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="space-y-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Image src="/icon.png" alt={`Icon ${num}`} width={24} height={24} />
              </div>
              <h3 className="font-semibold">Title Goes Here</h3>
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}