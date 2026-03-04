import axios from 'axios';
import { config } from '../config/env';

export class ExchangeRate {
  private static API_URL = `https://v6.exchangerate-api.com/v6/${config.exchangeRateApi}/latest/BRL`;

  static async getUSD() {
    try {
      const response = await axios.get(this.API_URL);

      return response.data.conversion_rates.USD;
    } catch (error) {
      console.error('Error fetching USD exchange rate:', error);
      return 0;
    }
  }
}
