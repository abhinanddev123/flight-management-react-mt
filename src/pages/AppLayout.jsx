import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';


function AppLayout() {
  return (
    <div style={{
        minHeight: '100vh',
        backgroundImage: `url('/bg.jpg')`, // put image in public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
       <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', minHeight: '100vh' }}>

      <NavBar/>
        <Container className="mt-1">
            <Outlet/>
        </Container>
    </div>
    </div>
  )
}

export default AppLayout
