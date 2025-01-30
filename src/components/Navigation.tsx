import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="flex justify-between items-center text-white">
        <Link to="/" className="text-xl font-bold">
          no fish creatives
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;