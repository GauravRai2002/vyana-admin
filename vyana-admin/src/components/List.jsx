import React, { useEffect, useState } from 'react'
import TimeComp from './TimeComp'
import { Link } from 'react-router-dom'

function List() {
    const [allData, setAllData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/events').then(res => res.json()).then(result => setAllData(result))
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
                <div className='text-4xl font-bold'>
                    PREVIOUS EVENTS
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