import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";

interface PopulationData {
  year: number;
  population: number;
}

interface CountryInfo {
  country: string;
  borders: string[];
  populationData: PopulationData[];
  flagUrl: string;
}

const CountryInfo: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/countries/${code}`);
        setCountryInfo(response.data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };
    fetchCountryInfo();
  }, [code]);

  if (!countryInfo) return <div>Loading...</div>;

  const chartData = {
    labels: countryInfo.populationData.map((data) => data.year),
    datasets: [
      {
        label: "Population",
        data: countryInfo.populationData.map((data) => data.population),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img src={countryInfo.flagUrl} alt={`${countryInfo.country} flag`} className="w-16 h-16 mr-4" />
        <h1 className="text-3xl font-bold">{countryInfo.country}</h1>
      </div>
      <h2 className="text-xl font-bold mb-2">Border Countries:</h2>
      <ul className="list-disc pl-5 mb-4">
        {countryInfo.borders.map((border) => (
          <li key={border}>
            <Link to={`/country/${border}`} className="text-blue-500 hover:underline">
              {border}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-2">Population Over Time:</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CountryInfo;
