import React, { useEffect, useRef, useState } from 'react'

function AddTeams() {
    const [eid, setEid] = useState()
    var teams = []
    const teamName = useRef();
    const photoRef = useRef();
    const playerName = useRef();
    const playerAge = useRef();
    const mobileNumber = useRef();
    const membershipNumber = useRef();
    var cabMember = 0;
    var players = []

    const handleAddPlayers = async (e) => {
        e.preventDefault()
        const data = {
            'name': playerName.current.value,
            'age': playerAge.current.value,
            'mobile': mobileNumber.current.value,
            'member': membershipNumber.current.value,
            'cabMember': cabMember
        }
        players.push(data)
        playerAge.current.value = ''
        playerName.current.value = ''
        membershipNumber.current.value = ''
        mobileNumber.current.value = ''
        cabMember = 0
        console.log(players)
    }

    const handleSubmitTeam = async (e) => {
        e.preventDefault()

        uploadLogo(photoRef.current.files)

    }

    async function uploadLogo(file) {
        let files = [...photoRef.current.files];
        var results = await Promise.all(files.map(f => { return readAsDataURLlogo(f) }));
        //all images' base64encoded data will be available as array in images
        console.log(results)
        const dataTeam = {
            'logo': results[0],
            'name': teamName.current.value,
            'players': players
        }
        teamName.current.value = ''
        teams.push(dataTeam)
        players = [];

        const data = {
            'teams': teams
        }

        try {
            fetch(`https://vyana-sports-back-end.vercel.app/add/teams/${eid}`, {
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
        console.log(teams)
    }

    function readAsDataURLlogo(file) {
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
                }
            }
            fileReader1.readAsDataURL(file);
        })
    }


    useEffect(() => {
        const pathName = window.location.pathname
        const e_id = pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length)
        setEid(e_id)
    }, [])


    


    return (
        <div className='flex items-center justify-center flex-col gap-8'>
            <form id='form' className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-4 my-6'>
                <div className='flex flex-wrap w-full items-center justify-center'>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label w-fit">
                            <span className="label-text">Team Name :   </span>
                        </label>
                        <input ref={teamName} type="text" className="input input-bordered w-96" />
                    </div>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label">
                            <span className="label-text">Team Logo :   </span>
                        </label>
                        <input ref={photoRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                    </div>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label w-fit">
                            <span className="label-text">Player Name :   </span>
                        </label>
                        <input ref={playerName} type="text" className="input input-bordered w-96" multiple />
                    </div>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label w-fit">
                            <span className="label-text">Player Age :   </span>
                        </label>
                        <input ref={playerAge} type="text" className="input input-bordered w-96" multiple />
                    </div>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label w-fit">
                            <span className="label-text">Mobile Number :   </span>
                        </label>
                        <input ref={mobileNumber} type="text" className="input input-bordered w-96" multiple />
                    </div>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label w-fit">
                            <span className="label-text">Membership Number :   </span>
                        </label>
                        <input ref={membershipNumber} type="text" className="input input-bordered w-96" multiple />
                    </div>
                    <div className="form-control w-1/2 flex flex-row justify-center items-center gap-3 flex-wrap my-2">
                        <label className="label w-fit">
                            <span className="label-text">Cab Registration :   </span>
                        </label>
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <span className="label-text m-3">Yes</span>
                                <input onClick={() => {
                                    cabMember = 1
                                }} type="radio" name="cab" className="radio checked:bg-blue-500" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text m-3">No</span>
                                <input onClick={() => {
                                    cabMember = 0
                                }} type="radio" name="cab" className="radio checked:bg-red-500" />
                            </label>
                        </div>
                    </div>
                    <button onClick={handleAddPlayers} className='btn btn-outline btn-accent w-full md:w-2/5 mx-auto'>Add</button>
                </div>
                <button onClick={handleSubmitTeam} className='btn btn-outline btn-accent w-full md:w-2/5 mx-auto'>Submit</button>
            </form>
        </div>
    )
}

export default AddTeams