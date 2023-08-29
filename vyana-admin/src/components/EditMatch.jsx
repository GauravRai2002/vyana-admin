import React, { useRef, useState, useEffect } from 'react'

function EditMatch({ timing }) {
    const eidRef = useRef()
    const toneRef = useRef()
    const ttwoRef = useRef()
    const soneRef = useRef()
    const [eid, setEid] = useState()
    const stwoRef = useRef()
    var prev = []
    const [prevRefOne, setPrevRefOne] = useState('')
    const [prevRefTwo, setPrevRefTwo] = useState('')
    const [winner, setWinner] = useState()
    const [Timing, setTiming] = useState()
    const dateRef = useRef()
    const midRef = useRef()
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        const pathName = window.location.pathname
        const m_id = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length)
        setEid(m_id)
        fetch(`http://localhost:8000/matches/${m_id}`, {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).then(result => {
            eidRef.current.value = result.e_id
            midRef.current.value = result.m_id
            toneRef.current.value = result.team_one
            ttwoRef.current.value = result.team_two
            soneRef.current.value = result.score_one
            stwoRef.current.value = result.score_two
            prev = result.prev_set
            setWinner(result.winner)
            setTiming(result.timing)
            dateRef.current.value = result.date
        })


    }, [])


    const handleAddSet = (e) => {
        e.preventDefault()
        if (prevRefOne != '' && prevRefTwo != '') {
            const set = {
                'one': `${prevRefOne}`,
                'two': `${prevRefTwo}`
            }
            prev.push(set)
            console.log(prev)
        }
    }

    const handleSubmit = (e) => {
        setErr(false)
        setSuccess(false)
        e.preventDefault()
        if (eidRef.current.value && midRef.current.value && toneRef.current.value && ttwoRef.current.value && soneRef.current.value && stwoRef.current.value && dateRef.current.value && prev && winner) {

            const data = {
                'e_id': `${eidRef.current.value}`,
                'm_id': `${midRef.current.value}`,
                'team_one': `${toneRef.current.value}`,
                'team_two': `${ttwoRef.current.value}`,
                'score_one': `${soneRef.current.value}`,
                'score_two': `${stwoRef.current.value}`,
                'prev_set': `${prev}`,
                'winner': `${winner}`,
                'date': `${dateRef.current.value}`,
                'timing': Timing
            }
            try {
                fetch(`http://localhost:8000/edit/match/${eid}`, {
                    method: 'PUT',
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

        } else if (eidRef.current.value && midRef.current.value && toneRef.current.value && ttwoRef.current.value && soneRef.current.value && stwoRef.current.value && dateRef.current.value && winner) {
            const data = {
                'e_id': `${eidRef.current.value}`,
                'm_id': `${midRef.current.value}`,
                'team_one': `${toneRef.current.value}`,
                'team_two': `${ttwoRef.current.value}`,
                'score_one': `${soneRef.current.value}`,
                'score_two': `${stwoRef.current.value}`,
                'winner': `${winner}`,
                'date': `${dateRef.current.value}`,
                'timing': Timing
            }

            try {
                fetch(`http://localhost:8000/edit/match/${eid}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => {

                    if (res && res.status == 200) setSuccess(true)
                    else setErr(true)
                })
            } catch (error) {
                console.log(error)
                setErr(true)
            }
        } else if (eidRef.current.value && midRef.current.value && toneRef.current.value && ttwoRef.current.value && soneRef.current.value && stwoRef.current.value && dateRef.current.value && prev) {
            const data = {
                'e_id': `${eidRef.current.value}`,
                'm_id': `${midRef.current.value}`,
                'team_one': `${toneRef.current.value}`,
                'team_two': `${ttwoRef.current.value}`,
                'score_one': `${soneRef.current.value}`,
                'score_two': `${stwoRef.current.value}`,
                'prev_set': `${prev}`,
                'date': `${dateRef.current.value}`,
                'timing': Timing
            }

            try {
                fetch(`http://localhost:8000/edit/match/${eid}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => {

                    if (res && res.status == 200) setSuccess(true)
                    else setErr(true)
                })
            } catch (error) {
                console.log(error)
                setErr(true)
            }
        } else if (eidRef.current.value && midRef.current.value && toneRef.current.value && ttwoRef.current.value && soneRef.current.value && stwoRef.current.value && dateRef.current.value) {
            const data = {
                'e_id': `${eidRef.current.value}`,
                'm_id': `${midRef.current.value}`,
                'team_one': `${toneRef.current.value}`,
                'team_two': `${ttwoRef.current.value}`,
                'score_one': `${soneRef.current.value}`,
                'score_two': `${stwoRef.current.value}`,
                'date': `${dateRef.current.value}`,
                'timing': Timing
            }

            try {
                fetch(`http://localhost:8000/edit/match/${eid}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => {

                    if (res && res.status == 200) setSuccess(true)
                    else setErr(true)
                })
            } catch (error) {
                console.log(error)
                setErr(true)
            }
        } else {
            setErr(true)
        }
    }
    return (
        <>

            <div className="font-bold text-3xl text-center my-6">
                Add {timing == 'CURR' ? 'Current' : 'Upcoming'} Match
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
                            <span className="label-text">Event ID :</span>
                        </label>
                        <input ref={eidRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Match ID :</span>
                        </label>
                        <input ref={midRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team One :</span>
                        </label>
                        <input ref={toneRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Team Two :</span>
                        </label>
                        <input ref={ttwoRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Score One :</span>
                        </label>
                        <input ref={soneRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Score Two :</span>
                        </label>
                        <input ref={stwoRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Previous Set :</span>
                        </label>
                        <input value={prevRefOne} onChange={(e) => setPrevRefOne(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        <input value={prevRefTwo} onChange={(e) => setPrevRefTwo(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="button flex items-center mt-8 justify-center w-full">
                        <button onClick={handleAddSet} className="btn btn-accent px-8">Add Set</button>
                    </div>

                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Date :</span>
                        </label>
                        <input ref={dateRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Winner :</span>
                            </label>
                            {/* <input ref={idRef} type="text" placeholder="Type here" className="input input-bordered w-full" /> */}
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Team One</span>
                                    <input onClick={() => setWinner(1)} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Team Two</span>
                                    <input onClick={() => setWinner(2)} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Timing :</span>
                        </label>
                        {/* <input ref={idRef} type="text" placeholder="Type here" className="input input-bordered w-full" /> */}
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Current</span>
                                <input onClick={() => setTiming('CURR')} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Upcoming</span>
                                <input onClick={() => setTiming('NEXT')} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Previous</span>
                                <input onClick={() => setTiming('PREV')} type="radio" name="radio-10" className="radio checked:bg-blue-500" />
                            </label>
                        </div>
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

export default EditMatch