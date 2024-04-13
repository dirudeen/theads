import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function TopBar() {
  return (
   <nav className='topbar'>
    <Link href={"/"}>
      <Image src={".."}  alt=''/>
      <p className='head-text'>Threads</p>
    </Link>
   </nav> 
  )
}
