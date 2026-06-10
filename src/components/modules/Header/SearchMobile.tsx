import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import TextInput from "../Inputs/TextInputs"
import useDebounce from "@/hooks/useDebounce"
import useTracksQuery from "@/hooks/queryHooks/useTracksQuery"
import usePlaylistsQuery from "@/hooks/queryHooks/usePlaylistsQuery"
import { BiSearchAlt2 } from "react-icons/bi"
import TrackSearchCard from "../Cards/TrackSearchCard"
import Link from "next/link"
import PlaylistSearchCard from "../Cards/PlaylistSearchCard"
import { AiOutlineClose } from "react-icons/ai"
import { usePathname } from "next/navigation"

interface SearchMobileProps {
    mobileSearchOpen: boolean
    setMobileSearchOpen: Dispatch<SetStateAction<boolean>>
}

const SearchMobile: FC<SearchMobileProps> = ({ mobileSearchOpen, setMobileSearchOpen }) => {

    const [searchValue, setSearchValue] = useState('')
    const debouncedSearch = useDebounce(searchValue, 1000)
    const isSearchActive = debouncedSearch.trim().length > 0
    const { data: trackData, isError: tracksError, isPending: trackPending, refetch: refetchTracks } = useTracksQuery('search', `limit=6&query=${debouncedSearch}`, isSearchActive)
    const { data: playlistData, isError: playlistsError, isPending: playlistsPending, refetch: refetchPlaylists } = usePlaylistsQuery('search', `limit=6&query=${debouncedSearch}`, isSearchActive)

    const pathname = usePathname()

    useEffect(() => {
        setMobileSearchOpen(false)
    }, [pathname])

    return (
        <div className={`${mobileSearchOpen ? `translate-x-0` : `-translate-x-full`} overflow-y-auto transition-[translate] duration-500 fixed bg-(--main-bg) w-dvw h-dvh z-90 top-0 left-0 p-5 lg:hidden`}>

            <div className="flex mb-5 gap-5 items-center">
                <TextInput value={searchValue} setValue={setSearchValue} icon={BiSearchAlt2} inputID="searchbar" place="Search ..." containerClass="py-2 gap-2 w-full" />
                <AiOutlineClose onClick={() => setMobileSearchOpen(false)} className="size-5" />
            </div>

            {searchValue && <div className="p-3 neu__inner rounded-3xl flex flex-col gap-3 mt-5">
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
            </div>}

        </div>
    )
}

export default SearchMobile