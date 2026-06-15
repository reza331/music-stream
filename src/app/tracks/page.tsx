'use client'
import SelectInput from "@/components/modules/Inputs/SelectInput"
import PageTitleSection from "@/components/modules/PageTitleSection/PageTitleSection"
import TracksPageTracksContainer from "@/components/templates/TracksPage/TracksPageTracksContainer"
import { tracksPageFilterOptions } from "@/contents/reactSelectOptions"
import { Track } from "@/types/tracks.type"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { FaSlidersH } from "react-icons/fa"
import { IoMdMusicalNote } from "react-icons/io"


const TrackPageContent = () => {
    const genre = useSearchParams().get('genre')
    const sort = useSearchParams().get('sort')
    const [tracks, setTracks] = useState<Track[]>([])
    const [filterValue, setFilterValue] = useState<string>(sort ? sort : 'trending')

    return (
        <>
            <PageTitleSection icon={IoMdMusicalNote} title={`${genre ? genre : ''} Tracks`} description="Browse tracks by trending , popular or recent" >
                <SelectInput
                    onChangeHandler={(selected) => {
                        if (selected.value === filterValue) return
                        setTracks([])
                        setFilterValue(selected.value)
                    }}
                    icon={FaSlidersH}
                    place="Sort by ..."
                    isMulti={false}
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    options={tracksPageFilterOptions}
                    menuWidth={120}
                    containerClass="w-[190px] lg:w-[200px] gap-2"
                    iconClass="size-3"
                />
            </PageTitleSection>
            <TracksPageTracksContainer filterValue={filterValue} tracks={tracks} setTracks={setTracks} />
        </>
    )
}

export default function TrackPage() {
    return (
        <Suspense>
            <TrackPageContent />
        </Suspense>
    )
}


