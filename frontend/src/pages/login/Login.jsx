import React from 'react'
import useLogin from '../../hooks/useLogin'
import { useState } from 'react'

function Login() {
  const [inputs,setInputs] = useState({
    username:"",
    password: ""
  })

  const {loading,login} = useLogin()
  const handleSubmit = async (e) =>{
    e.preventDefault();
    await login(inputs);
  }

  return (
    <div className='flex flex-col items-center w-96 justify-center mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Login <span className='text-blue-500'>CampusConnect</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e)=>{setInputs({...inputs,username:e.target.value})}}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' 
              value={inputs.value}
              onChange={(e) => {setInputs({...inputs,password:e.target.value})}}
            />
          </div>
          <a href="./signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Don't have an account?</a>
          <button className='btn btn-block btn-small mt-2'   disabled = {loading}>
            {!loading?"login":<span className='loading loading-spinner'></span> }
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default Login
