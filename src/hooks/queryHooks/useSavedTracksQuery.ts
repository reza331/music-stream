import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

const useSavedTracksQuery = () => {

    const { status } = useSession()

    const getSavedTracks = async () => {
        try {
            const res = await axios.get(`/api/savedTracks`)
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            throw new Error('Something went wrong')
        }
    }

    return useQuery<{ userID: string, trackID: string | number }[]>({
        queryKey: ['saved-tracks'],
        queryFn: getSavedTracks,
        enabled: status === 'authenticated'
    })
}

export default useSavedTracksQuery