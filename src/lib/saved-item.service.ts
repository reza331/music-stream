import { mainApi } from "@/axios/mainApi"
import { Model } from "mongoose"

export const checkSavedLimit = async <T>(model: Model<T>, userID: string, limit = 150) => {
    const count = await model.countDocuments({ userID })
    return count >= limit
}

export const checkAlreadySaved = async <T>(model: Model<T>, userID: string, fieldName: string, targetID: string) => {
    const target = await model.exists({ [fieldName]: targetID, userID })
    return Boolean(target)
}

export const getPagedList = async <T>(model: Model<T>, userID: string, page: number = 1, limit = 5) => {

    const totalCount = await model.countDocuments({ userID })

    if (totalCount === 0) {
        return {
            data: [],
            page: 1,
            totalPages: 0,
            totalCount: 0
        }
    }

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

export const checkPlaylistExist = async (id: string) => {
    try {
        await mainApi.get(`/playlists/${id}`)
        return true
    } catch {
        return false
    }
}

export const checkTrackExist = async (id: string) => {
    try {
        await mainApi.get(`/tracks/${id}`)
        return true
    } catch {
        return false
    }
}