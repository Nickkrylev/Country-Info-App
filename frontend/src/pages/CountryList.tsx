import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";

interface Country {
  code: string;
  name: string;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://date.nager.at/api/v3/AvailableCountries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Countries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.code} code={country.code} name={country.name} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
