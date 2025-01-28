import React from "react";
import { Link } from "react-router-dom";

interface CountryCardProps {
  code: string;
  name: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ code, name }) => {
  return (
    <Link
      to={`/country/${code}`}
      className="group relative block rounded-lg p-6 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600"
    >
      <div className="absolute inset-0 rounded-lg bg-white opacity-10 group-hover:opacity-20 transition-opacity"></div>
      <h2 className="text-xl font-bold text-white group-hover:text-gray-100">
        {name}
      </h2>
    </Link>
  );
};

export default CountryCard;
