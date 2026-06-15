import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

const useSaveAction = () => {

    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)


    const saveTrack = async (trackID: string | number) => {
        setIsLoading(true)
        const res = await axios.post(`/api/savedTracks`, { trackID })
        if (res.status === 201) queryClient.invalidateQueries({ queryKey: ['saved-tracks'] })
        console.log(res)
        setIsLoading(false)
        return res
    }

    const savePlaylist = async (playlistID: string | number) => {
        setIsLoading(true)
        const res = await axios.post(`/api/savedPlaylists`, { playlistID })
        if (res.status === 201) queryClient.invalidateQueries({ queryKey: ['saved-playlists'] })
        console.log(res)
        setIsLoading(false)
        return res
    }

    const removeSavedTrack = async (trackID: string | number) => {
        setIsLoading(true)
        const res = await axios.delete(`/api/savedTracks/${trackID}`)
        if (res.status === 200) queryClient.invalidateQueries({ queryKey: ['saved-tracks'] })
        console.log(res)
        setIsLoading(false)
        return res
    }
    const removeSavedPlaylist = async (playlistID: string | number) => {
        setIsLoading(true)
        const res = await axios.delete(`/api/savedPlaylists/${playlistID}`)
        if (res.status === 200) queryClient.invalidateQueries({ queryKey: ['saved-playlists'] })
        console.log(res)
        setIsLoading(false)
        return res
    }

    return { isLoading, saveTrack, savePlaylist, removeSavedPlaylist, removeSavedTrack }

}

export default useSaveAction