import { OpenWeatherMapData } from '../src/index'

export const exampleSFWeather: OpenWeatherMapData = {
    coord: {
        lon: -122.42,
        lat: 37.77,
    },
    weather: [
        {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n',
        },
    ],
    base: 'stations',
    main: {
        temp: 58.01,
        feels_like: 50.14,
        temp_min: 54,
        temp_max: 62.6,
        pressure: 1006,
        humidity: 59,
    },
    visibility: 16093,
    wind: {
        speed: 11.41,
        deg: 310,
    },
    clouds: {
        all: 20,
    },
    dt: 1591330291,
    sys: {
        type: 1,
        id: 5817,
        country: 'US',
        sunrise: 1591274909,
        sunset: 1591327684,
    },
    timezone: -25200,
    id: 5391959,
    name: 'San Francisco',
    cod: 200,
}
