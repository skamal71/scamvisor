"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { use } from "react";
export default function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-white hover:text-rose-500 ",
        className,
        isActive ? "text-rose-500" : "text-white"
      )}
    >
      {children}
    </Link>
  );
}
