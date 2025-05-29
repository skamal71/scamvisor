import NavLink from "./navlink";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <img
            src="logo.png"
            alt="Scamvisor Logo"
            className="h-25 w-25 mr-20 hover:rotate-20 transform transition-duration-200 ease-in-out"
          />
        </NavLink>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/chat">Go to chat</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
