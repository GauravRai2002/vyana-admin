import React, { useEffect, useState } from 'react'
import TimeComp from './TimeComp'
import { Link } from 'react-router-dom'
import MatchCard from './MatchCard'

function MatchList() {
    const [allData, setAllData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/matches').then(res => res.json()).then(result => setAllData(result))
    }, [])


    return (
        <>
            <div className='w-full font-bold my-6'>
                <div className='text-4xl font-bold flex items-center justify-between'>
                    CURRENT MATCHES <Link to={'/add/matches/CURR'}><button className="btn btn-info">ADD</button></Link>
                </div>
                <div className="flex flex-wrap items-center gap-0">
                    {allData.map((data, i) => {
                        return data.timing == 'CURR' ? <MatchCard key={i} e_id={data.e_id} m_id={data.m_id} team_one={data.team_one} team_two={data.team_two} score_one={data.score_one} score_two={data.score_two} prev_set={data.prev_set} winner={data.winner} date={data.date} timing={data.timing} /> : <></>
                    })}
                </div>
                <div className='text-4xl font-bold flex items-center justify-between'>
                    UPCOMING MATCHES <Link to={'/add/matches/NEXT'}><button className="btn btn-info">ADD</button></Link>
                </div>
                <div className="flex flex-wrap items-center gap-0">

                    {allData.map((data, i) => {
                        return data.timing == 'NEXT' ? <MatchCard key={i} e_id={data.e_id} m_id={data.m_id} team_one={data.team_one} team_two={data.team_two} score_one={data.score_one} score_two={data.score_two} prev_set={data.prev_set} winner={data.winner} date={data.date} timing={data.timing} /> : <></>
                    })}
                </div>
                <div className='text-4xl font-bold'>
                    PREVIOUS MATCHES
                </div>
                <div className="flex flex-wrap items-center gap-0">

                {allData.map((data, i) => {
                        return data.timing == 'PREV' ? <MatchCard key={i} e_id={data.e_id} m_id={data.m_id} team_one={data.team_one} team_two={data.team_two} score_one={data.score_one} score_two={data.score_two} prev_set={data.prev_set} winner={data.winner} date={data.date} timing={data.timing} /> : <></>
                    })}
                </div>


            </div>
        </>
    )
}

export default MatchList