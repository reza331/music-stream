'use client'
import { useEffect, useState } from "react"

const usePagination = <T>(list: T[] | undefined, itemPerPage: number) => {

    const [totalPage, setTotalPage] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [slicedList, setSlicedList] = useState<T[] | null>(null)

    useEffect(() => {
        if (list && Array.isArray(list)) {
            setTotalPage(Math.ceil(list.length / itemPerPage))
            const firstIndext = (currentPage - 1) * itemPerPage
            const lastIndex = firstIndext + itemPerPage
            const sliced = list.slice(firstIndext, lastIndex)
            setSlicedList(sliced)
        }
    }, [list, currentPage])

    return { slicedList, currentPage, setCurrentPage, totalPage }

}

export default usePagination