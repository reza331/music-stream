'use client'
import { useSession } from "next-auth/react";
import LoginLogoutArea from "../Controls/LoginLogout";
import ThemeToggle from "../Controls/ThemeToggle";
import { useIsSideBarCollapse } from "@/stores/sideBarStore";

const ControlSection = () => {

  const { status } = useSession()
  const  isSideBarCollapse  = useIsSideBarCollapse()

  if (status === 'loading') return null

  return (
    <div className={`${isSideBarCollapse ? 'flex-col py-3 gap-3' : 'flex-row p-5 gap-5'} neu__inner  rounded-3xl w-full flex items-center justify-center`}>
      <div className="neu__norm rounded-full p-3 flex justify-center items-center">
        <ThemeToggle />
      </div>
      <div className="neu__norm rounded-full p-3 flex justify-center items-center">
        <LoginLogoutArea />
      </div>
    </div>
  )
}

export default ControlSection