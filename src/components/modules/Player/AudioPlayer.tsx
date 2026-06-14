'use client'
import useMusicImage from "@/hooks/useMusicImage"
import usePlayerHandlers from "@/hooks/usePlayerHandlers"
import { memo, useRef } from "react"
import TrackInfo from "./AudioComponents/TrackInfo"
import Controls from "./AudioComponents/Controls"
import Options from "./AudioComponents/Options"
import { usePlayerVisible, useStreamUrl, useTrack } from "@/stores/audioStore"

const AudioPlayer = ({ openClass }: any) => {

  const track = useTrack()
  const streamUrl = useStreamUrl()
  const playerVisible = usePlayerVisible()
  const imageUrl = useMusicImage({
    baseImage: track?.artwork["150x150"] ?? null,
    imageSize: '150x150'
  })
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressMobileRef = useRef<HTMLDivElement>(null)

  const {
    exitHandler, seekHandler, seekHandlerMobile, playerHandler, currentTrackMinutes,
    currentTrackSecond, trackMinutes, trackSecond, progressPercent
  } = usePlayerHandlers({ audioRef, progressRef, progressMobileRef })

  return (
    <div className={`${openClass} ${!playerVisible && `translate-y-full`} absolute bottom-0 end-0 z-50 h-[110px] lg:h-[90px] py-3 px-5 lg:px-10 transition-transform duration-500`}>
      {<div className="py-3 px-4 lg:px-7 rounded-3xl lg:rounded-full relative grid grid-cols-[140px_1fr] lg:flex lg:items-center lg:justify-between lg:gap-5 duration-500 select-none w-full h-full bg-(--main-bg) border-[3px] border-(--alt-text)">
        {/* Audio tag */}
        {streamUrl && <audio onTimeUpdate={playerHandler} ref={audioRef} className="hidden" src={streamUrl}></audio>}
        {/* Track info */}
        <TrackInfo track={track} imageUrl={imageUrl} />
        {/* Player Controls */}
        <div className="hidden lg:block w-full">
          <Controls audioRef={audioRef} progressRef={progressRef} seekHandler={seekHandler} progressPercent={progressPercent} />
        </div>
        {/* options */}
        <Options imageUrl={imageUrl} exitHandler={exitHandler} currentTrackMinutes={currentTrackMinutes} currentTrackSecond={currentTrackSecond} trackMinutes={trackMinutes} trackSecond={trackSecond} />
        {/* progressbar mobile */}
        <div onClick={seekHandlerMobile} ref={progressMobileRef} className="col-span-2 cursor-pointer flex lg:hidden w-full h-2 px-1 items-center mt-2 rounded-full bg-(--bars-color)">
          <div style={{ width: `${progressPercent}%` }} className="h-[3px] bg-(--colored-text) rounded-full"></div>
        </div>
        {/* blur layer */}
        <div className="h-[60px] w-full absolute backdrop-blur-sm -bottom-10 start-0 -z-10" />
      </div>}
    </div>
  )
}

export default memo(AudioPlayer)  