import React, { useEffect, useRef, useState } from 'react'

function AddLink() {
    const link = useRef();
    const [eid, setEid] = useState()
    const handleSubmitLink = async (e) => {
        e.preventDefault()
        const data = {
            'cricheroes': link.current.value
        }
        try {
            fetch(`https://vyana-sports-back-end.vercel.app/add/link/${eid}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(resp => {
                return resp.json()
            }).then((res) => {
                console.log(res)
            })
        } catch (e) {
            console.log(e.message)
        }

    }


    useEffect(() => {
        const pathName = window.location.pathname
        const e_id = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length)
        setEid(e_id)
    }, [])



    return (
        <div className='flex items-center justify-center flex-col gap-8'>
            <form id='form' className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-4 my-6'>
                <div className="form-control w-full flex flex-row justify-center items-center gap-3 flex-wrap">
                    <label className="label w-fit">
                        <span className="label-text">Link :   </span>
                    </label>
                    <input ref={link} type="text" className="input input-bordered w-96" multiple />
                </div>
                <button onClick={handleSubmitLink} className='btn btn-outline btn-accent w-full md:w-2/5 mx-auto'>Submit</button>
            </form>
        </div>
    )
}

export default AddLink