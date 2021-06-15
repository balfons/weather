<template>
  <div class="weather-stats">
    <div class="weather-stat" v-for="(stat, index) of stats" :key="index">
      <p class="title">{{stat.title}}</p>
      <p v-if="loadingWeatherStats">Loading..</p>
      <p v-else>{{stat.value}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { WeatherService, WeatherStatsResponse } from '../services/weather.service';

export default class HelloWorld extends Vue {
  private loadingWeatherStats: boolean = false;
  private weatherStats: WeatherStatsResponse | null = null;

  get stats(): Array<{ title: string; value: string; }> {
    return [
      {
        title: 'Average temp',
        value: `${this.weatherStats?.averageTemperature} °C`,
      },
      {
        title: 'Median temp',
        value: `${this.weatherStats?.medianTemperature} °C`,
      },
      {
        title: 'Minimum temp',
        value: `${this.weatherStats?.minTemperature} °C`,
      },
      {
        title: 'Maximum temp',
        value: `${this.weatherStats?.maxTemperature} °C`,
      },
    ];
  }

  async created() {
    try {
      this.loadingWeatherStats = true;
      this.weatherStats = await this.fetchWeatherStats(4);
      this.loadingWeatherStats = false;
    } catch (error) {
      console.error(error);
    }
  }

  private fetchWeatherStats(numberOfDays: number): Promise<WeatherStatsResponse> {
    return WeatherService.getStats(numberOfDays)
      .then(({ data }) => data);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-stats {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07),
      0 2px 4px rgba(0,0,0,0.07),
      0 4px 8px rgba(0,0,0,0.07),
      0 8px 16px rgba(0,0,0,0.07),
      0 16px 32px rgba(0,0,0,0.07),
      0 32px 64px rgba(0,0,0,0.07);
  border-radius: 8px;
  background-color: #fff;

  .weather-stat {
    padding: 1em;
    display: flex;
    flex-direction: column;

    p {
      margin: 0;
    }

    .title {
      font-weight: bold;
      margin-bottom: .5rem;
    }
  }
}
</style>
