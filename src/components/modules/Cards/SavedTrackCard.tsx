import useIsSaved from "@/hooks/useIsSaved"
import usePlayAction from "@/hooks/usePlayAction"
import { SavedTrackPayload } from "@/types/saved-list.type"
import { removeSavedTrackHandler, saveTrackHandler } from "@/utils/actions"
import { toTrackFormat } from "@/utils/formatters/toTrackFormat"
import Link from "next/link"
import { FC } from "react"
import { AiFillHeart } from "react-icons/ai"
import { CiHeart, CiPlay1 } from "react-icons/ci"
import { FaDownload } from "react-icons/fa"

const SavedTrackCard: FC<SavedTrackPayload> = (props) => {

    const { image, trackID, trackTitle, uploaderName } = props

    const { isSaved, setIsSaved } = useIsSaved(trackID, 'track')
    const trackFormat = toTrackFormat(props)
    const { playAction } = usePlayAction(trackFormat, trackID)

    return (
        <div className="w-full neu__norm rounded-3xl h-[150px] lg:h-[90px] gap-3 flex lg:flex-row flex-col px-10 py-3 lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 h-full">
                <img loading="lazy" className="size-[67px] rounded-xl" src={image?.toString()} />
                <div className="h-full pt-1">
                    <div className="text-lg font-semibold line-clamp-1">{trackTitle}</div>
                    <div className="text-(--alt-text) text-[12px] line-clamp-1">{uploaderName}</div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Link href={`/tracks/${trackID}`} className="neu__norm py-2 px-5 block rounded-xl">View</Link>
                <button className="neu__norm flex items-center justify-center size-10 rounded-full">
                    <CiPlay1 onClick={playAction} className="size-5 cursor-pointer" />
                </button>
                {isSaved ? (
                    <button onClick={() => removeSavedTrackHandler(props, setIsSaved)} className="neu__norm flex items-center justify-center size-10 rounded-full">
                        <AiFillHeart className="size-4 lg:size-5 text-pink-500" />
                    </button>
                ) : (
                    <button onClick={() => saveTrackHandler(props, setIsSaved)} className="neu__norm flex items-center justify-center size-10 rounded-full">
                        <CiHeart className="size-3 lg:size-5" />
                    </button>
                )}
                <Link className="neu__norm flex items-center justify-center size-10 rounded-full" target="_blank" href={`/api/tracks/${trackID}/stream`}>
                    <FaDownload className="lg:size-4" />
                </Link>
            </div>
        </div>
    )
}

export default SavedTrackCard