import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch } from '../../hooks/defineTyped'
import { deleteTask, showTaskModal } from '../../slices'
import { ReactComponent as Edit } from '../../icons/edit.svg'
import { ReactComponent as Delete } from '../../icons/delete.svg'
import styles from './TaskCard.module.scss'
import ConfirmModal from '../Modals/ConfirmModal'

interface TaskCardProps {
  index: number
  id: number
  title: string
  description: string
  editable?: boolean
}

const TaskCard = ({ index, id, title, description, editable }: TaskCardProps) => {
  const dispatch = useAppDispatch()

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const handleEditTaskClick = () => dispatch(showTaskModal({ id, title, description }))
  const handleDeleteTaskClick = () => setConfirmModalOpen(true)
  const handleDeleteTaskConfirmModalOk = () => dispatch(deleteTask(id))
  const handleDeleteTaskConfirmModaCancel = () => setConfirmModalOpen(false)

  return (
    <>
      <Draggable key={id} draggableId={id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.taskCard}
          >
            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
            {editable && (
              <div className={styles.buttons}>
                <button className={styles.edit} onClick={handleEditTaskClick}>
                  <Edit />
                </button>
                <button className={styles.delete} onClick={handleDeleteTaskClick}>
                  <Delete />
                </button>
              </div>
            )}
          </div>
        )}
      </Draggable>
      {confirmModalOpen && (
        <ConfirmModal
          title={`удалить задачу ${title}`}
          onCancel={handleDeleteTaskConfirmModaCancel}
          onOk={handleDeleteTaskConfirmModalOk}
        />
      )}
    </>
  )
}

export default TaskCard
