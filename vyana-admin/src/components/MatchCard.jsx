import React from 'react'
import skele from '../assets/skeleton.png'
import { Link } from 'react-router-dom'

function MatchCard({ e_id, m_id, team_one, team_two, score_one, score_two, prev_set, winner, date, timing }) {
    return (
        <>

            <div className="card w-96 bg-base-100 text-primary-content shadow-xl w-full md:w-1/3 scale-95 border border-solid border-zinc-900 rounded-md my-2 p-3 box-border">
                <div className="card-body flex flex-wrap gap-2 flex-row">
                    <p>Event ID : {e_id}</p>
                    <p>Match ID :{m_id}</p>
                    <p>Team One : {team_one}</p>
                    <p>Team Two : {team_two}</p>
                    <p>Score One : {score_one}</p>
                    <p>Score Two : {score_two}</p>
                    <p>Previous Sets : {prev_set}</p>
                    <p>Winner : {winner}</p>
                    <p>Date : {date}</p>
                    <p>Status : {timing}</p>
                </div>
                {timing != 'PREV' ? <div className="card-actions justify-center ">
                    <Link to={`/edit/matches/${timing}/${m_id}`} ><button className="btn btn-alert btn-outline">Edit</button></Link>
                </div> : <></>}
            </div>



        </>
    )
}

export default MatchCard