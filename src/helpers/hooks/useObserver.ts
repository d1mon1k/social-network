import { useEffect, useRef } from "react"

type UseObserverType = (
  isFetching: boolean,
  isEndList: boolean,
  callBack: () => Promise<void>,
  // element: HTMLDivElement
) => void

const useObserver: UseObserverType = (isFetching, isEndList, callBack) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const element = useRef<HTMLDivElement | null>(null)

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
     observer.current.observe(element.current!)
   }, [isFetching, element, callBack, isEndList])

   return element
}

export default useObserver
