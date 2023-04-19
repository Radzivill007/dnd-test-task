import React from 'react'
import { useAppSelector } from '../hooks/defineTyped'
import TaskBoard from '../components/TaskBoard'
import TaskModal from '../components/Modals/TaskModal'

const Home = () => {
  const open = useAppSelector((state) => state.modal.open)

  return (
    <>
      <TaskBoard />
      {open && <TaskModal />}
    </>
  )
}

export default Home
