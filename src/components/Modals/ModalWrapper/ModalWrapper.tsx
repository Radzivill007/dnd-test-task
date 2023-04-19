import React, { ReactNode, useEffect, useRef } from 'react'
import styles from './ModalWrapper.module.scss'

interface ModalWrapperProps {
  children: ReactNode
  onCancel: () => void
}

const ModalWrapper = ({ children, onCancel }: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        onCancel()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef, onCancel])

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper} ref={modalRef}>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
