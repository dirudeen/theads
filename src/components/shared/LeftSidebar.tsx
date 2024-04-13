"use client"

import { sidebarLinks } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";


export default function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="leftsidebar custom-scrollbar">
      <div className="flex flex-col gap-6 px-6 w-full">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route
        return (
          <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive ? "bg-primary-500": ""}`}>
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-light-1 max-lg:hidden">{link.label}</p>
          </Link>
        )})}
      </div>

      <div className="mt-10 px-6">
      <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/")}>
            <div className='flex cursor-pointer gap-4 px-4'>
              <Image 
              src="/assets/logout.svg"
              alt='logout button'
              width={24}
              height={24}
              />

              <p className="text-light-1 max-lg:hidden">logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}
