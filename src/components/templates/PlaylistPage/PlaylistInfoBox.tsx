import useMusicImage from "@/hooks/useMusicImage"
import { Playlist } from "@/types/playlist.type"
import { BsFillClipboardXFill } from "react-icons/bs"

const PlaylistInfoBox = (props: Playlist) => {

    const { artwork, playlist_name, description , user } = props
    const artworkUrl = useMusicImage({ baseImage: artwork["150x150"] ?? null, imageSize: '480x480' })
    const userProfilePicture = useMusicImage({ baseImage: user.profile_picture["150x150"] ?? null, imageSize: '480x480' })

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
                    {userProfilePicture && <img className="size-5 lg:size-10 rounded-full block me-2" src={userProfilePicture} />}
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
        </div>
    )
}

export default PlaylistInfoBox