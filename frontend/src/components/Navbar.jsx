import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <header className="bg-purple-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold">HH</div>
          <nav className="space-x-4">
            <a href="/ " className="hover:underline">
              Home
            </a>
            <a href="/manage-transactions" className="hover:underline">
              Transactions
            </a>
            <a href="/insights" className="hover:underline">
              Insights
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-6">

          <a href="/logout" className="hover:underline">
            Sign Out
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
