import { BiSearchAlt2 } from "react-icons/bi"
import TextInput from "../Inputs/TextInputs"
import { useEffect, useRef, useState } from "react"
import useTracksQuery from "@/hooks/queryHooks/useTracksQuery"
import useDebounce from "@/hooks/useDebounce"
import TrackSearchCard from "../Cards/TrackSearchCard"
import Link from "next/link"
import usePlaylistsQuery from "@/hooks/queryHooks/usePlaylistsQuery"
import PlaylistSearchCard from "../Cards/PlaylistSearchCard"
import { usePathname } from "next/navigation"
import useClickOutside from "@/hooks/useClickOutside"

const SearchSection = () => {

    const [searchValue, setSearchValue] = useState('')
    const debouncedSearch = useDebounce(searchValue, 1000)
    const isSearchActive = debouncedSearch.trim().length > 0
    const { data: trackData, isError: tracksError, isPending: trackPending, refetch: refetchTracks } = useTracksQuery('search', `limit=5&query=${debouncedSearch}`, isSearchActive)
    const { data: playlistData, isError: playlistsError, isPending: playlistsPending, refetch: refetchPlaylists } = usePlaylistsQuery('search', `limit=5&query=${debouncedSearch}`, isSearchActive)

    const pathname = usePathname()

    useEffect(() => {
        setSearchValue('')
    }, [pathname])

    const searchboxRef = useRef<HTMLDivElement>(null)

    useClickOutside(searchboxRef, () => setSearchValue(''), !!searchValue)

    return (
        <div ref={searchboxRef} className="relative">
            {searchValue && <div className="bg-(--main-bg) p-1 w-[300px] neu__norm rounded-3xl absolute top-11 start-[-50px] z-50">
                <div className="p-3 neu__inner rounded-3xl flex flex-col gap-3">
                    {/* section title & view all tracks */}
                    <div className="flex justify-between items-center px-5"><span className="text-[10px]">Tracks</span><Link href={`/search/${searchValue}/tracks`} className="text-[8px] text-(--alt-text)">view all</Link></div>
                    {/* loading tracks */}
                    {trackPending && <div className="w-full text-center py-7 text-[10px]">Fetching data, please wait ...</div>}
                    {/* error for tracks */}
                    {tracksError && <div className="w-full text-center py-7 text-[10px]">Fetching data failed , <button onClick={() => refetchTracks()} className="text-cyan-600">retry</button> </div>}
                    {/* render tracks result  */}
                    {(trackData && !trackPending) && trackData.data.map(track => <TrackSearchCard key={track.id} {...track} />)}
                    {/* section title & view all playlists */}
                    <div className="flex justify-between items-center px-5"><span className="text-[10px]">Playlists</span><Link href={`/search/${searchValue}/playlists`} className="text-[8px] text-(--alt-text)">view all</Link></div>
                    {/* loading playlist */}
                    {playlistsPending && <div className="w-full text-center py-7 text-[10px]">Fetching data, please wait ...</div>}
                    {/* error for playlists */}
                    {playlistsError && <div className="w-full text-center py-7 text-[10px]">Fetching data failed , <button onClick={() => refetchPlaylists()} className="text-cyan-600">retry</button> </div>}
                    {/* render playlists result */}
                    {(playlistData && !playlistsPending) && playlistData.data.map(playlist => <PlaylistSearchCard key={playlist.id} {...playlist} />)}
                </div>
            </div>}
            <TextInput value={searchValue} setValue={setSearchValue} icon={BiSearchAlt2} inputID="searchbar" place="Search ..." containerClass="py-2 gap-2" />
        </div>
    )
}

export default SearchSection


