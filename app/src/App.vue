<template>
  <main>
    <WeatherStats />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import WeatherStats from './components/WeatherStats.vue'

@Options({
  components: {
    WeatherStats,
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
main {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
