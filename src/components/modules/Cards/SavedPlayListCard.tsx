import usePlaylistQuery from "@/hooks/queryHooks/usePlaylistQuery"
import useIsSaved from "@/hooks/useIsSaved"
import useMusicImage from "@/hooks/useMusicImage"
import useSaveAction from "@/hooks/useSaveAction"
import Link from "next/link"
import { FC, useEffect } from "react"
import { AiFillHeart } from "react-icons/ai"
import { CiHeart } from "react-icons/ci"
import SpinnerLoading from "../Loadings/SpinnerLoading"


const SavedPlayListCard: FC<{ userID: string, playlistID: string | number }> = ({ playlistID }) => {

    const { data, isPending } = usePlaylistQuery(playlistID)
    const imgUrl = useMusicImage({ baseImage: data?.data[0].artwork["150x150"] ?? '', imageSize: '150x150' })
    const { isSaved } = useIsSaved(playlistID, 'playlist')
    const { isLoading, savePlaylist, removeSavedPlaylist } = useSaveAction()

    useEffect(() => {
        console.log("Data => ", data);
    }, [data])

    return (
        <div className="w-full neu__norm rounded-3xl h-[150px] lg:h-[90px] gap-3 flex lg:flex-row flex-col px-10 py-3 lg:items-center lg:justify-between">
            {isPending && <div>Please wait ...</div>}
            {data?.data && <>
                <div className="flex items-center gap-3 h-full">
                    <img loading="lazy" className="size-[67px] rounded-xl" src={imgUrl as string} />
                    <div className="h-full pt-1">
                        <div className="text-lg font-semibold line-clamp-1">{data.data[0].playlist_name}</div>
                        <div className="text-(--alt-text) text-[12px] line-clamp-1">{data.data[0].user.name}</div>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <Link href={`/playlists/${playlistID}`} className="neu__norm py-2 px-5 block rounded-xl">View</Link>
                    {
                        isLoading && <div className="neu__norm flex items-center justify-center size-10 rounded-full">
                            <SpinnerLoading borderWidth={2} withText={false} className="size-4" />
                        </div>
                    }
                    {
                        (!isLoading && isSaved) && <button onClick={() => removeSavedPlaylist(playlistID)} className="neu__norm flex items-center justify-center size-10 rounded-full">
                            <AiFillHeart className="size-4 lg:size-5 text-rose-500" />
                        </button>
                    }
                    {
                        (!isLoading && !isSaved) && <button onClick={() => savePlaylist(playlistID)} className="neu__norm flex items-center justify-center size-10 rounded-full">
                            <CiHeart className="size-5 lg:size-6" />
                        </button>
                    }
                </div>
            </>}
        </div >
    )
}

export default SavedPlayListCard