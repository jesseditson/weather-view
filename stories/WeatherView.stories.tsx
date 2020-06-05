import React from 'react'
import { WeatherView } from '../src/WeatherView'
import { exampleSFWeather } from './fixtures'
import Main, { weatherDataFromOpenMapData } from '../src/index'

export default {
    title: 'Weather View',
    component: WeatherView,
}

export const SFWeather = () => (
    <WeatherView data={weatherDataFromOpenMapData(exampleSFWeather)} />
)

SFWeather.story = {
    name: 'SF Weather',
}

export const MainWrapper = () => (
    <Main
        // TODO: env vars don't appear to be available despite docs saying they are
        apiKey={process.env.API_KEY || 'API_KEY_NOT_SET'}
        location="San Francisco"
    />
)

MainWrapper.story = {
    name: 'Hitting Live API',
}

export const ShowingError = () => (
    <WeatherView error={new Error('Oh no there was an error')} />
)

ShowingError.story = {
    name: 'Showing an Error',
}
