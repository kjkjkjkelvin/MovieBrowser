import { useHistory, Link } from "react-router-dom";

// function Navbar(){ //functional component
// export const Navbar = () => { //arroww function
const NavbarContainer = ({ searchText, setSearchText,  FetchMovies, setPageNumber }) => {
  const history = useHistory();
  const updateSearchText = (e) => {
    history.push('/search') //reroutes the page to the search page
    setSearchText(e.target.value);
    FetchMovies(e.target.value);
    setPageNumber(1)
  }
  const handleClick = (el) => {
      if(document.querySelectorAll('.nav-wrapper.collapse.show').length === 1){
          document.getElementById("navbar-toggler").click();
      }
  }

  return (    
    <nav className="navbar fixed-top navbar-expand-md navbar-dark topnav" style={{zIndex:500}}>
        <div className="container-fluid d-md-none" style={{zIndex:501}}>
            <Link className="navbar-brand py-0" to="/">
                <img className="img-logo img-responsive ms-2 me-0" src="/images/jk-logo-fill-navbar.svg" alt="logo" width="auto" height="40px"/>
            </Link>
            <Link className="navbar-brand" to="/" onClick={() => handleClick()}>Movie Browser</Link>
            <a className="navbar-toggler" id="navbar-toggler" href="#navbarSupportedContent" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onclick="void(0)">
                <span className="navbar-toggler-icon"></span>
            </a>
        </div>
        <div className="container-fluid" style={{backgroundColor:'inherit'}}>
            <div className="collapse navbar-collapse nav-wrapper" id="navbarSupportedContent">
                <Link className="navbar-brand d-md-block d-none py-0" to="/">
                    <img className="img-logo img-responsive ms-2 me-0" src="/images/jk-logo-fill-navbar.svg" alt="logo" width="auto" height="40px"/>
                </Link>
                <Link className="navbar-brand d-md-block d-none" to="/">Movie Browser</Link>
                <div className="navbar-nav text-center me-auto mb-0">
                    <Link className="nav-item nav-link active" aria-current="page" to="/" onClick={() => handleClick()}>Home</Link>
                    <Link className="nav-item nav-link" to="/about" onClick={() => handleClick()}>About</Link>
                    <Link className="nav-item nav-link" to="/favorites" onClick={() => handleClick()}>Favorites</Link>
                    <Link className="nav-item nav-link d-md-none" to="/search" onClick={() => handleClick()}>Search</Link>
                </div>
                <form className="d-flex d-none d-md-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={updateSearchText} />
                    <Link className="btn btn-danger" to="/search" onClick={() => handleClick()}>Search</Link>
                </form>
            </div>
        </div>
    </nav>
  );
};

export default NavbarContainer;
