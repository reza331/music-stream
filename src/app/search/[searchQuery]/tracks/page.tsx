'use client'
import TrackCard from "@/components/modules/Cards/TrackCard"
import SpinnerLoading from "@/components/modules/Loadings/SpinnerLoading"
import useTracksQuery from "@/hooks/queryHooks/useTracksQuery"
import useScrollPagination from "@/hooks/useScrollPagination"
import { Track } from "@/types/tracks.type"
import { useParams } from "next/navigation"
import { useState } from "react"

const TrackSearchResultPage = () => {

    const { searchQuery } = useParams()

    const [tracks, setTracks] = useState<Track[]>([])
    const { isPending } = useScrollPagination<Track>({
        setData: setTracks,
        fetchHook: (page) => useTracksQuery('search', `limit=50&offset=${(page - 1) * 50}&query=${searchQuery}`, true)
    })


    return (
        <>
            <div className="neu__norm rounded-2xl p-5 text-[14px] font-bold">
                <h2>Tracks result for "{searchQuery}"</h2>
            </div>
            {
                (tracks && tracks.length !== 0) &&
                <div className="flex items-center flex-wrap justify-center gap-5 neu__norm mt-5 py-5 lg:py-10 rounded-3xl">
                    {tracks.map((track, index) => <TrackCard key={index} {...track} />)}
                </div>
            }
            {
                isPending &&
                <div className='flex w-full justify-center items-center py-5 neu__norm rounded-3xl mt-5'>
                    <SpinnerLoading borderWidth={4} textSize={16} size={20} withText={true} text='Loading data' />
                </div>
            }
        </>
    )
}

export default TrackSearchResultPage