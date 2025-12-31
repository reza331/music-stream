import useMusicImage from "@/hooks/useMusicImage"
import { Track } from "@/types/tracks.type"
import Link from "next/link"
import { FC } from "react"

const TrackSearchCard: FC<Track> = (props) => {

    const { id , title, genre, artwork } = props

    const imageUrl = useMusicImage({ baseImage: artwork["150x150"], imageSize: '150x150' })

    return (
        <Link href={`/tracks/${id}`} className="w-full h-fit neu__norm rounded-lg overflow-hidden flex items-center gap-2 pe-3">
            {imageUrl && <img src={imageUrl} alt="" className="size-10 block" />}
            <div>
                <div className="text-[10px] line-clamp-1">{title}</div>
                <div className="text-[8px] text-(--alt-text)">{genre}</div>
            </div>
        </Link>
    )
}

export default TrackSearchCard