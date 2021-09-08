import Hero from "./Hero";
import { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from "react-router-dom";


export const MovieCard = ({ movie, keys }) => {
    const posterUrl   = (movie.poster_path) ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/no-image.png';
    const detailUrl = `/movies/${movie.id}`;
    const releaseDate = (movie.release_date === '' || movie.release_date === undefined) ? '' : new Date(movie.release_date);
  
    return (
      <div className="col-6 col-sm-4 col-md-3 col-lg-3 card-container mb-4" key={keys}>
          <div className="card">
                <Link to={detailUrl} className="card-view">
                    <img src={posterUrl}  className="card-img-top" alt={movie.title} style={{height: '20em', 'objectFit': 'cover'}}/>
                    <div className="card-body d-flex flex-column pt-2 pb-2" >
                        {/* <h5 className="card-title">{movie.title} {(movie.title !== movie.original_title)? `(${movie.original_title})` : ''}</h5> */}
                        <h4 className="card-title">{movie.title}</h4>
                        <h6 className="card-text fw-normal">{releaseDate.toLocaleString('en-US',{'dateStyle':'long'})}</h6>
                    </div>
                </Link>
          </div>
      </div>
    )
  }

export const sortMovies = (type, isAscending, movies, setMovies) => {
    const sorted = [...movies].sort((a, b) => {
        if(type === 'title' || type === 'release_date'){ 
            var valueA = (a[type]) ? a[type].toUpperCase() : '';
            var valueB = (b[type]) ? b[type].toUpperCase() : '';
            if (valueA === '') { return 0; }
            if (valueB === '') { return 0; }
            if (valueA < valueB) { return -1; }
            if (valueA > valueB) { return 1; }
            return 0;
        }
        else{
            return b[type] - a[type]
        }
    });
    if(!isAscending) sorted.reverse()
    setMovies(sorted);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}

export const AscendingDescending = ({isAscending,setIsAscending,movies,setMovies}) =>{
    return <>
        <div className="row sort-container">
            <div className="col-md-12 col-sm-3 col-12">
                <select class="form-select mb-2" aria-label="Default select example" onChange={(e) => setIsAscending(e.target.value === 'true')}>
                    <option value={true}>Ascending</option>
                    <option value={false}>Descending</option>
                </select>
            </div>
                <div className="col-md-12 col-sm-3 col-4">
                    <button className="btn btn-danger mb-2 px-2 w-100" onClick={() => sortMovies('title',isAscending,movies,setMovies)}>Sort by Title</button>
                </div>
                <div className="col-md-12 col-sm-3 col-4">
                    <button className="btn btn-danger mb-2 px-2 w-100" onClick={() => sortMovies('release_date',isAscending,movies,setMovies)}>Sort by  Date</button>
                </div>
                <div className="col-md-12 col-sm-3 col-4">
                    <button className="btn btn-danger mb-2 px-2 w-100" onClick={() => sortMovies('vote_average',isAscending,movies,setMovies)}>Sort by Rating</button>
                </div>
        </div>
    </>
}

export const Pagination = ({page,pageNumber,maxPage,setPageNumber}) => {
    return  <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li className="page-item">
                        <Link className={`btn btn-secondary rounded-0 border-end rounded-pill rounded-end ${parseInt(pageNumber) === parseInt(1) && 'disabled'}`} to={`/${page}/${parseInt(1)}`} onClick={() => setPageNumber(parseInt(1))}>First</Link>
                    </li>
                    <li className="page-item">
                        <Link className={`btn btn-secondary rounded-0 ${parseInt(pageNumber) === parseInt(1) && 'disabled'}`} to={`/${page}/${parseInt(pageNumber)-1}`} onClick={() => setPageNumber(parseInt(pageNumber)-1)}>Previous</Link>
                    </li>
                    <li className="page-item"><p className="btn btn-danger rounded-0 fw-bold pe-none" style={{width:"50px"}}>{pageNumber}</p></li>
                    <li className="page-item">
                        <Link className={`btn btn-secondary rounded-0 ${parseInt(pageNumber) === parseInt(maxPage) && 'disabled'}`} to={`/${page}/${parseInt(pageNumber)+1}`} onClick={() => setPageNumber(parseInt(pageNumber)+1)}>Next</Link>
                    </li>
                    <li className="page-item">
                        <Link className={`btn btn-secondary rounded-0 border-start rounded-pill rounded-start ${parseInt(pageNumber) === parseInt(maxPage) && 'disabled'}`} to={`/${page}/${parseInt(maxPage)}`} onClick={() => setPageNumber(parseInt(maxPage))}>Last</Link>
                    </li>
                </ul>
            </nav>
}

const Search = ({ keyword, searchResults, isDataLoading, setSearchText, FetchMovies, maxPage, pageNumber, setPageNumber }) => {
    const { pageNum } = useParams();
    const [resultsHtml, setResultsHtml] = useState(<></>);
    const [isAscending, setIsAscending] = useState(true);
    const [movies, setMovies] = useState([]);
    const title = (keyword) ? `You are searching for "${keyword}"` : "Type in the search box";
    const history = useHistory();
    const ResultsBanner = (text) =>
        <div className='offset-lg-2 col-lg-8 offset-md-2 col-md-8 col-sm-12 col-xs-12 my-4 card-container-banner'>
            <div className="card border-secondary bg-transparent">
                <div className="card-body">
                <h2 className="card-title text-center text-secondary">{text}</h2>
                </div>
            </div>
        </div>

    const updateSearchText = (e) => {
        history.push('/search') //reroutes the page to the search page
        setSearchText(e.target.value);
        FetchMovies(e.target.value);
        setPageNumber(1)
    }
    
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

    useEffect(() => {
        setMovies(searchResults)
    }, [searchResults])
    
    useEffect(() => {
        FetchMovies(keyword);
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth"
        // });
        setResultsHtml(ResultsBanner('Loading','offset-lg-2 col-lg-8 offset-md-2 col-md-8'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum])

  
    return (
        <>
            <Hero text={title} />
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-sm-12 d-md-none mb-2">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={keyword} onChange={updateSearchText} />
                            <Link className="btn btn-success" to="/search">Search</Link>
                        </form>
                    </div>
                    { resultsHtml.length === 0 ?
                    (searchResults.length === 0 &&
                    keyword.length !== 0 && ResultsBanner(isDataLoading ? 'Loading' : 'No Results')) :
                    <>
                        <div className="col-12 col-md-2 col-sm-12">
                            <AscendingDescending isAscending={isAscending} setIsAscending={setIsAscending} movies={movies} setMovies={setMovies}/>
                        </div>
                        <div className="col-12 col-md-10">
                            <div className="row">{isDataLoading ? ResultsBanner('Loading') : resultsHtml}</div>
                            <div className="row">
                                <div className="container">
                                    <div className="col-12 my-4">
                                        <Pagination page='search' pageNumber={pageNumber} maxPage={maxPage} setPageNumber={setPageNumber}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </>
  );
};

export default Search;
