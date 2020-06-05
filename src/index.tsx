import React, { SFC, useState, useEffect } from 'react'
import { WeatherView, WeatherData } from './WeatherView'

interface MainProps {
    apiKey: string
    location: string
    onGetWeatherData?: (options: {
        apiKey: string
        location: string
    }) => Promise<WeatherData>
}

export interface OpenWeatherMapData {
    coord: {
        lon: number
        lat: number
    }
    weather: [
        {
            id: number
            main: string
            description: string
            icon: string
        }
    ]
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}

export const weatherDataFromOpenMapData = (
    data: OpenWeatherMapData
): WeatherData => {
    return {
        location: data.name,
        weatherName: data.weather[0].main,
        weatherDesc: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
    }
}

const getWeatherData = async ({
    apiKey,
    location,
}: {
    apiKey: string
    location: string
}): Promise<WeatherData> => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
    )
    const body = await res.json()
    if (res.status !== 200) {
        throw new Error(body.message)
    }
    return weatherDataFromOpenMapData(body as OpenWeatherMapData)
}

const Main: SFC<MainProps> = (props) => {
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>()
    const [error, setError] = useState<Error | undefined>()
    useEffect(() => {
        const fetchData = props.onGetWeatherData || getWeatherData
        if (!weatherData) {
            fetchData({
                apiKey: props.apiKey,
                location: props.location,
            })
                .then(setWeatherData)
                .catch(setError)
        }
    }, [props.onGetWeatherData])
    return <WeatherView data={weatherData} error={error} />
}

export default Main
