import React from 'react'
import skele from '../assets/skeleton.png'
import { Link } from 'react-router-dom'

function TimeComp({ imageurl, e_name, e_id, timing }) {
    const moveToCurrentHandler = ()=>{

    }

    const moveToPrevHandler = ()=>{
        
    }
    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl w-full md:w-1/3 scale-95 border border-solid border-zinc-900 rounded-md my-2 p-3 box-border">
                <figure><img className='w-28' src={imageurl ? imageurl : skele} alt="Movie" /></figure>
                <div className="card-body flex flex-wrap">
                    <h2 className="card-title truncate">{e_name}</h2>
                    <p>{e_id}</p>
                    {timing == 'CURR' ? <div className="card-actions ">
                        <button onClick={moveToPrevHandler} className="btn btn-alert btn-outline">Move to PREV</button>
                    </div> : <></>}
                    {timing == 'NEXT' ? <div className="card-actions ">
                        <button onClick={moveToCurrentHandler} className="btn btn-alert btn-outline">Move to CURR</button>
                    </div> : <></>}
                    {timing!='PREV'?<Link className='' to={`/edit/${timing}/${e_id}`} ><button className="btn btn-warning btn-outline">EDIT</button></Link>:<></>}
                    <Link className='' to={`/add/photos/${e_id}`} ><button className="btn btn-warning btn-outline">ADD PHOTOS</button></Link>
                </div>
            </div>
        </>
    )
}

export default TimeComp