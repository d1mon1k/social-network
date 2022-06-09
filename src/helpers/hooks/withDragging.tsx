import React, { Children, cloneElement, forwardRef, ReactNode, ReactPortal, useEffect, useRef, useState } from "react"

interface WithDraggingProps {
  children: React.ReactNode
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface InjectedProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const WithDragging: React.FC<WithDraggingProps> = ({
  children,
  isVisible,
  setIsVisible
}) => {
  let draggableBlock = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    const { height: bodyHeight, width: bodyWidth } = window.visualViewport
    const windowHeight = draggableBlock.current?.offsetHeight
    const windowWidth = draggableBlock.current?.offsetWidth
  
    const handleResizeScreen = () => {
      setIsVisible(false)
    }
  
    const handleMouseMove = (e: MouseEvent) => {
      let getStyle = window.getComputedStyle(draggableBlock.current!)
      let right = parseInt(getStyle.right)
      let bottom = parseInt(getStyle.bottom)
  
      if (
        (right > 0 || e.movementX < 0) &&
        (right + windowWidth! < bodyWidth || e.movementX > 0)
      ) {
        draggableBlock.current!.style.right = `${right - e.movementX}px`
      }
      if (
        (bottom > 0 || e.movementY < 0) &&
        (bottom + windowHeight! < bodyHeight || e.movementY > 0)
      ) {
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
      document.addEventListener('mouseup', handleMouseUp)
      // draggableBlock.current!.classList.add(activeClass)
      window.addEventListener('mousemove', handleMouseMove)
    }
  
    const handleMouseUp = () => {
      // draggableBlock.current?.classList.remove(activeClass)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  
    window.addEventListener('resize', handleResizeScreen)
    draggableBlock.current?.addEventListener('mousedown', handleMouseDown)
  
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResizeScreen)
    }
  }, [isVisible, draggableBlock])

  return (
    <>
      {isVisible && (
        <div
          ref={draggableBlock}
          style={{
            position: 'fixed',
            zIndex: '99999',
            bottom: '0',
            right: '0',
          }}
        >
          {children}
        </div>
      )}
    </>
  )
}

