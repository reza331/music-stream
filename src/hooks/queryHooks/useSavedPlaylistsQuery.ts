import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

const useSavedPlaylistsQuery = () => {

    const { status } = useSession()

    const getSavedPlaylist = async () => {
        try {
            const res = await axios.get(`/api/savedPlaylists`)
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            throw new Error('Something went wrong')
        }
    }

    return useQuery<{ userID: string, playlistID: string | number }[]>({
        queryKey: ['saved-playlists'],
        queryFn: getSavedPlaylist,
        enabled: status === 'authenticated'
    })
}

export default useSavedPlaylistsQuery