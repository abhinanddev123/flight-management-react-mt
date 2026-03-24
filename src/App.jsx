import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreateFlight from './pages/CreateFlight'
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightProvider from './contexts/FlightContext';
import AppLayout from './pages/AppLayout';




function App() {

  return (
    <>
   

      <BrowserRouter>
      <FlightProvider>
        <Routes>
           

          <Route path='/' element = {<AppLayout/>}>
              <Route index element={<Navigate to="app" replace/>}/>
              <Route path='app' element={<Dashboard/>}/>
              <Route path='*' element={<Dashboard/>}/>
              <Route path='create' element={<CreateFlight/>}/>
          </Route>



         

        </Routes>
        </FlightProvider>
      </BrowserRouter>
    </>
  )
}

export default App
