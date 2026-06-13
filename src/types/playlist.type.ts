export interface Playlist {
    id: string | number;
    playlist_name: string;
    description: string | null;
    artwork: {
        "150x150": string;
        "480x480": string;
        "1000x1000": string;
    }
    user: {
        id: string;
        handle: string;
        name: string;
        profile_picture: {
            "150x150": string;
            "480x480": string;
            "1000x1000": string;
        }
    }
}

export interface PlaylistResponse {
    data: Playlist[]
}