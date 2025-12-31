import useMusicImage from '@/hooks/useMusicImage'
import { Playlist } from '@/types/playlist.type'
import Link from 'next/link'
import React, { FC } from 'react'

const PlaylistSearchCard: FC<Playlist> = (props) => {
    const { id, playlist_name, artwork } = props

    const imageUrl = useMusicImage({ baseImage: artwork["150x150"], imageSize: '150x150' })

    return (
        <Link href={`/playlists/${id}`} className="w-full h-fit neu__norm rounded-lg overflow-hidden flex items-center gap-2 pe-3">
            {imageUrl && <img src={imageUrl} alt="" className="size-10 block" />}
            <div>
                <div className="text-[10px] line-clamp-2">{playlist_name}</div>
            </div>
        </Link>
    )
}

export default PlaylistSearchCard