import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../../hooks/defineTyped'
import { moveTask } from '../../slices'
import Column from '../Column'
import styles from './TaskBoard.module.scss'

const TaskBoard = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks)

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination) {
      dispatch(
        moveTask({
          sourceId: source.index,
          destinationId: destination.index,
          sourceColumn: source.droppableId as keyof typeof tasks,
          destinationColumn: destination.droppableId as keyof typeof tasks,
        })
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {Object.keys(tasks)?.map((title, index) => (
          <Column key={title} title={title} tasks={tasks[title]} editButton={index === 0} />
        ))}
      </div>
    </DragDropContext>
  )
}

export default TaskBoard
