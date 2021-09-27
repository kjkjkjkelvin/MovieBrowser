import Hero from "./Hero";
import { useState, useEffect } from 'react';
import { AscendingDescending, MovieCard } from './Search'


const Home = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    const ResultsBanner = (text) =>
        <div className='offset-lg-2 col-lg-8 offset-md-2 col-md-8 col-sm-12 col-xs-12 my-4 card-container-banner'>
            <div className="card border-secondary bg-transparent">
                <div className="card-body">
                <h2 className="card-title text-center text-secondary">{text}</h2>
                </div>
            </div>
        </div>

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0129a9c5f5c280e7ff03888872514f22&language=en-US`)
        .then(response => response.json())//making the response to json
        .then(data => {
            setMovies(data.results);
            setIsLoading(false);
        });
        try{
            document.querySelector("#navbarTop .active").classList.remove('active')
        }
        catch(e){}
        document.querySelector("#navbarTop .nav-home").classList.add('active')
    }, [])

    const resultsHtml = movies.map((obj,i) => {
        return ( <MovieCard movie={obj} key={i} keys={i}/> )
    });
    return (
        <>
            <Hero text="Popular Movies" />
            <div className="container-fluid">
                <div className="row my-3">
                    { resultsHtml.length ===0 ? ResultsBanner(isLoading ? 'Loading' : 'No Results') :
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

export default Home;
