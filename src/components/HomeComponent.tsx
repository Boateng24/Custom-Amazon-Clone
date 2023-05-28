import Banner from '../assets/ecomm_banner1.jpg'
import '../styles/banner.css'

const HomeComponent = () => {
  return (
    <div className="home">
      <div className="home__container">
        {/* <div className="gradient-overlay" /> */}
        <img
          src={Banner}
          alt="Banner"
          className="h-[70vh] w-[100vw] z-[-1] relative"
        />
      </div>
    </div>
  );
}

export default HomeComponent