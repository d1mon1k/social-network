import React, { useCallback, useEffect, useRef } from 'react';
import { DialogType } from '../../../redux/messenger/types';
import cl from './withDragging.module.scss';

/* ------------- Types ------------- */
interface WithDraggingProps {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openedDialog?: DialogType;
  setOpenedDialogs?: React.Dispatch<React.SetStateAction<DialogType[]>>;
}

/* ------------- Component ------------- */
export const WithDragging: React.FC<WithDraggingProps> = ({ children, isVisible, setIsVisible, openedDialog, setOpenedDialogs }) => {
  let draggableBlock = useRef<HTMLDivElement | null>(null);

  const changeActiveDraggingBlock = (newActiveBlock: HTMLDivElement | null) => {
    let prevActiveBlock = document.querySelector<HTMLDivElement>(`[data-dragging]`);

    if (prevActiveBlock) {
      prevActiveBlock.style.zIndex = '10';
      prevActiveBlock.removeAttribute('data-dragging');
    }
    if (newActiveBlock) {
      newActiveBlock.style.zIndex = '11';
      newActiveBlock.setAttribute('data-dragging', '');
    }
  };

  const handleResizeScreen = useCallback(() => {
    setIsVisible(false);

    if (setOpenedDialogs && openedDialog) {
      setOpenedDialogs((prev) => prev.filter((dialog) => dialog.id !== openedDialog.id));
    }
  }, [openedDialog, setIsVisible, setOpenedDialogs]);

  const handleMouseMove = (e: MouseEvent) => {
    let getStyle = window.getComputedStyle(draggableBlock.current!);
    const { height: topBorder, width: leftBorder } = window.visualViewport;
    const windowHeight = draggableBlock.current?.offsetHeight;
    const windowWidth = draggableBlock.current?.offsetWidth;

    const right = parseInt(getStyle.right);
    const bottom = parseInt(getStyle.bottom);
    const top = bottom + windowHeight!;
    const left = right + windowWidth!;

    const moveWindowBottom = e.movementY > 0;
    const moveWindowTop = e.movementY < 0;
    const moveWindowRight = e.movementX > 0;
    const moveWindowLeft = e.movementX < 0;

    const stickyBorder = 11;

    if ((right > 0 || moveWindowLeft) && (left < leftBorder || moveWindowRight)) {
      draggableBlock.current!.style.right = `${right - e.movementX}px`;
    }
    if ((bottom > 0 || moveWindowTop) && (top < topBorder || moveWindowBottom)) {
      draggableBlock.current!.style.bottom = `${bottom - e.movementY}px`;
    }

    if (right < stickyBorder && moveWindowRight) {
      draggableBlock.current!.style.right = `0px`;
    }
    if (leftBorder - left < stickyBorder && moveWindowLeft) {
      draggableBlock.current!.style.right = `${leftBorder - windowWidth!}px`;
    }
    if (bottom < stickyBorder && moveWindowBottom) {
      draggableBlock.current!.style.bottom = `0px`;
    }
    if (topBorder - top < stickyBorder && moveWindowTop) {
      draggableBlock.current!.style.bottom = `${topBorder - windowHeight!}px`;
    }
  };

  const handleMouseUp = useCallback(() => {
    draggableBlock.current?.classList.remove(cl.active);
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = useCallback(() => {
    changeActiveDraggingBlock(draggableBlock.current);
    document.addEventListener('mouseup', handleMouseUp);
    draggableBlock.current!.classList.add(cl.active);
    window.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseUp]);

  useEffect(() => {
    changeActiveDraggingBlock(draggableBlock.current);

    window.addEventListener('resize', handleResizeScreen);
    draggableBlock.current?.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResizeScreen);
    };
  }, [isVisible, draggableBlock, handleMouseDown, handleMouseUp, handleResizeScreen]);

  return (
    <>
      {isVisible && (
        <div className={cl.draggableBlock} ref={draggableBlock}>
          {children}
        </div>
      )}
    </>
  );
};
