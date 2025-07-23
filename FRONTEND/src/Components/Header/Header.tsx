import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, DropdownItem, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../ThemeContext'

type Props = {}

const Header = (props: Props) => {

  const [theme, setTheme] = useContext(ThemeContext)
  const [bgClass, setBgClass] = useState('');
  const [textClass, setTextClass] = useState('');
  const [dropdownId, setDropdownId] = useState('');
  const [toggleBtnText, setToggleBtnText] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    console.log(theme);
    localStorage.setItem('theme',theme);
    setBgClass(theme === 'dark' ? 'bg-dark' : 'bg-body-tertiary shadow');
    setTextClass(theme === 'dark' ? 'text-light' : 'text-dark');
    setDropdownId(theme === 'dark' ? 'sellerDropDownDarkTheme' : 'sellerDropDownLightTheme');
    setToggleBtnText(theme === 'dark' ? '🌛' : '🌞');
  }, [theme]);


  return (
    <Navbar expand="lg" className={bgClass}>
      <Container>
        <Navbar.Brand className={textClass}>HOC Real Estate</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Link to="" className={textClass + ' nav-link'}>Home</Link>
            <Link to="/propertyListing" className={textClass + ' nav-link'}>Buy/Rent</Link>
            <NavDropdown title="Sell" id={dropdownId}>
              <NavDropdown.Item href="/createPropertyListing">Post your Listing</NavDropdown.Item>
              <NavDropdown.Item href="/sellerDashboard">Dashboard</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button variant={theme === 'dark' ? 'dark' : 'light'} className='justify-content-end' onClick={() => toggleTheme()}>{toggleBtnText}</Button>
      </Container>
    </Navbar>
  )
}

export default Header