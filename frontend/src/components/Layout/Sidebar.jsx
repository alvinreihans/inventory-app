import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Items', path: '/items' },
    { name: 'Categories', path: '/categories' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Inventory App</h1>

      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-lg 
                ${
                  pathname === item.path
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}>
              {item.name}
            </Link>
          </li>
        ))}

        {/* Logout */}
        <li className="mt-10 pt-10 border-t border-gray-600">
          <button
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white rounded-lg"
            onClick={() => {
              localStorage.removeItem('accessToken');
              window.location.href = '/';
            }}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
