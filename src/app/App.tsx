import React, { useEffect } from 'react'
import styles from './styles/App.module.scss'
import { Header } from '../components/header/Header'
import { SideBar } from '../components/sidebar/SideBar'
import { MainPage } from '../pages/MainPage'
import { useAppDispatch } from '../utils/hooks/redux-hooks'
import { fetchTasks } from '../store/asyncInstances'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])
  return (
    <div className={styles.App}>
      <Header />
      <SideBar />
      <MainPage />
    </div>
  )
}

export default App
