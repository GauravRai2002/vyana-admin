import React, { useEffect, useState } from 'react'
import TimeComp from './TimeComp'
import { Link, useNavigate } from 'react-router-dom'

function List() {
    const navigate = useNavigate()
    const [allData, setAllData] = useState([])
    useEffect(() => {
        if (localStorage.getItem('uuid')) {
            console.log('not signed in')
            navigate('/login')
        }
        fetch('https://vyana-sports-back-end.vercel.app/events').then(res => res.json()).then(result => setAllData(result))
    }, [])


    return (
        <>
            <div className='w-full font-bold my-6'>
                <div className='text-4xl font-bold flex items-center justify-between'>
                    CURRENT EVENTS <Link to={'/add/CURR'}><button className="btn btn-info">ADD</button></Link>
                </div>
                <div className="flex flex-wrap items-center gap-0">
                    {allData.map((data, i) => {
                        return data.timing == 'CURR' ? <TimeComp key={i} e_name={data.e_name} e_id={data.e_id} timing={data.timing} imageurl={data.e_logo} /> : <></>
                    })}
                </div>
                <div className='text-4xl font-bold flex items-center justify-between'>
                    UPCOMING EVENTS <Link to={'/add/NEXT'}><button className="btn btn-info">ADD</button></Link>
                </div>
                <div className="flex flex-wrap items-center gap-0">

                    {allData.map((data, i) => {
                        return data.timing == 'NEXT' ? <TimeComp key={i} e_name={data.e_name} e_id={data.e_id} timing={data.timing} imageurl={data.e_logo} /> : <></>
                    })}
                </div>
                <div className='text-4xl font-bold flex items-center justify-between'>
                    PREVIOUS EVENTS <Link to={'/add/PREV'}><button className="btn btn-info">ADD</button></Link>
                </div>
                <div className="flex flex-wrap items-center gap-0">

                {allData.map((data, i) => {
                        return data.timing == 'PREV' ? <TimeComp key={i} e_name={data.e_name} e_id={data.e_id} timing={data.timing} imageurl={data.e_logo} /> : <></>
                    })}
                </div>


            </div>
        </>
    )
}

export default List