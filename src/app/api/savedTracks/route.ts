import { checkAlreadySaved, checkSavedLimit, checkTrackExist } from "@/lib/saved-item.service";
import { savedTracksModel } from "@/models/savedTrack";
import { getNextAuthSession } from "@/utils/api/getNextAuthSession";
import dbConnect from "@/utils/database/dbConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const session = await getNextAuthSession()

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const body: { trackID: string } = await req.json()

        if (typeof body.trackID !== 'string' || !body.trackID.trim()) return Response.json({ msg: '"trackID" cannot be empty' }, { status: 400 })

        const limitReached = await checkSavedLimit(savedTracksModel, session.user.id)
        if (limitReached) return Response.json({ msg: 'Maximum Reached' }, { status: 400 })

        const alreadySaved = await checkAlreadySaved(savedTracksModel, session.user.id, 'trackID', body.trackID)
        if (alreadySaved) return Response.json({ msg: 'Item already saved' }, { status: 409 })

        const trackExists = await checkTrackExist(body.trackID)
        if (!trackExists) return Response.json({ msg: 'Track does not exist in audius' }, { status: 404 })

        const savedTrack = { trackID: body.trackID, userID: session.user.id }
        await savedTracksModel.create(savedTrack)

        return Response.json({ msg: 'Saved successfully' }, { status: 201 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}

export async function GET() {

    try {

        const session = await getNextAuthSession()

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const savedList = await savedTracksModel.find({ userID: session.user.id }).sort({ _id: -1 })

        return Response.json(savedList, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }

}


