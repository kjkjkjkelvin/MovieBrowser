import "./App.scss";
import { useState } from 'react';
import NavbarContainer from "./components/NavbarContainer";
import Home from "./components/Home";
import About from "./components/About";
import Search from "./components/Search";
import Movie from "./components/Movie";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import Genre from "./components/Genre";
import { Switch, Route } from "react-router-dom";

function App() {

    const [searchResults, setSearchResults] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(true);

    const FetchMovies = (searchText) =>{
        if(searchText){
            setIsDataLoading(true)
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=0129a9c5f5c280e7ff03888872514f22&language=en-US&query=${searchText}&page=1&include_adult=false&page=${pageNumber}`)
            .then(response => response.json())//making the response to json
            .then(data => {
            setSearchResults(data.results)
            setMaxPage(data.total_pages)
            setIsDataLoading(false)
            })
        }
        else{
            setPageNumber(1)
            setSearchResults([]);
        }
    }
  
    return (
        <div id="moviebrowser">
            <NavbarContainer searchText={searchText} setSearchText={setSearchText} FetchMovies={FetchMovies} setPageNumber={setPageNumber}/>
            <Switch>
                {/* first way */}
                <Route path="/" exact>
                <Home />
                </Route>
                {/* second way */}
                <Route path="/about" component={About} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/search/:pageNum?">
                    <Search keyword={searchText} searchResults={searchResults} maxPage={maxPage} pageNumber={pageNumber} setPageNumber={setPageNumber} isDataLoading={isDataLoading} setSearchText={setSearchText} FetchMovies={FetchMovies}/>
                </Route>
                <Route path="/movies/:id" component={Movie} />
                <Route path="/genre/:genreId/:pageNum?" component={Genre} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
