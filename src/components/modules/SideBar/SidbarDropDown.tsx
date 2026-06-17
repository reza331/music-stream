import { DropDownType } from "@/contents/sidebarContent"
import { FC, useState } from "react"
import SideBarSingleItem from "./SideBarSingleItem"
import { IoIosArrowDown } from "react-icons/io";
import { useIsSideBarCollapse } from "@/stores/sideBarStore";

const SidbarDropDown: FC<DropDownType> = ({ text, icon: Icon, options }) => {

    const [dropOpen, setDropOpen] = useState<boolean>(false)
    const  isSideBarCollapse  = useIsSideBarCollapse()

    return (
        <div>
            <div onClick={() => setDropOpen(!dropOpen)} className={`flex ${dropOpen ? `bg-(--hover-color) text-white` : ''} ${isSideBarCollapse ? 'p-2 justify-center' : 'py-2 ps-5 pe-5'} justify-between items-center cursor-pointer font-semibold neu__norm rounded-full transition-all duration-500 hover:scale-[1.03]  hover:bg-(--hover-color) hover:text-white`}>
                <div className="flex items-center gap-1 relative">
                    <Icon className="w-5 h-5" />
                    {
                        isSideBarCollapse &&
                        <div className="w-4 h-4 bg-(--hover-color) text-white rounded-full p-1 absolute z-10 -end-3 -top-3">
                            <IoIosArrowDown className={`transition-all duration-500 w-full h-full ${dropOpen ? 'rotate-180' : ''}`} />
                        </div>
                    }
                    {
                        !isSideBarCollapse &&
                        <span>{text}</span>
                    }
                </div>
                {
                    !isSideBarCollapse &&
                    <IoIosArrowDown className={`transition-all duration-500 ${dropOpen ? 'rotate-180' : ''}`} />
                }
            </div>
            <div className={`flex flex-col grow gap-3 ${isSideBarCollapse ? '' : 'ps-3'} overflow-hidden transition-all duration-300 ${dropOpen ? 'max-h-[999px] mt-3 py-1 pe-1' : 'max-h-0 opacity-0 '} `}>
                {
                    options.map((item, index) => {
                        return (
                            <div key={index} className="drop relative">
                                <SideBarSingleItem isSubmenu={true} {...item} fontSize={12} iconW={isSideBarCollapse ? "w-3" : "w-4"} iconH={isSideBarCollapse ? "h-3" : "h-4"} />
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default SidbarDropDown