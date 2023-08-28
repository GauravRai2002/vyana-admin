import React, { useRef, useState } from 'react'

function AddForm({ timing }) {
    const nameRef = useRef()
    const [imageSource, setImageSource] = useState()
    const photoRef = useRef();
    const idRef = useRef()
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        setErr(false)
        setSuccess(false)
        e.preventDefault()
        if (nameRef.current.value && idRef.current.value && photoRef.current.files[0]) {
            const imgdata = new FileReader()
            imgdata.readAsDataURL(photoRef.current.files[0])
            imgdata.onloadend = ()=>{
                setImageSource(imgdata.result)
            }

            const data = {
                'e_name':`${nameRef.current.value}`,
                'e_id':`${idRef.current.value}`,
                'e_logo':imageSource,
                'timing':timing
            }
            try{
                fetch(`http://localhost:8000/add/events`,{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res=>{
                    if(res.status==200) setSuccess(true)
                    else setErr(true)
                })
            }catch(error){
                console.log(error)
                setErr(true)
            }

        }else if(nameRef.current.value && idRef.current.value){
            const data = {
                'e_name':`${nameRef.current.value}`,
                'e_id':`${idRef.current.value}`,
                'timing':timing
            }

            try {
                fetch(`http://localhost:8000/add/events`,{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res=> {
                
                    if(res && res.status==200) setSuccess(true)
                    else setErr(true)
                })
            } catch (error) {
                console.log(error)
                setErr(true)
            }
        }else{
            setErr(true)
        }
    }
    return (
        <>

            <div className="font-bold text-3xl text-center my-6">
                Add {timing == 'CURR' ? 'Current' : 'Upcoming'} Event
            </div>
            {err ? <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error! Fill All Details.</span>
            </div> : <></>}
            {success ? <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Success! Event Added Successfully.</span>
            </div> : <></>}
            <form className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-2 my-6'>
                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Event Name :</span>
                        </label>
                        <input ref={nameRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Event ID :</span>
                        </label>
                        <input ref={idRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Logo :   </span>
                        </label>
                        <input ref={photoRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full">

                        <div className="button flex items-center mt-8 justify-center w-full">
                            <button onClick={handleSubmit} type='submit' className="btn btn-accent px-8">Subimt Form</button>
                        </div>
                    </div>
                </div>


            </form>
        </>
    )
}

export default AddForm