import Hero from "./Hero";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; //params passing on the url


export const genreColor = (id) => {
    switch (parseInt(id)){
        case 16:
            return 'primary'
        case 99: case 18:
            return 'secondary'
        case 12: case 14:
            return 'success'
        case 28: case 80: case 10749: case 53: case 10752:
            return 'danger'
        case 10402: case 35: case 37: case 878:
            return 'warning'
        case 10751:
            return 'info'
        case 27: case 9648:
            return 'dark'
        default:
            return 'light'
            
    }
}

const GenreTags = ({ genre }) => {
    return(<Link className={`btn btn-sm btn-${genreColor(genre.id)} bg-gradient fw-normal rounded-pill py-1 px-2`} to={`/genre/${genre.id}`} id={genre.id}>{genre.name}</Link>);
}

const Movie = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0129a9c5f5c280e7ff03888872514f22&language=en-US`)
        .then(response => response.json())//making the response to json
        .then(data => {
            setMovieDetails(data);
            setIsLoading(false);
        });
    }, [id]) // replace id with the key that changes, e.g., 'id'

    if(isLoading){
      return <Hero text="Loading..." />
    }
    if(movieDetails){
        const posterUrl   = (movieDetails.poster_path) ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : '/images/no-image.png';
        const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
        const releaseDate = (movieDetails.release_date === '' || movieDetails.release_date === undefined) ? '' : new Date(movieDetails.release_date);
        const statusColor = (movieDetails.status === 'Released') ? 'text-success' : (movieDetails.status === 'Planned') ? 'text-warning' : 'text-danger';
        const ratingColor = function() {
            var rating = movieDetails.vote_average *10;
            if (rating > 80) return 'green'
            if (rating > 70) return 'yellow'
            if (rating > 60) return 'orange'
            else return 'red'
        }
        const genreHtml   = movieDetails.genres.map((obj,i) => {
            return (<>
                    {(i ? ' ' : ' ')} <GenreTags genre={obj} key={i}/>
                </>
            )
      });
      return (
            <div className="movie-container">
                {/* <Hero text={movieDetails.original_title} backdrop={backdropUrl} style={{backgroundColor:'white'}}/> */}
                <div className="container">
                    <div className="row m-3">
                        <div className="col-md-4 my-3 text-center">
                            <img src={posterUrl}  className="img-fluid shadow movie-img" alt={movieDetails.original_title} />
                        </div>
                        <div className="col-md-8 my-3 details-container position-relative">
                            {/* <p className="fs-1 lead fw-bold mb-0"></p> */}
                            <p className="fs-1 lead fw-normal mb-0">
                                <span className='fw-bold'>{movieDetails.title}</span>
                                <span> {(movieDetails.title !== movieDetails.original_title)? `(${movieDetails.original_title})` : ''}</span>
                            </p>
                            {movieDetails.tagline && <p className="fs-5 lead fst-italic mt-0 mb-0">"{movieDetails.tagline}"</p> }
                            <p className="fs-6 lead fw-normal mt-0 mb-2">{releaseDate.toLocaleString('en-US',{'dateStyle':'long'})}</p>
                            <div className="flex-wrapper py-3">
                                <div className="single-chart">
                                    <svg viewBox="0 0 36 36" className={`circular-chart ${ratingColor()}`}>
                                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                        <path className="circle" stroke-dasharray={`${movieDetails.vote_average*10}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                        <text x="18" y="22" className="percentage">{movieDetails.vote_average *10}%</text>
                                    </svg>
                                </div>
                                <div className="block my-auto m-2">
                                    <p className='h-6 fw-bold mb-0'>User</p>
                                    <p className='h-6 fw-bold mt-0 mb-0'>Rating</p>
                                </div>
                                <div className="block my-auto m-2">
                                    <p className='h-6 mb-0'>User Rating</p>
                                </div>
                            </div>
                            { movieDetails.overview !== '' &&
                                <>
                                    <p className="fs-5 lead fw-bold mb-0">Overview</p>
                                    <p className="fs-6 lead fw-normal">{movieDetails.overview}</p>
                                </>

                            }
                            <p className="fs-6 lead fw-normal pb-5">Status: <span className={`fw-bold ${statusColor}`}>{movieDetails.status}</span></p>
                            <div className="my-3 position-absolute bottom-0">{genreHtml}</div>
                        </div>
                    </div>
                </div>
                
                <div className="backdrop-container">
                    <div className="backdrop1" style={{backgroundImage:`url(${backdropUrl})`}}></div>
                    <div className="backdrop2" style={{backgroundImage:`url(${backdropUrl})`}}></div>
                </div>
            </div>
        );
    }
};

export default Movie;