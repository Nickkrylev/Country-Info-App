import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { AvailableCountry, CountryInfo } from '../types/countries.types';

@Injectable()
export class CountriesService {
  private readonly dateNagerBaseUrl = 'https://date.nager.at/api/v3';
  private readonly countriesNowBaseUrl = 'https://countriesnow.space/api/v0.1';

  async getAvailableCountries(): Promise<AvailableCountry[]> {
    try {
      const response = await axios.get(`${this.dateNagerBaseUrl}/AvailableCountries`,);
      return response.data.map((country) => ({
        code: country.countryCode,
        name: country.name,
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch available countries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfo> {

    try {
      const [countryInfo, populationData, flagData] = await Promise.all([
        axios.get(`${this.dateNagerBaseUrl}/CountryInfo/${countryCode}`),
        axios.get(`${this.countriesNowBaseUrl}/countries/population`),
        axios.get(`${this.countriesNowBaseUrl}/countries/flag/images`),
      ]);

      const countryDetails = countryInfo.data;
    
      const population = populationData.data.data.find((c) => c.country === countryDetails.commonName) ?.populationCounts || [];
      const flagUrl = flagData.data.data.find((c) => c.name === countryDetails.commonName,)?.flag;

      return {
        country: countryDetails.officialName,
        borders: countryDetails.borders,
        populationData: population,
        flagUrl,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch country details',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
