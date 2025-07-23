import React, { useContext, useEffect, useState } from 'react'
import villa1 from '../../assets/villa1.jpg'
import { Card, Image } from 'react-bootstrap'
import { ThemeContext } from '../../ThemeContext'

type Props = {
  type: string,
  value: string,
  info: string
}

const Tile = ({type, value, info}: Props) => {

  const [theme, setTheme] = useContext(ThemeContext)
  const [bgClass, setBgClass] = useState('');
  const [textClass, setTextClass] = useState('');

  useEffect(() => {
          setBgClass(theme === 'dark' ? 'bg-dark' : 'bg-body-tertiary shadow');
          setTextClass(theme === 'dark' ? 'text-light' : 'text-dark');
      }, [theme]);


  return (
    <Card style={{width:'20rem', height:'37rem'}} className={'mx-4 my-2 pt-2 border border-secondary shadow rounded bg-gradient ' + textClass + ' ' + bgClass}>
      <Image src={villa1} roundedCircle style={{height:'250px', width:'263px', marginLeft:'27px'}}></Image>
      <Card.Body>
        <Card.Title className="text-center">{type}</Card.Title>
        <Card.Text>
          <span className='h6 d-block text-center'>{value}</span>
          <span className="d-block text-justify">{info}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Tile