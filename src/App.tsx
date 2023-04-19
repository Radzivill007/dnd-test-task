import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Provider>
  )
}

export default App
