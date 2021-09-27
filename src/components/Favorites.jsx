import Hero from "./Hero";
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from "axios";
import { AscendingDescending, MovieCard } from './Search'
//account_id = 10951416



const Favorites = () => {
    const movieIds = [508943,372058,299536,496243,299534,129,324857,177572,4935,393];
    const [movies, setMovies] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    const ResultsBanner = (text) =>
        <div className='offset-lg-2 col-lg-8 offset-md-2 col-md-8 col-sm-12 col-xs-12 my-4 card-container-banner'>
            <div className="card border-secondary bg-transparent">
                <div className="card-body">
                <h2 className="card-title text-center text-secondary">{text}</h2>
                </div>
            </div>
        </div>

    function fetchData() {
        var allItems = [];
   
        setIsDataLoading(true);
        movieIds.map((obj,i) => {
            allItems[i] = axios.get(`https://api.themoviedb.org/3/movie/${obj}?api_key=0129a9c5f5c280e7ff03888872514f22&language=en-US`);
            return allItems;
        });

        axios.all(allItems).then(
            axios.spread((...allData) =>{
                setMovies(allData.map((obj,i) => {
                    return(obj.data)
                }));
                setIsDataLoading(false);
            })
        )
    }
    useEffect(() => {
        fetchData();
        try{
            document.querySelector("#navbarTop .active").classList.remove('active')
        }
        catch(e){}
        document.querySelector("#navbarTop .nav-favorites").classList.add('active')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])//empty array for one-time loading

    const resultsHtml = movies.map((obj,i) => {
        return ( <MovieCard movie={obj} key={i} keys={i}/> )
      });

    return (
        <>
            <Hero text="My Favorite Movies" />
            <div className="container-fluid">
                <div className="row my-3">
                    { resultsHtml.length ===0 ? ResultsBanner(isDataLoading ? 'Loading' : 'No Results') :
                    <>
                        <div className="col-12 col-md-2 col-sm-12">
                            <AscendingDescending isAscending={isAscending} setIsAscending={setIsAscending} movies={movies} setMovies={setMovies}/>
                        </div>
                        <div className="col-12 col-md-10">
                            <div className="row">{resultsHtml}</div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    );
};

export default Favorites;