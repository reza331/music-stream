import mongoose, { Model, Schema } from "mongoose";

export interface SavedPlaylist {
    userID: string
    playlistID: string
}

const playListSchema = new Schema<SavedPlaylist>({
    userID: {
        type: String,
        required: true,
    },
    playlistID: {
        type: String,
        required: true,
    },
})
playListSchema.index(
    { userID: 1, playlistID: 1 },
    { unique: true }
)

export const savedPlaylistsModel:Model<SavedPlaylist> = mongoose.models.SavedPlaylists || mongoose.model<SavedPlaylist>('SavedPlaylists', playListSchema)

