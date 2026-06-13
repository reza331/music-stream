import { useEffect, useState } from "react"
import useSavedPlaylistsQuery from "./queryHooks/useSavedPlaylistsQuery"
import useSavedTracksQuery from "./queryHooks/useSavedTracksQuery"

const useIsSaved = (targetID: string | number, targetType: 'playlist' | 'track') => {

    const [isSaved, setIsSaved] = useState(false)

    const { data: savedPlaylistsData } = useSavedPlaylistsQuery()
    const { data: savedTacksData } = useSavedTracksQuery()

    useEffect(() => {

        if (savedPlaylistsData && targetType === 'playlist') {
            const isAvailable = savedPlaylistsData.some(item => item.playlistID === targetID)
            if (isAvailable) {
                setIsSaved(true)
            }
        }

        if (savedTacksData && targetType === 'track') {
            const isAvailable = savedTacksData.some(item => item.trackID === targetID)
            if (isAvailable) {
                setIsSaved(true)
            }
        }

    }, [savedPlaylistsData, savedTacksData, targetID, targetType])

    return { isSaved, setIsSaved }
}

export default useIsSaved