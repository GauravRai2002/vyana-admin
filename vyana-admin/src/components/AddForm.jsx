import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddForm({ timing }) {
    const navigate = useNavigate()
    const nameRef = useRef()
    const videoRef = useRef()
    var imageSource
    const photoRef = useRef();
    const scheduleRef = useRef();
    const resultRef = useRef();
    const rulesRef = useRef();
    const idRef = useRef()
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    var video = []
    var results
    var schedule
    var rules



    const handleVideoAdd = (e) => {
        e.preventDefault()
        video.push(videoRef.current.value)
        videoRef.current.value = ''
        console.log(video)
    }


    const handleSubmit = (e) => {
        setErr(false)
        setSuccess(false)
        e.preventDefault()
        
        const imgdata = new FileReader()
        imgdata.readAsDataURL(photoRef.current.files[0])
        imgdata.onloadend = () => {
            fetch(`https://vyana-sports-back-end.vercel.app/upload`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ data: imgdata.result })
                    }).then(resp => {
                        return resp.json()
                    }).then(data => {
                        imageSource = data.res
                        uploadImages()
                    })
        }
        console.log(video)
        



    }

    const uploadImages = async () => {
        await uploadSchedule(scheduleRef.current.files)
    }


    async function uploadSchedule(file) {
        let files = [...scheduleRef.current.files];
        schedule = await Promise.all(files.map(f => { return readAsDataURLSchedule(f) }));
        //all images' base64encoded data will be available as array in images
        console.log(schedule)
        await uploadRules(rulesRef.current.files)
    }
    async function uploadRules(file) {
        let files = [...rulesRef.current.files];
        rules = await Promise.all(files.map(f => { return readAsDataURLRule(f) }));
        //all images' base64encoded data will be available as array in images
        console.log(rules)
        await uploadResults(resultRef.current.files)
    }
    async function uploadResults(file) {
        let files = [...resultRef.current.files];
        results = await Promise.all(files.map(f => { return readAsDataURLResult(f) }));
        //all images' base64encoded data will be available as array in images
        console.log(results)
        upload()
    }



    function readAsDataURLResult(file) {
        return new Promise((resolve, reject) => {
            var finalresult
            let fileReader2 = new FileReader();
            fileReader2.onloadend = function () {
                try {
                    fetch(`https://vyana-sports-back-end.vercel.app/upload`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ data: fileReader2.result })
                    }).then(resp => {

                        return resp.json()
                    }).then(data => {
                        resolve({ url: data.res })
                    })
                } catch (error) {
                    console.log(error)
                    setErr(true)
                }
            }
            fileReader2.readAsDataURL(file);
            
        })
    }



    function readAsDataURLRule(file) {
        return new Promise((resolve, reject) => {
            var finalresult
            let fileReader1 = new FileReader();
            fileReader1.onloadend = function () {
                try {
                    fetch(`https://vyana-sports-back-end.vercel.app/upload`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ data: fileReader1.result })
                    }).then(resp => {

                        return resp.json()
                    }).then(data => {
                        resolve({ url: data.res })
                    })
                } catch (error) {
                    console.log(error)
                    setErr(true)
                }
            }
            fileReader1.readAsDataURL(file);
        })
    }



    function readAsDataURLSchedule(file) {
        return new Promise((resolve, reject) => {
            var finalresult
            let fileReader = new FileReader();
            fileReader.onloadend = function () {
                try {
                    fetch(`https://vyana-sports-back-end.vercel.app/upload`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ data: fileReader.result })
                    }).then(resp => {

                        return resp.json()
                    }).then(data => {
                        resolve({ url: data.res })
                    })
                } catch (error) {
                    console.log(error)
                    setErr(true)
                }
            }
            fileReader.readAsDataURL(file);
        })
    }


    const upload = () => {
        console.log('upload function called')
        const data = {
            'e_name': `${nameRef.current.value}`,
            'e_id': `${idRef.current.value}`,
            'e_logo': `${imageSource}`,
            'timing': timing,
            'rules': rules,
            'schedule': schedule,
            'result': results,
            'videos': video
        }
        try {
            fetch(`https://vyana-sports-back-end.vercel.app/add/events`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.status == 200) setSuccess(true)
                else setErr(true)
            })
        } catch (error) {
            console.log(error)
            setErr(true)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('uid')) {
            navigate('/login')
        }
    }, [])


    return (
        <>

            <div className="font-bold text-3xl text-center my-6">
                Add {timing == 'CURR' ? 'Current' : timing== 'NEXT'? 'Upcoming':'Previous'} Event
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
                        <label className="label">
                            <span className="label-text">Schedule :   </span>
                        </label>
                        <input ref={scheduleRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" multiple />
                    </div>

                </div>


                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Results :   </span>
                        </label>
                        <input ref={resultRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" multiple />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Rules :   </span>
                        </label>
                        <input ref={rulesRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" multiple />
                    </div>

                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Video Id :</span>
                        </label>
                        <input ref={videoRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">

                        <div className="button flex items-center mt-8 justify-center w-full">
                            <button onClick={handleVideoAdd} type='submit' className="btn btn-accent px-8">Add</button>
                        </div>
                    </div>


                </div>

                <div className="form-control w-full">

                    <div className="button flex items-center mt-8 justify-center w-full">
                        <button onClick={handleSubmit} type='submit' className="btn btn-accent px-8">Subimt Form</button>
                    </div>
                </div>


            </form>
        </>
    )
}

export default AddForm