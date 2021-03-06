import React from "react"
import Preloader from "../components/common/Preloader/Preloader"
import { IUser } from "../redux/users/types"

export const makeFirstLetterUppercase = (fullName: string | undefined | null) => {
  if (!fullName) return
  return fullName.split(' ').map((el) => el.substr(0, 1).toUpperCase() + el.substr(1)).join(' ')
}

export const reduceLine = (line: string | null, maxChar: number) => {
  if(!line) return null
  return (line.length > maxChar) ? `${line.substring(0, maxChar)}..` : line
}

export const convertDateFormat = (date: string, withTime: boolean) => {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  const _date = new Date(Date.parse(date))
  const hour = _date.getHours() < 10 ? `0${_date.getHours()}` : _date.getHours()
  const minutes = _date.getMinutes() < 10 ? `0${_date.getMinutes()}` : _date.getMinutes()
  const resultDate = `${_date.getDate()} ${months[_date.getMonth()]}`
  const time = `${hour}:${minutes}`
  return withTime ? resultDate + ' ' + time : resultDate
}

export const isActiveNavLink = (itemClass: string, activeItemClass: string) => ({ isActive }: { isActive: boolean }): string => {
  return isActive ? [itemClass, activeItemClass].join(' ') : itemClass
}

export const withSuspense = (Component: any) => {
  return (
    <React.Suspense
      fallback={<Preloader width="100px" height="100px" position="absolute" />}
      children={<Component />}
    />
  )
}

export const toggleFollow = (users: IUser[], id: number) => users.map((user) => {
  if (user.id === id) {
    return { ...user, followed: !user.followed }
  }
  return user
})

export const randomNum = (max: number) => Math.floor(Math.random() * (max - 0 + 1) + 0)