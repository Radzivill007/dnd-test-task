import React from 'react'
import { StrictModeDroppable } from '../../helpers/StrictModeDroppable'
import { useAppDispatch } from '../../hooks/defineTyped'
import { Task } from '../../types'
import { showTaskModal } from '../../slices'
import TaskCard from '../TaskCard'
import styles from './Column.module.scss'

interface ColumnProps {
  title: string
  tasks: Task[]
  editButton: boolean
}

const Column = ({ title, tasks, editButton }: ColumnProps) => {
  const dispatch = useAppDispatch()

  const handleAddTaskClick = () => dispatch(showTaskModal(null))

  return (
    <div className={styles.column}>
      <h2>{title}</h2>
      {editButton && (
        <button className={styles.addButton} onClick={handleAddTaskClick}>
          Добавить
        </button>
      )}
      <StrictModeDroppable droppableId={title}>
        {(provided) => (
          <div className={styles.tasks} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                index={index}
                id={task.id}
                title={task.title}
                description={task.description}
                editable={task.editable}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  )
}

export default Column
