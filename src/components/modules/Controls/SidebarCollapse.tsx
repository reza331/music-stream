'useClient'
import { useIsSideBarCollapse, useSidebarActions } from "@/stores/sideBarStore";
import { IoIosArrowBack } from "react-icons/io";

const SidbarCollapse = () => {

    const { toggleCollapse } = useSidebarActions()
    const isSideBarCollapse = useIsSideBarCollapse()

    return (
        <button onClick={toggleCollapse} className="neu__norm p-2 rounded-full transition-[background-color,scale] duration-500 hover:bg-(--hover-color) hover:scale-[1.2] hover:text-white cursor-pointer">
            <IoIosArrowBack className={`transition-transform duration-500 w-4 h-4 ${isSideBarCollapse ? '-rotate-180' : ''}`} />
        </button>
    )
}

export default SidbarCollapse