import React, { useRef, useState } from 'react'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

function Login() {
    const emailRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            localStorage.setItem('uid', (await auth.signInWithEmailAndPassword(emailRef.current.value, passRef.current.value)).user.uid)
            navigate('/')
        } catch(err) {
            setError("Failed to log in")
            console.log(err)

        }
    }

    return (
        <div className='flex items-center justify-center h-[80vh]'>
            <form className='w-full md:w-2/5 p-16 border border-solid border-teal-500 rounded-xl flex flex-col gap-6'>
                <div className="email ">
                Email : 
                <input type="text" ref={emailRef} placeholder="Type here" className="input input-bordered input-accent w-full max-w-lg" />
                </div>
                <div className="password ">
                Password : 
                <input type="password" ref={passRef} placeholder="Type here" className="input input-bordered input-accent w-full max-w-lg" />
                </div>
                <button onClick={handleSubmit} className="btn btn-outline btn-accent">Login</button>
            </form>
        </div>
    )
}

export default Login