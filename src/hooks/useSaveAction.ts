import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

const useSaveAction = () => {

    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const { status } = useSession()

    const requireAuth = () => {
        if (status === 'unauthenticated') {
            signIn('google', { prompt: 'select_account' })
            return false
        }

        return true
    }

    const saveTrack = async (trackID: string | number) => {

        if (!requireAuth()) return

        setIsLoading(true)

        try {

            const res = await axios.post('/api/savedTracks', { trackID })

            if (res.status === 201) {
                queryClient.invalidateQueries({
                    queryKey: ['saved-tracks']
                })
            }

            return res

        } finally {
            setIsLoading(false)
        }

    }
    const savePlaylist = async (playlistID: string | number) => {

        if (!requireAuth()) return

        setIsLoading(true)

        try {

            const res = await axios.post('/api/savedPlaylists', { playlistID })

            if (res.status === 201) {
                queryClient.invalidateQueries({
                    queryKey: ['saved-playlists']
                })
            }

            return res

        } finally {
            setIsLoading(false)
        }

    }
    const removeSavedTrack = async (trackID: string | number) => {

        if (!requireAuth()) return

        setIsLoading(true)

        try {

            const res = await axios.delete(`/api/savedTracks/${trackID}`)

            if (res.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ['saved-tracks']
                })
            }

            return res

        } finally {
            setIsLoading(false)
        }

    }
    const removeSavedPlaylist = async (playlistID: string | number) => {

        if (!requireAuth()) return

        setIsLoading(true)

        try {

            const res = await axios.delete(`/api/savedPlaylists/${playlistID}`)

            if (res.status === 200) {
                queryClient.invalidateQueries({
                    queryKey: ['saved-playlists']
                })
            }

            return res

        } finally {
            setIsLoading(false)
        }

    }

    return { isLoading, saveTrack, savePlaylist, removeSavedPlaylist, removeSavedTrack }

}

export default useSaveAction