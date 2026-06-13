import { savedTracksModel } from "@/models/savedTrack"
import { getNextAuthSession } from "@/utils/api/getNextAuthSession"
import dbConnect from "@/utils/database/dbConnect"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ trackID: string }> }) {

    try {

        const session = await getNextAuthSession()

        const { trackID } = await params

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const track = savedTracksModel.findOne({ trackID })

        if (!track) return Response.json({ msg: 'Item not found' }, { status: 404 })

        return Response.json(track, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }

}