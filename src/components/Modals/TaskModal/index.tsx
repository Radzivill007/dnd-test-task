import React, { useState, useEffect, ChangeEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/defineTyped'
import { addTask, updateTask, hideTaskModal } from '../../../slices'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import ConfirmModal from '../ConfirmModal'
import styles from './TaskModal.module.scss'

const TaskModal = () => {
  const dispatch = useAppDispatch()
  const task = useAppSelector((state) => state.taskModal.task)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
    }
  }, [task])

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setError('')
  }
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)

  const handleTaskModalCancel = () => dispatch(hideTaskModal())
  const handleTaskSave = () => {
    if (!title) {
      setError('Пожалуйста, введите заголовок задачи')
      return
    }
    if (task) setConfirmModalOpen(true)
    else {
      dispatch(addTask({ id: new Date().getTime(), title, description }))
      handleTaskModalCancel()
    }
  }

  const handleConfirmModalCancel = () => setConfirmModalOpen(false)
  const handleConfirmModalOk = () => {
    if (task) dispatch(updateTask({ id: task.id, title, description }))
    handleConfirmModalCancel()
    handleTaskModalCancel()
  }

  return (
    <ModalWrapper onCancel={handleTaskModalCancel}>
      <div className={styles.taskModal}>
        <h2>{`${task ? 'Редактировать' : 'Создать'} задачу`}</h2>
        <label>
          <p>Заголовок:</p>
          <input type="text" className={error ? styles.error : ''} value={title} onChange={handleTitleChange} />
          {error && <div className={styles.errorMessage}>{error}</div>}
        </label>

        <label>
          <p>Описание:</p>
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </label>
        <div className={styles.buttons}>
          <button onClick={handleTaskSave} className={styles.save}>
            Сохранить
          </button>
          <button onClick={handleTaskModalCancel} className={styles.cancel}>
            Отмена
          </button>
        </div>
      </div>
      {confirmModalOpen && (
        <ConfirmModal
          title={`отредактировать задачу ${title}`}
          onCancel={handleConfirmModalCancel}
          onOk={handleConfirmModalOk}
        />
      )}
    </ModalWrapper>
  )
}

export default TaskModal
