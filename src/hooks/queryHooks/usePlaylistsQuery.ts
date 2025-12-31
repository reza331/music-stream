import { PlaylistResponse } from "@/types/playlist.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const usePlaylistsQuery = (endPoint: ('trending' | 'search') ,searchParams: string , isActive:boolean) => {

    const getPlaylists = async () => {
        
        try {
            const res = await axios.get(`/api/proxy/playlists/${endPoint}?${searchParams || ''}`)
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            throw new Error('Something went wrong')
        }

    }

    return useQuery<PlaylistResponse>({
        queryKey: ['playlists', searchParams],
        queryFn: getPlaylists,
        enabled:isActive
    })

}

export default usePlaylistsQuery