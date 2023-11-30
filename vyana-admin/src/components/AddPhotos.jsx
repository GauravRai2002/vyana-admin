import React, { useEffect, useRef, useState } from 'react'
import Compressor from 'compressorjs';
import logo from '../assets/logo.png'
// import { watermark } from 'purejswatermark/dist/watermark';
// import watermark from 'purejswatermark'

function AddPhotos() {
    const [eid, setEid] = useState()
    const photoRef = useRef()
    // var formData = new FormData()
    const [loading, setLoading] = useState(0)
    const progressRef = useRef()

    const handleAddPhotos = async(e) => {

        e.preventDefault()
        const count = photoRef.current.files.length
        var counter = 0
        progressRef.current.classList.remove('hidden')
        progressRef.current.classList.add('block')
        for (var i = 0; i < count; i++) {

            new Compressor(photoRef.current.files[i], {
                quality: 0.6,
                async success(result) {
                    const formData = new FormData();
                    formData.append('images', result);
                    for (const values of formData) {
                        console.log(values)
                    }
                    try {
                        fetch(`http://195.35.45.206:5000/indexFaces/${eid}`, {
                            method: 'POST',
                            body: formData
                        }).then(resp => {
                            return resp.json()
                        }).then((res) => {
                            console.log(res)
                            counter++

                            const percentage = (counter / count) * 100
                            setLoading(percentage)
                            console.log(counter)
                        })
                    } catch (e) {
                        console.log(e.message)
                    }
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }








    }


    useEffect(() => {
        const pathName = window.location.pathname
        const e_id = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length)
        setEid(e_id)
    }, [])



    return (
        <div className='flex items-center justify-center flex-col gap-8'>
            <progress ref={progressRef} className="progress progress-success w-5/6 h-4 my-6 mt-16 mx-auto " value={`${loading}`} max="100"></progress>
            <form id='form' encType="multipart/form-data" className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-4 my-6'>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Photos :   </span>
                    </label>
                    <input ref={photoRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" multiple />
                </div>
                <button onClick={handleAddPhotos} className='btn btn-outline btn-accent w-full md:w-2/5 mx-auto'>Add</button>
            </form>
        </div>
    )
}

export default AddPhotos