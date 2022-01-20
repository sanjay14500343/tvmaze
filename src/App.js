import React, { useState } from 'react';
import axios from 'axios';

function App(){
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const searchShows = (search) => {
        setSearch(search);
        axios.get(`https://api.tvmaze.com/search/shows?q=${search}`)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const searchActor = (search) => {
        setSearch(search);
        axios.get(`https://api.tvmaze.com/search/people?q=${search}`)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const changeType = (value) => {
        setSearch('');
        setData('')
        if(value === 'Actor'){
            setType('Actor')
        } else if(value === 'Shows'){
            setType('Shows')
        }
    }

    return (
        <div className="tv-maze">
            <div className="container">
                <div className="contentBox">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <h1 className="heading">TV Maze</h1>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <h2 className="search-text">Search your favourites</h2>
                        </div>
                        <div className="col-xs-12 col-md-3 text-right balance-margin">
                            <input type="radio" name="radio" value="Actor" onClick={() => changeType('Actor')}/> Actor &nbsp;&nbsp;
                            <input type="radio" name="radio" value="Shows" onClick={() => changeType('Shows')}/> Shows
                        </div>
                        <div className="col-xs-12 col-md-3">
                            {type && <>
                                {type === 'Actor'
                                    ?<input type="text" className="form-control" placeholder="Search Actor" value={search} onChange={e => searchActor(e.target.value)}/>
                                    :<input type="text" className="form-control" placeholder="Search Shows" value={search} onChange={e => searchShows(e.target.value)}/>
                                }
                            </>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    {data? data.map((data, i) => (
                        <div key={i} className="col-xs-12 col-md-3">
                            {data.show &&
                                <div className="movie-box">
                                    {data.show.image?<img src={data.show.image.medium} alt="Show"/>:<img src="../images/blank.jpg" alt="Show"/>}
                                    <h4>{data.show.name}</h4>
                                    {data.show.summary && <p>{data.show.summary}</p>}
                                </div>
                            }
                            {data.person &&
                                <div className="movie-box">
                                    {data.person.image?<img src={data.person.image.medium} alt="Person"/>:<img src="../images/blank.jpg" alt="Person"/>}
                                    <h4>{data.person.name}</h4>
                                    {data.person.birthday?<h6>{data.person.birthday} {data.person.deathday && <>- {data.person.deathday}</>}</h6>:null}
                                </div>
                            }
                        </div>
                    )):null}
                </div>
            </div>
        </div>
    )
}
export default App;