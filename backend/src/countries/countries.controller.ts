import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getAvailableCountries() {
    return await this.countriesService.getAvailableCountries();
  }

  @Get(':code')
  async getCountryInfo(@Param('code') code: string) {
    return await this.countriesService.getCountryInfo(code);
  }
}
