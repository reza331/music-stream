import axios from "axios";

export const saveTrack = async (trackID: string) => {
    const res = await axios.post(`/api/savedTracks`, { trackID })
    return res
}