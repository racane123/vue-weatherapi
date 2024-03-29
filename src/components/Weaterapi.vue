<script setup>
import { ref } from 'vue';

const secretKey = import.meta.env.VITE_APP_SECRET_KEY;

const currentWeather = ref([]);

const urls = [
  `http://api.openweathermap.org/geo/1.0/direct?q=manila&limit=5&appid=${secretKey}`,
  `https://api.openweathermap.org/data/2.5/weather?lat=14.5948914&lon=120.9782618&appid=${secretKey}`
];

const fetchPromises = urls.map(url => fetch(url).then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Could not fetch data from: " + url);
  }
}));

Promise.all(fetchPromises)
  .then(data => {
    currentWeather.value = data;
    console.log(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
</script>

<template>
  <div>
    <div>
    </div>
    <div v-for="weather in currentWeather" :key="weather.id">
        <div v-if="weather.country === 'PH'">
            {{ weather.name }}
            {{ weather.lat }}
            {{ weather.lon }}
            {{ weather.country }}
        </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS styles go here */
</style>
