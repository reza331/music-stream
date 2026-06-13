import { checkAlreadySaved, checkPlaylistExist, checkSavedLimit } from "@/lib/saved-item.service";
import { savedPlaylistsModel } from "@/models/savedPlaylist";
import { getNextAuthSession } from "@/utils/api/getNextAuthSession";
import dbConnect from "@/utils/database/dbConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const session = await getNextAuthSession()

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const body: { playlistID: string } = await req.json()

        if (typeof body.playlistID !== 'string' || !body.playlistID.trim()) return Response.json({ msg: '"playlistID" cannot be empty' }, { status: 400 })

        const limitReached = await checkSavedLimit(savedPlaylistsModel, session.user.id)
        if (limitReached) return Response.json({ msg: 'Maximum Reached' }, { status: 400 })

        const alreadySaved = await checkAlreadySaved(savedPlaylistsModel, session.user.id, 'playlistID', body.playlistID)
        if (alreadySaved) return Response.json({ msg: 'Item already saved' }, { status: 409 })

        const trackExists = await checkPlaylistExist(body.playlistID)
        if (!trackExists) return Response.json({ msg: 'Playlist does not exist in audius' }, { status: 404 })

        const savedPlaylist = { playlistID: body.playlistID, userID: session.user.id }
        await savedPlaylistsModel.create(savedPlaylist)

        return Response.json({ msg: 'Testing works fine' }, { status: 201 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}

export async function GET(req: NextRequest) {

    try {

        const session = await getNextAuthSession()

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const savedList = await savedPlaylistsModel.find({ userID: session.user.id })

        return Response.json(savedList, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }

}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getNextAuthSession()

        if (!session) {
            return Response.json({ msg: 'unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const body = await req.json()

        const deleted = await savedPlaylistsModel.findOneAndDelete({ playlistID: body.playlistID, userID: session.user.id })

        if (!deleted) {
            return Response.json({ msg: 'Item not found' }, { status: 404 })
        }

        return Response.json({ msg: 'Removed from save' }, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}

