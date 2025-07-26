import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="hover:text-gray-200">📦 Aamira Courier</NavLink>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : 'hover:underline'
              }
            >
              Home
            </NavLink>
          </li>
         
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : 'hover:underline'
              }
            >
              Create Package
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
