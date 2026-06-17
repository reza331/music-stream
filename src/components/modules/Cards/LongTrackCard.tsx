import useIsSaved from "@/hooks/useIsSaved"
import useMusicImage from "@/hooks/useMusicImage"
import usePlayAction from "@/hooks/usePlayAction"
import useSaveAction from "@/hooks/useSaveAction"
import { Track } from "@/types/tracks.type"
import Link from "next/link"
import { FC } from "react"
import { AiFillHeart } from "react-icons/ai"
import { CiHeart, CiPlay1 } from "react-icons/ci"
import { FaDownload } from "react-icons/fa"
import SpinnerLoading from "../Loadings/SpinnerLoading"

const LongTrackCard: FC<Track> = (props) => {

    const { id, artwork, title, user } = props
    const artworkUrl = useMusicImage({ baseImage: artwork && artwork["150x150"] , imageSize: '480x480' })
    const { playAction } = usePlayAction(props, id)
    const { isSaved } = useIsSaved(id, 'track')
    const { isLoading, saveTrack, removeSavedTrack } = useSaveAction()

    return (
        <div className="w-full neu__norm rounded-3xl h-[150px] lg:h-[90px] gap-3 flex lg:flex-row flex-col px-10 py-3 lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 h-full">
                {artworkUrl && <img loading="lazy" className="size-[67px] rounded-xl" src={artworkUrl} />}
                <div className="h-full pt-1">
                    <div className="text-lg font-semibold line-clamp-1">{title}</div>
                    <div className="text-(--alt-text) text-[12px] line-clamp-1">{user.name}</div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Link href={`/tracks/${id}`} className="neu__norm py-2 px-5 block rounded-xl">View</Link>
                <button className="neu__norm flex items-center justify-center size-10 rounded-full">
                    <CiPlay1 onClick={playAction} className="size-5 cursor-pointer" />
                </button>
                {
                    isLoading && <div className="neu__norm flex items-center justify-center size-10 rounded-full">
                        <SpinnerLoading borderWidth={2} withText={false} className="size-4" />
                    </div>
                }
                {
                    (!isLoading && isSaved) && <button onClick={() => removeSavedTrack(id)} className="neu__norm flex items-center justify-center size-10 rounded-full">
                        <AiFillHeart className="size-4 lg:size-5 text-rose-500" />
                    </button>
                }
                {
                    (!isLoading && !isSaved) && <button onClick={() => saveTrack(id)} className="neu__norm flex items-center justify-center size-10 rounded-full">
                        <CiHeart className="size-5 lg:size-6" />
                    </button>
                }
                <Link className="neu__norm flex items-center justify-center size-10 rounded-full" target="_blank" href={`/api/tracks/${id}/stream`}>
                    <FaDownload className="lg:size-4" />
                </Link>
            </div >
        </div >)
}

export default LongTrackCard