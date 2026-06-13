import { useMemo } from "react"
import useSavedPlaylistsQuery from "./queryHooks/useSavedPlaylistsQuery"
import useSavedTracksQuery from "./queryHooks/useSavedTracksQuery"

const useIsSaved = (
    targetID: string | number,
    targetType: 'playlist' | 'track'
) => {

    const { data: savedPlaylistsData } = useSavedPlaylistsQuery()
    const { data: savedTracksData } = useSavedTracksQuery()

    const savedPlaylistIds = useMemo(
        () => new Set(savedPlaylistsData?.map(item => item.playlistID) ?? []),
        [savedPlaylistsData]
    )

    const savedTrackIds = useMemo(
        () => new Set(savedTracksData?.map(item => item.trackID) ?? []),
        [savedTracksData]
    )

    const isSaved =
        targetType === 'playlist'
            ? savedPlaylistIds.has(String(targetID))
            : savedTrackIds.has(String(targetID))

    return { isSaved }
}

export default useIsSaved