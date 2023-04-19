import React from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  title: string
  onCancel: () => void
  onOk: () => void
}

const ConfirmModal = ({ title, onCancel, onOk }: ConfirmModalProps) => {
  return (
    <ModalWrapper onCancel={onCancel}>
      <div className={styles.confirmModal}>
        <h3>{`Вы уверены что хотите ${title}`}</h3>
        <div className={styles.buttons}>
          <button onClick={onOk} className={styles.save}>
            Подтверждаю!
          </button>
          <button onClick={onCancel} className={styles.cancel}>
            Отмена
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ConfirmModal
