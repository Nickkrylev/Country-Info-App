export interface AvailableCountry {
  code: string;
  name: string;
}

export interface PopulationData {
  year: number;
  population: number;
}

export interface CountryInfo {
  country: string;
  borders: string[];
  populationData: PopulationData[];
  flagUrl: string;
}
