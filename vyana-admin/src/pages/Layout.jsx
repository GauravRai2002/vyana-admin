import React, { useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import AddForm from '../components/AddForm'
import logo from '../assets/logo.png'
import List from '../components/List'
import Login from '../Login'
import { auth } from '../firebase'
import AddPhotos from '../components/AddPhotos'
import AddVideos from '../components/AddVideos'
import AddTeams from '../components/AddTeams'
import AddLink from '../components/AddLink'

function Layout() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('uid')) {
            navigate('/login')
        }
    }, [])

    const handleLogOut = () => {
        auth.signOut()
        localStorage.removeItem('uid')
        navigate('/login')
    }
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <img className='w-2/6 md:w-1/6' src={logo} alt="" />
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {localStorage.getItem('uid')?<button onClick={handleLogOut} className="btn btn-outline btn-info">LogOut</button>:<></>}

                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="w-full md:w-5/6 mx-auto">
                    <Routes>
                        <Route path='/' element={<List />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/add/PREV' element={<AddForm timing={'PREV'} />} />
                        <Route path='/add/photos/*' element={<AddPhotos/>} />
                        <Route path='/add/videos/*' element={<AddVideos/>} />
                        <Route path='/add/teams/*' element={<AddTeams/>} />
                        <Route path='/add/link/*' element={<AddLink/>} />
                    </Routes>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    
                    <li>{localStorage.getItem('uid')?<button onClick={handleLogOut} className="btn btn-outline btn-info">LogOut</button>:<></>}</li>

                </ul>

            </div>
        </div>
    )
}

export default Layout