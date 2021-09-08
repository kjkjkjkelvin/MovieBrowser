import Hero from "./Hero";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const [counter, setCounter] = useState(5);
  const history = useHistory();

  
  useEffect(() => {
    if(counter <= 0){
      history.push('/')
    }
    else{
      setTimeout(() => {
       setCounter(counter => counter - 1);
       }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <>
      <Hero text="404: Page not found" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <p className="lead">The URL you entered doesn't exist on this site.</p>
            <p className="lead">You will be redirected to the homepage in <span className="fw-bold text-danger">{counter + (counter > 1 ?  ' seconds' : ' second')}</span>.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
