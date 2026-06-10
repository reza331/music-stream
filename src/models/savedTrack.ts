import mongoose, { Model, Schema } from "mongoose";

export interface SavedTrack {
    userID: string
    trackID: string
}

const trackSchema = new Schema<SavedTrack>({
    userID: {
        type: String,
        required: true,
    },
    trackID: {
        type: String,
        required: true,
    },
})
trackSchema.index(
    { userID: 1, trackID: 1 },
    { unique: true }
)

export const savedTracksModel:Model<SavedTrack> = mongoose.models.SavedTracks || mongoose.model<SavedTrack>('SavedTracks', trackSchema)

