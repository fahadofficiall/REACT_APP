import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tile from '../src/Components/Tile/Tile.tsx'
import uuid from 'react-uuid'
import Header from './Components/Header/Header.tsx'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from './ThemeContext'

function App() {
  const [count, setCount] = useState(0)

  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const [bgClass, setBgClass] = useState('');

  useEffect(() => {
    setBgClass(theme === 'dark' ? 'bg-dark' : 'bg-body-tertiary shadow');
  }, [theme]);


  return (
    <>
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className={'app ' + bgClass}>
        <Header></Header>
        <Outlet></Outlet>
      </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
