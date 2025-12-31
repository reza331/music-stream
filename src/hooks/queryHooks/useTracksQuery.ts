import { TrackResponse } from "@/types/tracks.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useTracksQuery = (endPoint: ('trending' | 'search'), searchParams: string, isActive: boolean) => {

    const getTracks = async () => {

        try {
            const res = await axios.get(`/api/proxy/tracks/${endPoint}?${searchParams || ''}`)
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            throw new Error('Something went wrong')
        }

    }

    return useQuery<TrackResponse>({
        queryKey: ['tracks' , endPoint , searchParams],
        queryFn: getTracks,
        enabled: isActive 
    })

}

export default useTracksQuery