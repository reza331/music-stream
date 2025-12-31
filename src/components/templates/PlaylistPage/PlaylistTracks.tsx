import LongTrackCard from "@/components/modules/Cards/LongTrackCard"
import usePlaylistTracksQuery from "@/hooks/queryHooks/usePlaylistTracksQuery"
import { FC } from "react"

interface PlaylistTracksProps {
    playlistID: number | string
}

const PlaylistTracks: FC<PlaylistTracksProps> = ({ playlistID }) => {

    const { data, isPending, isError, refetch } = usePlaylistTracksQuery(playlistID)

    if (!data) return null

    return (
        <div className="w-full flex flex-col gap-5 select-none">
            {data.data.map(track => <LongTrackCard {...track} />)}
        </div>
    )
}

export default PlaylistTracks