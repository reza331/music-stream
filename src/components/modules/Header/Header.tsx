import Logo from "../Logo/Logo";
import ProfileSection from "./ProfileSection";
import LoginLogoutArea from "../Controls/LoginLogout";
import ThemeToggle from "../Controls/ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSideBarStore } from "@/stores/sideBarStore";
import SearchSection from "./SearchSection";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import SearchMobile from "./SearchMobile";

export default function Header() {

  const { setSideBarOpen } = useSideBarStore()
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="w-full h-[55px] neu__norm rounded-full flex items-center justify-between px-10">
        {/* logo */}
        <Logo />
        {/* Clock & bell */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
          <SearchSection />
          <ProfileSection />
          <div className="-ms-2"><LoginLogoutArea /></div>
        </div>
        <div className="flex items-center gap-5 lg:hidden">
          <button onClick={() => setMobileSearchOpen(true)}>
            <BiSearchAlt2 className="size-6" />
          </button>
          <button onClick={() => setSideBarOpen(true)}>
            <GiHamburgerMenu className="size-6" />
          </button>
        </div>
      </div>
      <SearchMobile mobileSearchOpen={mobileSearchOpen} setMobileSearchOpen={setMobileSearchOpen} />
    </div>
  )
}
