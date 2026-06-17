import { useIsSideBarCollapse } from "@/stores/sideBarStore";
import { useSession } from "next-auth/react";
const ProfileSection = () => {

    const  isSideBarCollapse  = useIsSideBarCollapse()
    const { data, status } = useSession()

    if (status === 'unauthenticated' || status === 'loading') return null

    return (
        <div className={`rounded-3xl w-full flex ${isSideBarCollapse ? 'justify-center' : 'p-3 neu__inner'}`}>
            {
                status === 'authenticated' &&
                <div className={`w-full flex ${isSideBarCollapse ? 'justify-center' : 'justify-start'} items-center gap-2 select-none`}>
                    <img className="size-[47px] rounded-full" src={data?.user?.image?.toString()} alt="" />
                    <div className={`w-full me-3 ${isSideBarCollapse ? 'hidden' : 'block'}`}>
                        <div className="font-semibold text-[12px] line-clamp-1 w-full">{data?.user?.name}</div>
                        <div className="text-[8px] line-clamp-1 text-(--alt-text) w-full">{data?.user?.email}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileSection