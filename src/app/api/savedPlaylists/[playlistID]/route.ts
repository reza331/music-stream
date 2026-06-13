import { savedPlaylistsModel } from "@/models/savedPlaylist"
import { getNextAuthSession } from "@/utils/api/getNextAuthSession"
import dbConnect from "@/utils/database/dbConnect"
import { NextRequest } from "next/server"

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ playlistID: string }> }) {

    try {

        const session = await getNextAuthSession()

        const { playlistID } = await params

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const deleted = await savedPlaylistsModel.findOneAndDelete({ playlistID, userID: session.user.id })

        if (!deleted) return Response.json({ msg: 'Item not found' }, { status: 404 })

        return Response.json({ msg: 'Removed from save' }, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}