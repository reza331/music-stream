import { mainApi } from "@/axios/mainApi";
import { SavedTrack, savedTracksModel } from "@/models/savedTrack";
import { getNextAuthSession } from "@/utils/api/getNextAuthSession";
import dbConnect from "@/utils/database/dbConnect";
import { model, Model } from "mongoose";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {

    try {

        const session = await getNextAuthSession()

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()

        const body = await req.json()

        if (typeof body.trackID !== 'string' || !body.trackID.trim()) return Response.json({ msg: '"trackID" cannot be empty' }, { status: 400 })

        const limitReached = await checkSavedLimit(savedTracksModel, session.user.id)
        if (limitReached) return Response.json({ msg: 'Maximum Reached' }, { status: 403 })

        const alreadySaved = await checkAlreadySaved(savedTracksModel, session.user.id, body.trackID)
        if (alreadySaved) return Response.json({ msg: 'Item already saved' }, { status: 409 })

        const trackExists = await checkTrackExist(body.trackID)
        if (!trackExists) return Response.json({ msg: 'Track does not exist in audius' }, { status: 400 })

        const savedTrack = { trackID: body.trackID, userID: session.user.id }
        await savedTracksModel.create(savedTrack)

        return Response.json({ msg: 'Saved successfully' }, { status: 201 })

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

        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get('page')) || 1

        const savedList = await getPagedList(savedTracksModel, session.user.id, page)

        return Response.json(savedList, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }

}

export async function DELETE(req: NextRequest) {

    try {

        const session = await getNextAuthSession()

        if (!session) return Response.json({ msg: 'unauthorized' }, { status: 401 })

        await dbConnect()
        const body = await req.json()

        const deleted = await savedTracksModel.findOneAndDelete({ trackID: body.trackID, userID: session.user.id })

        if (!deleted) {
            return Response.json({ msg: 'Item not found' }, { status: 404 })
        }

        return Response.json({ msg: 'Removed from save' }, { status: 200 })

    } catch (err) {

        console.log('Error =>', err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })

    }
}


const checkSavedLimit = async (model: Model<SavedTrack>, userID: string, limit = 300) => {
    const count = await model.countDocuments({ userID })
    return count >= limit
}
const checkAlreadySaved = async (model: Model<SavedTrack>, userID: string, trackID: string) => {
    const track = await model.exists({ trackID, userID })
    return Boolean(track)
}
const checkTrackExist = async (id: string) => {
    try {
        await mainApi.get(`/tracks/${id}`)
        return true
    } catch {
        return false
    }
}
const getPagedList = async (model: Model<SavedTrack>, userID: string, page: number = 1, limit = 5) => {

    const totalCount = await model.countDocuments({ userID })

    const totalPages = Math.ceil(totalCount / limit)

    const safePage = Math.min(Math.max(page, 1), totalPages)

    const skip = (safePage - 1) * limit

    const pagedData = await model.find({ userID }).skip(skip).limit(limit).lean()

    return {
        data: pagedData,
        page: safePage,
        totalPages,
        totalCount
    }

}
