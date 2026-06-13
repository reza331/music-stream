import useIsSaved from "@/hooks/useIsSaved"
import useMusicImage from "@/hooks/useMusicImage"
import usePlayAction from "@/hooks/usePlayAction"
import useSaveAction from "@/hooks/useSaveAction"
import { Track } from "@/types/tracks.type"
import Link from "next/link"
import { FC, memo } from "react"
import { AiFillHeart, AiOutlineUser } from "react-icons/ai"
import { CiHeart, CiPlay1 } from "react-icons/ci"



const TrackCard: FC<Track> = (props) => {

    const { id, title, user, artwork, genre } = props

    const { isSaved } = useIsSaved(id, 'track')

    const artWorkImage = useMusicImage({ baseImage: artwork && artwork["150x150"], imageSize: '150x150' })
    const userProfileImage = useMusicImage({ baseImage: user.profile_picture && user.profile_picture["150x150"], imageSize: '150x150' })

    const { playAction } = usePlayAction(props, id)

    const {saveTrack , removeSavedTrack} = useSaveAction()


    return (
        <div className="select-none w-[150px] h-[250px] lg:w-[200px] lg:h-[300px] rounded-2xl flex flex-col hover:scale-[1.03] transition-transform duration-500">
            <div className="size-[150px] lg:size-[200px] rounded-t-2xl relative overflow-hidden">
                <div className="absolute bottom-0 z-30 w-full p-2 flex items-center gap-2">
                    {isSaved ? (
                        <div onClick={() => removeSavedTrack(id)} className="w-fit p-1.5 cursor-pointer bg-[#00000041] rounded-full border-2 border-[#ffffff2e] backdrop-blur-[5px] text-white">
                            <AiFillHeart className="size-3 lg:size-4 text-rose-500" />
                        </div>
                    ) : (
                        <div onClick={() => saveTrack(id)} className="w-fit p-1.5 cursor-pointer bg-[#00000041] rounded-full border-2 border-[#ffffff2e] backdrop-blur-[5px] text-white">
                            <CiHeart className="size-3 lg:size-4" />
                        </div>
                    )}
                    <div onClick={playAction} className="w-fit p-1.5 cursor-pointer bg-[#00000041] rounded-full border-2 border-[#ffffff2e] backdrop-blur-[5px] text-white">
                        <CiPlay1 className="size-3 lg:size-4" />
                    </div>
                    <div className="w-fit px-2 lg:px-5 py-1.5 cursor-pointer bg-[#00000041] rounded-full border-2 border-[#ffffff2e] backdrop-blur-[5px] text-white">
                        <Link href={`/tracks?genre=${genre}`} className="size-full line-clamp-1 text-[8px] lg:text-[10px]">{genre}</Link>
                    </div>
                </div>
                <div className="w-full h-full img_shadow rounded-t-2xl absolute z-20"></div>
                {artWorkImage && <img loading="lazy" className="size-full object-cover shadow-inner absolute z-10" src={artWorkImage} alt="" />}
            </div>
            <div className="neu__norm rounded-b-2xl p-3">
                <Link href={`/tracks/${id}`} className="block neu__norm p-3 rounded-xl h-[60px] transition-[color,background-color] duration-500 hover:text-white hover:bg-(--hover-color)">
                    <span className="font-semibold text-[10px] lg:text-[12px] line-clamp-2 w-full">{title}</span>
                </Link>
                <div className="flex items-center gap-2 py-2 neu__norm mt-3 px-3 rounded-full">
                    {userProfileImage && <img className="w-5 h-5 rounded-full" src={userProfileImage} alt="" />}
                    {!userProfileImage && <AiOutlineUser className="size-4" />}
                    <div className="text-(--alt-text) line-clamp-1 text-[10px] lg:text-[12px]">{user.name}</div>
                </div>
            </div>
        </div>
    )
}

export default memo(TrackCard)