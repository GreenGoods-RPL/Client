import React from 'react'
import Image from 'next/image'
import logo from "@public/icons/GreenGoods_transparent.png"; 

export default function Logo() {
  return (
    <div>
      {/* Top Logo */}
      <div className="absolute top-4 left-4">
        <a href="/">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </a>
      </div>
    </div>
  )
}
