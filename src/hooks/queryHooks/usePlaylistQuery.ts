import { Playlist } from "@/types/playlist.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Response {
    data: Playlist[]
}

const usePlaylistQuery = (playlistID: string | number) => {


    const getPlaylist = async () => {

        try {
            const res = await axios.get(`/api/proxy/playlists/${playlistID}`)
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            throw new Error('Something went wrong')
        }

    }

    return useQuery<Response>({
        queryKey: ['playlist', playlistID],
        queryFn: getPlaylist,
    })

}

export default usePlaylistQuery