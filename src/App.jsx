import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/authservice'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import {Outlet} from 'react-router-dom'

function App() {
//  console.log(import.meta.env.VITE_APPWRITE_URL)
  const [loading, setLoading]= useState(true)
  const dispatch = useDispatch() // a merger to use react with redux

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch (logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading ? ( <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
    <Header/>
    <main>
    Login<Outlet/>
    </main>
    <Footer/>
  </div>
  </div> ) : null
}

export default App