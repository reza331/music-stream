'useClient'
import { useSidebarActions } from "@/stores/sideBarStore";
import { CgClose } from "react-icons/cg";

const SidebarClose = () => {

    const { setSideBarOpen } = useSidebarActions()
    return (
        <button onClick={() => setSideBarOpen(false)} className="lg:hidden neu__norm p-2 rounded-full transition-[scale,background-color] duration-500 hover:bg-(--hover-color) hover:scale-[1.2] hover:text-white cursor-pointer">
            <CgClose className={`w-4 h-4`} />
        </button>
    )
}

export default SidebarClose