import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          no fish creatives
        </Link>
        <div className="text-sm">
          <a href="mailto:christoffer@nofish.se" className="mr-4 hover:text-primary transition-colors">
            christoffer@nofish.se
          </a>
          <a href="tel:+46704920008" className="hover:text-primary transition-colors">
            +46 70 492 00 08
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;