import SpinnerLoading from "@/components/modules/Loadings/SpinnerLoading"
import useIsSaved from "@/hooks/useIsSaved"
import useMusicImage from "@/hooks/useMusicImage"
import useSaveAction from "@/hooks/useSaveAction"
import { Playlist } from "@/types/playlist.type"
import { AiFillHeart, AiOutlineUser } from "react-icons/ai"
import { BsFillClipboardXFill } from "react-icons/bs"
import { CiHeart } from "react-icons/ci"

const PlaylistInfoBox = (props: Playlist) => {

    const { id, artwork, playlist_name, description, user } = props
    const artworkUrl = useMusicImage({ baseImage: artwork && artwork["150x150"], imageSize: '480x480' })
    const userProfileImage = useMusicImage({ baseImage: user.profile_picture && user.profile_picture["150x150"], imageSize: '480x480' })
    const { isSaved } = useIsSaved(id, 'playlist')
    const {isLoading , removeSavedPlaylist , savePlaylist} = useSaveAction()

    return (
        <div className="select-none xl:h-[330px] flex flex-col xl:flex-row items-center neu__norm rounded-2xl overflow-hidden">
            {
                artworkUrl &&
                <div className={`relative flex justify-center w-full xl:w-[330px] h-[200px] xl:h-[330px] bg-red-100`}>
                    <div style={{ backgroundImage: `url('${artworkUrl}')` }} className="absolute xl:hidden size-full top-0 left-0 blur-md"></div>
                    <img src={artworkUrl} className="size-[200px] xl:size-full absolute" />
                </div>
            }
            <div className="h-full w-full gap-5 xl:w-[calc(100%-330px)] flex flex-col p-3 xl:p-5">
                <h2 className="text-lg xl:text-2xl font-semibold line-clamp-1">{playlist_name}</h2>
                <div className="w-fit flex items-center neu__norm ps-1 pe-10 py-1 rounded-full">
                    {userProfileImage && <img className="size-5 lg:size-10 rounded-full block me-2" src={userProfileImage} />}
                    {!userProfileImage && <AiOutlineUser className="size-5 mr-2" />}
                    <div className="font-semibold text-[8px] lg:text-[12px] line-clamp-1">{user.name}</div>
                </div>
                <div className="grow">
                    {
                        description ? (
                            <div className="line-clamp-6" >{description}</div>
                        ) : (
                            <div className="size-full p-5 flex justify-center items-center border-2 border-dashed border-(--alt-text) rounded-2xl">
                                <BsFillClipboardXFill className="size-7 mb-2" />No description Written
                            </div>
                        )
                    }
                </div>
            </div>
            {
                isLoading && <div className="xl:text-[16px] flex items-center ps-5 gap-2 neu__norm py-3 w-[120px] xl:w-[170px] rounded-2xl hover:translate-x-1 transition-[translate] duration-500">
                    <SpinnerLoading withText={true} text="loading" className="size-4" />
                </div>
            }
            {
                !isLoading &&
                <button onClick={isSaved ? () => removeSavedPlaylist(id) : () => savePlaylist(id)} className="xl:text-[16px] flex items-center ps-5 gap-2 neu__norm py-3 w-[120px] xl:w-[170px] rounded-2xl hover:translate-x-1 transition-[translate] duration-500">{isSaved ? <AiFillHeart className="size-4 xl:size-7" /> : <CiHeart className="size-4 xl:size-7" />}{isSaved ? `Unsave` : `Save`}</button>
            }
        </div>
    )
}

export default PlaylistInfoBox