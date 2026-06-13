'use client'
import useSavedPlaylistsQuery from '@/hooks/queryHooks/useSavedPlaylistsQuery'
import usePagination from '@/hooks/usePagination'
import SavedBox from './SavedBox'
import SavedPlayListCard from '@/components/modules/Cards/SavedPlayListCard'
import { SavedPlaylistPayload } from '@/types/saved-list.type'
import { FaSadTear } from 'react-icons/fa'
import SpinnerLoading from '@/components/modules/Loadings/SpinnerLoading'

const SavedPlaylists = () => {

    const { data , isPending , isError , refetch } = useSavedPlaylistsQuery()
    const paginationProps = usePagination<{ userID: string, playlistID: string | number }>(data, 4)

    return (
        <SavedBox paginationProps={paginationProps} sectionTitle="Saved Tracks">
            {
                isPending &&
                <div className='flex w-full justify-center items-center h-[150px]'>
                    <SpinnerLoading borderWidth={4} textSize={16} size={20} withText={true} text='Loading data' />
                </div>
            }
            {
                isError &&
                <div className='flex w-full gap-2 justify-center items-center h-[150px] text-[16px]'>
                    <FaSadTear className='size-7 -mt-1' /> Fetching data failed! <button onClick={() => refetch()} className='text-(--hover-color) font-semibold'>Retry</button>
                </div>
            }
            {/* {paginationProps.slicedList && paginationProps.slicedList.map(playlist => <SavedPlayListCard key={playlist.playlistID} {...playlist} />)} */}
        </SavedBox>
    )
}

export default SavedPlaylists