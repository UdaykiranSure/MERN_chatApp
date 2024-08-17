import React, { useState } from 'react'
import GengerCheckbox from './GengerCheckbox';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
	const [inputs,setInputs] = useState({
		fullname: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender:""
	})
	const [loading, signup] = useSignup()

	const handleSubmit = async (e)=>{
		e.preventDefault();
		await signup(inputs)
	}
	
	const handleGender = (gender) => {
		setInputs({...inputs, gender : gender})
	}

	return (
		<div className='flex flex-col items-center justify-center w-96 mx-auto' > 
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
						
        <h1 className='text-3xl  font-semibold text-center text-gray-300'>
					Signup <span className='text-blue-500'> CampusConnect </span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.fullname}
							onChange={(e)=> setInputs({...inputs,fullname:e.target.value})}
						/>
					</div>
          <div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.username}

							onChange={(e)=> setInputs({...inputs,username :e.target.value})}
						/>
					</div>
          <div>
						<label className='label p-2'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered  h-10'
							value={inputs.password}
							onChange={(e)=> setInputs({...inputs,password:e.target.value})}
						/>
					</div>
          <div>
						<label className='label p-2'>
							<span className='text-base label-text'>Confirm password</span>
						</label>
						<input
							type='password'
							placeholder=''
							className='w-full input input-bordered  h-10'
							value={inputs.confirmPassword}
							onChange={(e)=> setInputs({...inputs,confirmPassword:e.target.value})}
						/>
					</div>

          <GengerCheckbox onCheckboxChange = {handleGender} selectedGender = {inputs.gender}/>

          <a href="./login" className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block'>Already have an account?</a>
          <div><button className='btn btn-block btn-small mt-2'>{
			loading? <span className='loading loading-spinner'></span>: "Signin"
			}
			</button></div>
        </form>
      </div>
    </div>
	);
};
export default Signup;


