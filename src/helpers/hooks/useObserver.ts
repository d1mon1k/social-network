import { useEffect, useRef } from "react"
import { getPagesAmount } from "../helpers"

type UseObserverType = (
  isFetching: boolean,
  currentPage: number,
  totalCount: number,
  maxPageItemsCount: number,
  callBack: any,
  element: HTMLDivElement
) => void

const useObserver: UseObserverType = (isFetching, currentPage, totalCount, maxPageItemsCount, callBack, element) => {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
     if (isFetching) return
     if (!element) return
     if (observer.current) observer.current.disconnect()
     const pagesAmount = getPagesAmount(totalCount, maxPageItemsCount)

     const cb = (entries: IntersectionObserverEntry[]): void => {
       entries[0].isIntersecting 
       && currentPage < pagesAmount 
       && !isFetching
       && callBack()
     }
     
     observer.current = new IntersectionObserver(cb)
     observer.current.observe(element)
   }, [isFetching, element])
}

export default useObserver
