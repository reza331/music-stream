'use client'
import PlaylistCard from "@/components/modules/Cards/PlaylistCard"
import SpinnerLoading from "@/components/modules/Loadings/SpinnerLoading"
import usePlaylistsQuery from "@/hooks/queryHooks/usePlaylistsQuery"
import useScrollPagination from "@/hooks/useScrollPagination"
import { Playlist } from "@/types/playlist.type"
import { useParams } from "next/navigation"
import { useState } from "react"

const PlaylistSearchResultPage = () => {

    const { searchQuery } = useParams()

    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const { isPending } = useScrollPagination<Playlist>({
        setData: setPlaylists,
        fetchHook: (page) => usePlaylistsQuery('search', `limit=50&offset=${(page - 1) * 50}&query=${searchQuery}`, true)
    })


    return (
        <>
            <div className="neu__norm rounded-2xl p-5 text-[14px] font-bold">
                <h2>Tracks result for "{searchQuery}"</h2>
            </div>
            {
                (playlists && playlists.length !== 0) &&
                <div className="flex items-center flex-wrap justify-center gap-5 neu__norm mt-5 py-5 lg:py-10 rounded-3xl">
                    {playlists.map((track, index) => <PlaylistCard key={index} {...track} />)}
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

export default PlaylistSearchResultPage