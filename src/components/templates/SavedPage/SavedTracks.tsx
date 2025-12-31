'use client'
import useSavedTracksQuery from '@/hooks/queryHooks/useSavedTracksQuery'
import SavedBox from './SavedBox'
import SavedTrackCard from '@/components/modules/Cards/SavedTrackCard'
import usePagination from '@/hooks/usePagination'
import { SavedTrackPayload } from '@/types/saved-list.type'
import SpinnerLoading from '@/components/modules/Loadings/SpinnerLoading'
import { FaSadTear } from 'react-icons/fa'

const SavedTracks = () => {

    const { data, isPending, isError, refetch } = useSavedTracksQuery()
    const paginationProps = usePagination<SavedTrackPayload>(data, 4)

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
            {paginationProps.slicedList && paginationProps.slicedList.map(track => <SavedTrackCard key={track.trackID} {...track} />)}
        </SavedBox>
    )
}

export default SavedTracks