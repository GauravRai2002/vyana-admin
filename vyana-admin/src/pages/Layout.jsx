import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AddForm from '../components/AddForm'
import logo from '../assets/logo.png'
import TimeComp from '../components/TimeComp'
import List from '../components/List'
import EditEvents from '../components/EditEvents'

function layout() {
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
                            {/* Navbar menu content here */}

                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="w-full md:w-5/6 mx-auto">

                    <Routes>
                        <Route path='/' element={<List />} />
                        <Route path='/add/CURR' element={<AddForm timing={'CURR'} />} />
                        <Route path='/add/NEXT' element={<AddForm timing={'NEXT'} />} />
                        <Route path='/add/PREV' element={<AddForm timing={'PREV'} />} />
                        <Route path='/edit/NEXT/*' element={<EditEvents timing={'NEXT'} />} />
                        <Route path='/edit/CURR/*' element={<EditEvents timing={'CURR'}/>} />
                    </Routes>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    <li><Link to={'/'}>Event</Link></li>
                    <li><Link to={'/matches'}>Matches</Link></li>

                </ul>

            </div>
        </div>
    )
}

export default layout