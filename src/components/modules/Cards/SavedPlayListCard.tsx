import useIsSaved from "@/hooks/useIsSaved"
import { SavedPlaylistPayload } from "@/types/saved-list.type"
import { removeSavedPlaylistHandler, savePlaylistHandler } from "@/utils/actions"
import Link from "next/link"
import { FC } from "react"
import { AiFillHeart } from "react-icons/ai"
import { CiHeart } from "react-icons/ci"

const SavedPlayListCard: FC<SavedPlaylistPayload> = (props) => {

    const { creatorName, image, playlistID, playlistName } = props
    const { isSaved, setIsSaved } = useIsSaved(playlistID, 'playlist')


    return (
        <div className="w-full neu__norm rounded-3xl h-[150px] lg:h-[90px] gap-3 flex lg:flex-row flex-col px-10 py-3 lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 h-full">
                <img loading="lazy" className="size-[67px] rounded-xl" src={image?.toString()} />
                <div className="h-full pt-1">
                    <div className="text-lg font-semibold line-clamp-1">{playlistName}</div>
                    <div className="text-(--alt-text) text-[12px] line-clamp-1">{creatorName}</div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Link href={`/playlists/${playlistID}`} className="neu__norm py-2 px-5 block rounded-xl">View</Link>
                {isSaved ? (
                    <button onClick={() => removeSavedPlaylistHandler(props, setIsSaved)} className="neu__norm flex items-center justify-center p-2 rounded-full">
                        <AiFillHeart className="size-4 lg:size-5 text-pink-400" />
                    </button>
                ) : (
                    <button onClick={() => savePlaylistHandler(props, setIsSaved)} className="neu__norm flex items-center justify-center p-2 rounded-full">
                        <CiHeart className="size-3 lg:size-5" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SavedPlayListCard