import SpinnerLoading from "@/components/modules/Loadings/SpinnerLoading"
import useIsSaved from "@/hooks/useIsSaved"
import useMusicImage from "@/hooks/useMusicImage"
import usePlayAction from "@/hooks/usePlayAction"
import useSaveAction from "@/hooks/useSaveAction"
import { SavedTrackPayload } from "@/types/saved-list.type"
import { Track } from "@/types/tracks.type"
import { getDuration } from "@/utils/formatters/getDuration"
import Link from "next/link"
import { useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { BsFillClipboardXFill, BsHeadphones } from "react-icons/bs"
import { CiHeart } from "react-icons/ci"
import { FaDownload } from "react-icons/fa"

const TrackInfoAndActionBox = (props: Track) => {

    const { artwork, genre, mood, title, user, duration, id, description } = props

    const [descExtended, setDescExtended] = useState<boolean>(false)

    const artworkUrl = useMusicImage({ baseImage: artwork["150x150"] ?? null, imageSize: '480x480' })
    const userProfilePicture = useMusicImage({ baseImage: user.profile_picture["150x150"] ?? null, imageSize: '150x150' })

    const { playAction } = usePlayAction(props, id)
    const { isSaved } = useIsSaved(id, 'track')
    const { isLoading, saveTrack, removeSavedTrack } = useSaveAction()

    return (
        <>
            <div className="select-none xl:h-[330px] flex flex-col xl:flex-row items-center neu__norm rounded-2xl overflow-hidden">
                {
                    artworkUrl &&
                    <div className={`relative flex justify-center w-full xl:w-[330px] h-[200px] xl:h-[330px] bg-red-100`}>
                        <div style={{ backgroundImage: `url('${artworkUrl}')` }} className="absolute xl:hidden size-full top-0 left-0 blur-md"></div>
                        <img src={artworkUrl} className="size-[200px] xl:size-full absolute" />
                    </div>
                }
                <div className="h-full w-full gap-5 xl:w-[calc(100%-330px)] flex flex-col p-3 xl:p-5">
                    <h2 className="text-lg xl:text-2xl font-semibold line-clamp-1">{title}</h2>
                    <div className="flex items-center gap-3 rounded-2xl grow w-full">
                        {/* info section */}
                        <div className="w-fit sm:w-[calc(100%-135px)] xl:w-[calc(100%-170px)] flex items-stretch gap-5 neu__inner h-full p-4 rounded-2xl">
                            <div className="flex flex-col justify-center gap-3 w-[150px]">
                                <div className="flex items-center neu__norm w-full ps-1 py-1 rounded-full">
                                    {userProfilePicture && <img className="size-5 lg:size-10 rounded-full block me-2" src={userProfilePicture} />}
                                    <div className="font-semibold text-[8px] lg:text-[12px] line-clamp-1">{user.name}</div>
                                </div>
                                <div className="flex items-center neu__norm w-full ps-3 py-2 rounded-full gap-1">
                                    <div className="font-semibold text-[8px] lg:text-[12px]">Genre :</div> <div className="text-(--alt-text) text-[8px] lg:text-[12px] line-clamp-1">{genre}</div>
                                </div>
                                <div className="flex items-center neu__norm w-full ps-3 py-2 rounded-full gap-1">
                                    <div className="font-semibold text-[8px] lg:text-[12px]">Mood :</div> <div className="text-(--alt-text) text-[8px] lg:text-[12px] line-clamp-1">{mood}</div>
                                </div>
                                <div className="flex items-center neu__norm w-full ps-3 py-2 rounded-full gap-1">
                                    <div className="font-semibold text-[8px] lg:text-[12px]">Duration :</div> <div className="text-(--alt-text) text-[8px] lg:text-[12px] line-clamp-1">{getDuration(duration)}</div>
                                </div>
                            </div>
                            {/* description box */}
                            <div className="hidden grow sm:block w-[calc(100%-150px)] neu__norm rounded-2xl p-5 overflow-y-auto">
                                {
                                    description ? (
                                        <div onClick={() => setDescExtended(!descExtended)} className={`text-(--alt-text) text-[14px] cursor-pointer ${descExtended ? "" : "line-clamp-6"}`}>
                                            <span className="font-semibold">Description :</span> {description}
                                        </div>
                                    ) : (
                                        <div className="size-full flex justify-center items-center gap-3">
                                            <BsFillClipboardXFill className="size-7 mb-2" />No description Written
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {/* action section */}
                        <div className="w-full sm:w-fit flex flex-col gap-3 items-center justify-center">
                            {
                                isLoading && <div className="xl:text-[16px] flex items-center ps-5 gap-2 neu__norm py-3 w-[120px] xl:w-[170px] rounded-2xl hover:translate-x-1 transition-[translate] duration-500">
                                    <SpinnerLoading withText={true} text="loading" className="size-4" />
                                </div>
                            }
                            {
                                !isLoading &&
                                <button onClick={isSaved ? () => removeSavedTrack(id) : () => saveTrack(id)} className="xl:text-[16px] flex items-center ps-5 gap-2 neu__norm py-3 w-[120px] xl:w-[170px] rounded-2xl hover:translate-x-2 transition-[translate] duration-500">{isSaved ? <AiFillHeart className="size-4 xl:size-7" /> : <CiHeart className="size-4 xl:size-7" />}{isSaved ? `Unsave` : `Save`}</button>
                            }
                            <button onClick={playAction} className="xl:text-[16px] flex items-center ps-5 gap-1 neu__norm py-3 w-[120px] xl:w-[170px] rounded-2xl hover:translate-x-2 transition-[translate] duration-500 "><BsHeadphones className="size-4 xl:size-7" />Listen</button>
                            <Link target="_blank" href={`/api/tracks/${id}/stream`} className="xl:text-[16px] flex items-center ps-5 gap-2 neu__norm py-3 w-[120px] xl:w-[170px] rounded-2xl hover:translate-x-2 transition-[translate] duration-500 "><FaDownload className="size-3 xl:size-6" />Download</Link>
                        </div>
                    </div>
                </div>
            </div >
            {
                description ? (
                    <div onClick={() => setDescExtended(!descExtended)} className="block sm:hidden h-fit text-(--alt-text) neu__norm rounded-2xl p-5 text-[12px] lg:text-[14px]" ><div className="font-semibold">Description: </div> <p className={descExtended ? "" : "line-clamp-6"}>{description}</p></div >
                ) : (
                    <div className="sm:hidden h-[100px] w-full grow text-(--alt-text) neu__norm rounded-2xl flex items-center justify-center gap-2 text-lg"><BsFillClipboardXFill className="size-7 mb-2" />No description Written</div>
                )
            }
        </>
    )
}

export default TrackInfoAndActionBox