import useIsSaved from '@/hooks/useIsSaved'
import useSaveAction from '@/hooks/useSaveAction'
import { useAudioActions, useIsPlaying, useStreamUrl, useTrack } from '@/stores/audioStore'
import { formatTimer } from '@/utils/formatters/formatTimer'
import Link from 'next/link'
import { AiFillHeart } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import { CiHeart } from 'react-icons/ci'
import { FaDownload, FaPause, FaPlay } from 'react-icons/fa'

interface OptionProps {
    imageUrl: string | null
    currentTrackMinutes: number | null,
    currentTrackSecond: number | null,
    trackMinutes: number | null,
    trackSecond: number | null,
    exitHandler: () => void
}

const Options = ({ exitHandler, currentTrackMinutes, currentTrackSecond, trackMinutes, trackSecond, imageUrl }: OptionProps) => {

    const track = useTrack()
    const streamUrl = useStreamUrl()
    const isPlaying = useIsPlaying()
    const { setPlaying } = useAudioActions()
    const { isSaved } = useIsSaved(track ? track.id : '', 'track')
    const {saveTrack , removeSavedTrack} = useSaveAction()

    return (
        <div className="h-full w-full flex justify-end items-center gap-4 lg:gap-10">
            {/* timers */}
            {
                <div className="flex items-center gap-1 lg:gap-3 text-[8px] lg:text-[12px]">
                    <div>
                        <span>{formatTimer(currentTrackMinutes)}</span>
                        :
                        <span>{formatTimer(currentTrackSecond)}</span>
                    </div>
                    <div>/</div>
                    <div>
                        <span>{formatTimer(trackMinutes)}</span>
                        :
                        <span>{formatTimer(trackSecond)}</span>
                    </div>
                </div>
            }
            {isPlaying ? <FaPause className="cursor-pointer lg:hidden" onClick={() => setPlaying(false)} /> : <FaPlay className="cursor-pointer lg:hidden" onClick={() => setPlaying(true)} />}
            {/* download save */}
            <div className="flex items-center gap-2 lg:gap-5">
                {/* save */}
                {
                    track &&
                    <div className='cursor-pointer'>
                        {isSaved ? (
                            <AiFillHeart onClick={() => removeSavedTrack(track.id)} className="size-4 lg:size-6 text-pink-500" />
                        ) : (
                            <CiHeart onClick={() => saveTrack(track.id)} className="size-4 lg:size-6 " />
                        )}
                    </div>
                }
                {/* download */}
                <Link target="_blank" href={streamUrl}>
                    <FaDownload className="lg:size-5" />
                </Link>
            </div>
            {/* exit */}
            <button>
                <CgClose className="lg:size-5" onClick={exitHandler} />
            </button>
        </div>
    )
}

export default Options