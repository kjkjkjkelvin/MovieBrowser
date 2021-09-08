import Hero from "./Hero";

const About = () => {
  return (
    <>
      <Hero text="About this project"/>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5 text-secondary">
            <p className="lead mb-2 fw-normal">
              This is a project to practice integrating an API to ReactJS.
            </p>
            <p className="lead mb-2 fw-normal">
              I used the <a  href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a> API to access their movie data for it to be viewed and interacted in this project.
            </p>
            <p className="lead mb-2 fw-normal">
              I also followed <a  href="https://www.skillshare.com/user/kalobtaulien" target="_blank" rel="noreferrer">Kalob Taulien</a> lesson to do this. With a couple of revisions to make it my own.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
