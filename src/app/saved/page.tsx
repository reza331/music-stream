'use client'
import SavedPlaylists from "@/components/templates/SavedPage/SavedPlaylists"
import SavedTracks from "@/components/templates/SavedPage/SavedTracks"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const SavedPage = () => {

    const { status } = useSession()

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/')
        }
    }, [status])

    if (status !== 'authenticated') return null

    return (
        <div className="flex flex-col gap-5">
            <SavedTracks />
            <SavedPlaylists />
        </div>
    )
}

export default SavedPage