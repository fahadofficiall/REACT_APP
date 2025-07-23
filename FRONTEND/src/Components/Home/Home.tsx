import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../ThemeContext';

type Props = {}

const Home = (props: Props) => {

const [theme, setTheme] = useContext(ThemeContext)
const [textClass, setTextClass] = useState('');

useEffect(() => {
    setTextClass(theme === 'dark' ? 'text-light' : 'text-dark');
}, [theme]);


  return (
    <div className={textClass}>Home</div>
  )
}

export default Home