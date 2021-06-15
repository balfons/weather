import { HTTP } from '@/services/http.service';
import { AxiosPromise } from 'axios';

export interface WeatherStatsResponse {
  averageTemperature: number;
  medianTemperature: number;
  maxTemperature: number;
  minTemperature: number;
}

export const WeatherService = {
  getStats: (numberOfDays: number): AxiosPromise<WeatherStatsResponse> => {
    return HTTP.get(`/api/weather/stats?numberOfDays=${numberOfDays}`);
  },
};
