import { TrackResponse } from "@/types/tracks.type"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type EndPoint = 'trending' | 'search'

const getTracks = async (endPoint: EndPoint, searchParams: string) => {

    try {
        const res = await axios.get(`/api/proxy/tracks/${endPoint}?${searchParams || ''}`)
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.error(error)
        throw error
    }

}

const useTracksQuery = (endPoint: EndPoint, searchParams: string, isActive: boolean) => {

    return useQuery<TrackResponse>({
        queryKey: ['tracks', endPoint, searchParams],
        queryFn: () => getTracks(endPoint, searchParams),
        enabled: isActive
    })

}

export default useTracksQuery