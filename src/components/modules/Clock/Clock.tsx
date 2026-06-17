"use client"
import { useIsSideBarCollapse } from "@/stores/sideBarStore"
import React, { useEffect, useState } from "react"

const Clock: React.FC = () => {

    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const isSideBarCollapse = useIsSideBarCollapse()

    const timeFormatter = React.useMemo(() => new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }), [])
    const dateFormatter = React.useMemo(() => new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" }), [])
    const weekdayFormatter = React.useMemo(() => new Intl.DateTimeFormat("en", { weekday: "long" }), [])

    const time = timeFormatter.format(now)
    const date = dateFormatter.format(now)
    const weekday = weekdayFormatter.format(now)

    return (
        <div className={`flex ${isSideBarCollapse ? 'flex-col rounded-2xl text-[8px] py-5 items-start px-4 gap-2' : 'flex-row rounded-full text-[8px] py-3 items-center px-5 justify-between'}  neu__inner`}>
            <div className="font-bold">{time}</div>
            <div className="text-(--alt-text)">{weekday}</div>
            <div className={`text-(--alt-text) ${isSideBarCollapse ? 'hidden' : ''}`}>{date}</div>
        </div>
    )

}

export default Clock
