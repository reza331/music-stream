'use client'
import NavigateSection from "./NavigateSection"
import SidbarCollapse from "../Controls/SidebarCollapse";
import SidebarClose from "../Controls/SideBarClose";
import ControlSection from "./ControlSection";
import Clock from "../Clock/Clock";
import SimpleBar from "simplebar-react";
import ProfileSection from "./ProfileSection";
import { useIsSideBarCollapse, useIsSideBarOpen, useSidebarActions } from "@/stores/sideBarStore";

const SideBar = () => {

    const {setSideBarOpen} = useSidebarActions()
    const isSideBarOpen = useIsSideBarOpen()
    const isSideBarCollapse = useIsSideBarCollapse()
   

    return (
        <>
            <div className={`absolute bg-(--main-bg) z-51 top-0 start-0 ${isSideBarCollapse ? 'w-[100px]' : 'w-[250px]'} ${isSideBarOpen ? '' : '-translate-x-full'} h-dvh neu__norm transition-[translate] lg:transition-[translate,width] duration-500 overflow-hidden`}>
                <SimpleBar className="h-dvh" >
                    <div className={`flex flex-col gap-5 ${isSideBarCollapse ? 'py-5 px-2' : 'p-5'}`}>
                        <div className={`flex gap-3 ${isSideBarCollapse ? 'justify-center' : 'justify-end'}`}>
                            <SidbarCollapse />
                            <SidebarClose />
                        </div>
                        <ProfileSection />
                        <NavigateSection />
                        <Clock />
                        <ControlSection />
                    </div>
                </SimpleBar>
            </div>
            {/* mobile overlay */}
            {
                isSideBarOpen &&
                <div onClick={() => setSideBarOpen(false)} className="w-dvw h-dvh fixed z-40 lg:hidden" />
            }
        </>
    )
}

export default SideBar