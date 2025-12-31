'use client'
import SpinnerLoading from "@/components/modules/Loadings/SpinnerLoading"
import PlaylistInfoBox from "@/components/templates/PlaylistPage/PlaylistInfoBox"
import PlaylistTracks from "@/components/templates/PlaylistPage/PlaylistTracks"
import usePlaylistQuery from "@/hooks/queryHooks/usePlaylistQuery"
import { useParams } from "next/navigation"
import { FaSadTear } from "react-icons/fa"

const PlaylistPage = () => {

    const { playlistID } = useParams()
    const { data, isPending, isError, refetch } = usePlaylistQuery(playlistID as string)

    return (
        <div className="flex flex-col gap-5">
            {
                data &&
                <>
                    <PlaylistInfoBox {...data.data[0]} />
                    <PlaylistTracks playlistID={data.data[0].id} />
                </>
            }
            {
                isPending &&
                <div className='flex w-full justify-center items-center h-[calc(100dvh-130px)]'>
                    <SpinnerLoading borderWidth={4} textSize={16} size={20} withText={true} text='Loading data' />
                </div>
            }
            {
                isError &&
                <div className='flex w-full gap-2 justify-center items-center h-[calc(100dvh-130px)] text-[16px]'>
                    <FaSadTear className='size-7 -mt-1' /> Fetching data failed! <button onClick={() => refetch()} className='text-(--hover-color) font-semibold'>Retry</button>
                </div>
            }
        </div>
    )
}

export default PlaylistPage