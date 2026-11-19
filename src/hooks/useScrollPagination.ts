import { useScrollStore } from "@/stores/scrollStore"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface UseScrollPaginationProps<T> {
    setData: Dispatch<SetStateAction<T[]>>
    fetchHook: (page: number) => {
        data?: { data: T[] }
        isPending: boolean
        isError: boolean
    }
}



const useScrollPagination = <T>({ fetchHook, setData }: UseScrollPaginationProps<T>) => {

    const [page, setPage] = useState<number>(1)
    const { isBottom, setIsBottom } = useScrollStore()
    const { data, isPending, isError } = fetchHook(page)

    useEffect(() => {
        if (data) {
            setData(prev => [...prev, ...data.data])
        }
    }, [data])

    useEffect(() => {

        if (isError) {
            setIsBottom(false)
            return
        }
        if (!isPending) {
            setPage(prev => prev + 1)
        }
        setIsBottom(false)

    }, [isBottom])

    return { page, isError, isPending }
    
}

export default useScrollPagination