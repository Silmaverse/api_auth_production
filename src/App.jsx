import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Register from './pages/Register'
import LayOutOne from './LayOuts/LayOutOne'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

const App = () => {

 const myroute = createBrowserRouter(
  createRoutesFromElements(
    <Route  path='/' element={<LayOutOne/>}>

      <Route index element={<Register/>} />
      <Route path='/login' element={<Login/>} />


    </Route>
  )
 )




  return (
    <>
      <ToastContainer/>
      <RouterProvider router={myroute} />
    </>
  )
}

export default App