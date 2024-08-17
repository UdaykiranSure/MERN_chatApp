import './App.css'
import {Navigate, Route,Routes} from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Home from './pages/home/Home.jsx'
import {Toaster} from 'react-hot-toast'
import  {UseAuthContext}  from './context/AuthContext.jsx'

const  App = ()=> {
  const {authUser} = UseAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center' >
      <Routes>
        <Route path='/signup' element = {authUser?<Navigate to="/"/>:<Signup/>} />
        <Route path='/login' element = {authUser?<Navigate to="/"/>:<Login/>} />
        <Route path='/' element = {authUser?<Home/>:<Navigate to={"/login"} />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
