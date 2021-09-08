import Hero from "./Hero";
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; //params passing on the url
import { AscendingDescending, MovieCard, Pagination } from './Search'
import { genreColor } from './Movie'

const Genre = () => {
    const history = useHistory();
    const { genreId, pageNum } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    const [resultsHtml, setResultsHtml] = useState(<></>);
    const [pageNumber, setPageNumber] = useState(pageNum === undefined ? 1 : pageNum);
    const [maxPage, setMaxPage] = useState(0);
    const ResultsBanner = (text) =>
        <div className='offset-lg-2 col-lg-8 offset-md-2 col-md-8 col-sm-12 col-xs-12 my-4 card-container-banner'>
            <div className="card border-secondary bg-transparent">
                <div className="card-body">
                <h2 className="card-title text-center text-secondary">{text}</h2>
                </div>
            </div>
        </div>
    const LoadMore = () => {
        setIsDataLoading(true)
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0129a9c5f5c280e7ff03888872514f22&with_genres=${genreId}&page=${pageNumber}`)
        .then(response => response.json())//making the response to json
        .then(data => {
            // setMovies(movies => [...movies, ...data.results])
            setMovies(data.results)
            setMaxPage(data.total_pages)
            setIsDataLoading(false)
        })
    }
    const LoadGenres = () => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=0129a9c5f5c280e7ff03888872514f22`)
        .then(response => response.json())//making the response to json
        .then(data => {
            try{
                setGenreName(data.genres.find(x => parseInt(x.id) === parseInt(genreId)).name)
            }
            catch(e){  history.push('/NotFound')  }
        });
    }

    useEffect(() => {
        LoadMore();
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // });
        setResultsHtml(ResultsBanner('Loading','offset-lg-2 col-lg-8 offset-md-2 col-md-8'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreId, pageNumber, pageNum])

    useEffect(() => {
        LoadGenres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if(movies !== undefined){
            setResultsHtml(movies.map((obj,i) => {
                return ( <MovieCard movie={obj} key={i} keys={i}/> )
            }))
        }
        else{
            history.push('/NotFound')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies])

  return (
    <>
        <Hero text={`${genreName} Movies`} bgColor={genreColor(genreId)} />
        <div className="container-fluid">
            <div className="row mb-5">
                { resultsHtml.length ===0 ? ResultsBanner(isDataLoading ? 'Loading' : 'No Results') :
                <>
                    <div className="col-12 col-md-2">
                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <AscendingDescending isAscending={isAscending} setIsAscending={setIsAscending} movies={movies} setMovies={setMovies}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row">{isDataLoading ? ResultsBanner('Loading') : resultsHtml}</div>
                        <div className="row">
                            <div className="container">
                                <div className="col-12 my-4">
                                    <Pagination page={`genre/${genreId}`} pageNumber={pageNumber} maxPage={maxPage} setPageNumber={setPageNumber}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    </>
  );
};

export default Genre;
