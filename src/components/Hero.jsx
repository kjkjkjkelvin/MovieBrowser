const Hero = ({ text, backdrop, bgColor }) => {
    // console.log(bgColor)
  return (
    <header className="hero-container text-white p-5">
      <h1 className="hero-text">{text} {bgColor && <span className={`text-${bgColor}`}>•</span>}</h1>
      {backdrop &&
        <div className="hero-backdrop" style={{backgroundImage:`url(${backdrop})`}}></div>
      }
    </header>
  );
};

export default Hero;
