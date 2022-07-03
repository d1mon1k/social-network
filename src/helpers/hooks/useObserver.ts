import { useEffect, useRef } from "react"

type UseObserverType = (
  isFetching: boolean,
  isEndList: boolean,
  callBack: () => Promise<void>,
  element: HTMLDivElement
) => void

const useObserver: UseObserverType = (isFetching, isEndList, callBack, element) => {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
     if (isFetching) return
     if (!element) return
     if (observer.current) observer.current.disconnect()

     const cb = (entries: IntersectionObserverEntry[]): void => {
       entries[0].isIntersecting 
       && !isEndList
       && !isFetching
       && callBack()
     }
     
     observer.current = new IntersectionObserver(cb)
     observer.current.observe(element)
   }, [isFetching, element, callBack])
}

export default useObserver
