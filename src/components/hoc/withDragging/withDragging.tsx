import React, { useEffect, useRef, useState } from "react"
import { DialogType } from "../../../redux/messenger/types"
import cl from './withDragging.module.scss';

/* ------------- Types ------------- */
interface WithDraggingProps {
  children: React.ReactNode
  activeClass: string
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  openedDialog?: DialogType
  setOpenedDialogs?:  React.Dispatch<React.SetStateAction<DialogType[]>>
}

/* ------------- Component ------------- */
export const WithDragging: React.FC<WithDraggingProps> = ({
  children,
  activeClass,
  isVisible,
  setIsVisible,
  openedDialog,
  setOpenedDialogs
}) => {
  let draggableBlock = useRef<HTMLDivElement | null>(null)
  
  const changeActiveDraggingBlock = (newActiveBlock: HTMLDivElement | null ,activeClass: string) => {
    let prevActiveBlock = document.querySelector(`.${activeClass}`)
    prevActiveBlock?.classList.remove(activeClass)
    newActiveBlock?.classList.add(activeClass)
  }

  useEffect(() => {
    changeActiveDraggingBlock(draggableBlock.current, activeClass)

    const { height: bodyHeight, width: bodyWidth } = window.visualViewport
    const windowHeight = draggableBlock.current?.offsetHeight
    const windowWidth = draggableBlock.current?.offsetWidth
  
    const handleResizeScreen = () => {
      setIsVisible(false)
      if(setOpenedDialogs && openedDialog) {
        setOpenedDialogs(prev => prev.filter(dialog => dialog.id !== openedDialog.id))
      }
    }
  
    const handleMouseMove = (e: MouseEvent) => {
      let getStyle = window.getComputedStyle(draggableBlock.current!)
      let right = parseInt(getStyle.right)
      let bottom = parseInt(getStyle.bottom)
  
      if ((right > 0 || e.movementX < 0) && (right + windowWidth! < bodyWidth || e.movementX > 0)) {
        draggableBlock.current!.style.right = `${right - e.movementX}px`
      }
      if ((bottom > 0 || e.movementY < 0) && (bottom + windowHeight! < bodyHeight || e.movementY > 0)) {
        draggableBlock.current!.style.bottom = `${bottom - e.movementY}px`
      }
  
      if (right < 11 && e.movementX > 0) {
        draggableBlock.current!.style.right = `0px`
      }
      if (bodyWidth - (right + windowWidth!) < 11 && e.movementX < 0) {
        draggableBlock.current!.style.right = `${bodyWidth - windowWidth!}px`
      }
      if (bottom < 11 && e.movementY > 0) {
        draggableBlock.current!.style.bottom = `0px`
      }
      if (bodyHeight - (bottom + windowHeight!) < 11 && e.movementY < 0) {
        draggableBlock.current!.style.bottom = `${bodyHeight - windowHeight!}px`
      }
    }
  
    const handleMouseDown = () => {
      changeActiveDraggingBlock(draggableBlock.current, activeClass)
      document.addEventListener('mouseup', handleMouseUp)
      draggableBlock.current!.classList.add(cl.active)
      window.addEventListener('mousemove', handleMouseMove)
    }
  
    const handleMouseUp = () => {
      draggableBlock.current?.classList.remove(cl.active)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  
    window.addEventListener('resize', handleResizeScreen)
    draggableBlock.current?.addEventListener('mousedown', handleMouseDown)
  
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResizeScreen)
    }
  }, [isVisible, draggableBlock])

  return (
    <>
      {isVisible && (
        <div className={cl.draggableBlock} ref={draggableBlock} >
          {children}
        </div>
      )}
    </>
  )
}

