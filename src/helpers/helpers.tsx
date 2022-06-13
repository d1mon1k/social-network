import React from "react"
import Preloader from "../components/common/Preloader/Preloader"

export const makeFirstLetterUppercase = (fullName: string | undefined | null) => {
  if (!fullName) return
  return fullName.split(' ').map((el) => el.substr(0, 1).toUpperCase() + el.substr(1)).join(' ')
}

export const reduceLine = (line: string | null, maxChar: number) => {
  if(!line) {
    return null
  }
  return (line.length > maxChar) ? `${line.substring(0, maxChar)}..` : line
}
export const getRightDateFormat = (date: number) => `${new Date(date).getHours()}:${new Date(date).getMinutes()}`

export const convertDateFormat = (date: string, withTime: boolean) => {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  const _date = new Date(Date.parse(date))
  const resultDate = `${_date.getDate()} ${months[_date.getMonth()]}`
  const time = `${_date.getHours()}:${_date.getMinutes()}`
  return withTime ? resultDate + ' ' + time : resultDate
}

export const isActiveNavLink = (itemClass: string, activeItemClass: string) => ({ isActive }: { isActive: boolean }): string => {
  return isActive ? [itemClass, activeItemClass].join(' ') : itemClass
}

export const getPagesAmount = (totalUsersCount: number, maxPageItemsCount: number): number => Math.ceil(totalUsersCount / maxPageItemsCount)

export const withSuspense = (Component: any) => {
  return (
    <React.Suspense
      fallback={<Preloader width="100px" height="100px" position="absolute" />}
    >
      <Component />
    </React.Suspense>
  )
}
