import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
}

interface PopulationData {
  year: number;
  value: number;
}

interface CountryInfoData {
  country: string;
  borders: BorderCountry[];
  populationData: PopulationData[];
  flagUrl: string;
}

const CountryInfo: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [info, setInfo] = useState<CountryInfoData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) {
      setError("No country code provided.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/countries/${code}`)
      .then((res) => setInfo(res.data))
      .catch(() => setError("Failed to fetch country information."))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!info) return <div className="text-center text-gray-500">No data available.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
     
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors"
      >
       Menu
      </button>

     
      <div className="flex items-center gap-6 mb-8">
        <img
          src={info.flagUrl}
          alt={`${info.country} flag`}
          className="w-24 h-24 rounded-lg shadow"
        />
        <h1 className="text-4xl font-bold">{info.country}</h1>
      </div>

     
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Border Countries:</h2>
        {info.borders.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {info.borders.map((border) => (
              <Link
              to={`/country/${border.countryCode}`}
              className="text-xl font-medium text-blue-600 hover:underline"
            >
              <li
                key={border.countryCode}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
              >
                
                  {border.commonName}
               
                <p className="text-sm text-gray-500">Official: {border.officialName}</p>
                <p className="text-sm text-gray-500">Region: {border.region}</p>
              </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No bordering countries.</p>
        )}
      </div>

      {/* Данные о населении */}
      <h2 className="text-2xl font-semibold mb-4">Population Over Time:</h2>
      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Year</th>
            <th className="py-2 px-4 text-left">Population</th>
          </tr>
        </thead>
        <tbody>
          {info.populationData.map((data) => (
            <tr key={data.year} className="border-t">
              <td className="py-2 px-4">{data.year}</td>
              <td className="py-2 px-4">{data.value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryInfo;
