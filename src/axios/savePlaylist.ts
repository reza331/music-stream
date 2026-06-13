import axios from "axios";

export const savePlaylist = async (playlistID: string) => {
    const res = await axios.post(`/api/savedPlaylists`, playlistID)
    return res
}