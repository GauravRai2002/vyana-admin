import React from 'react'
import skele from '../assets/skeleton.png'
import { Link } from 'react-router-dom'

function TimeComp({imageurl,e_name,e_id,timing}) {
    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl w-full md:w-1/3 scale-95 border border-solid border-zinc-900 rounded-md my-2 p-3 box-border">
                <figure><img className='w-28' src={imageurl?imageurl:skele} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title truncate">{e_name}</h2>
                    <p>{e_id}</p>
                    {timing!='PREV'?<div className="card-actions justify-end">
                        {/* <Link to={`/edit/${timing}/${e_id}`} ><button className="btn btn-alert btn-outline">Edit</button></Link> */}
                    </div>:<></>}
                </div>
            </div>
        </>
    )
}

export default TimeComp