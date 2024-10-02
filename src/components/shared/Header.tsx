// "use client";

// import SlickButton from "@/components/custom/SlickButton";
// import { Button } from "/Users/lukasgonzales/Projects/Code/Next/ai-formbuilder/components/ui/button.jsx";
// import { SignInButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect } from "react";

// function Header() {
//   const { user, isSignedIn } = useUser();
//   const path = usePathname();

//   return (
//     <>
//       <div className="p-5 border-b shadow-sm">
//         <div className="flex items-center justify-between">
//           <Link href="/">
//             <Image src={"/logo.png"} width={50} height={50} alt="logo.png" />
//           </Link>
//           {isSignedIn ? (
//             <div className="flex items-center gap-4">
//               <Link href={"/account/dashboard"}>
//                 <SlickButton />
//               </Link>
//               <UserButton />
//             </div>
//           ) : (
//             <SignInButton>
//               <Link
//                 className="group relative inline-block focus:outline-none focus:ring !bg-red-800 !bg-secondary"
//                 href="/sign-in"
//               >
//                 <span className="absolute inset-0 translate-x-0 translate-y-0 !bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>

//                 <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest !bg-transparent">
//                   Sign In
//                 </span>
//               </Link>
//             </SignInButton>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Header;
