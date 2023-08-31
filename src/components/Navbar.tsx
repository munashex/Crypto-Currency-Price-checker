import { Link } from 'react-router-dom';

function Navbar() {
  const logoUrl =
    'https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png';



  

  return (
    <div className="my-3">
      {/* navbar on sm screen */}
      <div className="flex md:hidden items-center mx-3 gap-x-5">
        <span>
        </span>
        <Link to="">
        <img src={logoUrl} alt="crypto" className="w-40 animate-pulse" />
        </Link>
      </div>

      

      {/* navbar on md screens and lg */}
      <div className="hidden md:flex items-center justify-between md:mx-20 mx-24">
        <div className="flex flex-row items-center gap-x-3">
          <Link to="/"> 
          <img src={logoUrl} alt="crypto" className="w-44" />
          </Link>
        </div>
      </div>

      <div className="border-b py-1 md:py-2"></div>
    </div>
  );
}

export default Navbar;

