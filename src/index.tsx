import React, { useState, useEffect, FunctionComponent, useRef } from 'react'
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

interface GetWeatherOpts {
    apiKey: string
    location: string
}

type GetWeather = (opts: GetWeatherOpts) => Promise<WeatherData>

const getWeatherData = ({
    apiKey,
    location,
}: GetWeatherOpts): [() => void, Promise<WeatherData>] => {
    const controller = new AbortController()
    const { signal } = controller
    const promise = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`,
        { signal }
    ).then(async (res) => {
        const body = await res.json()
        if (res.status !== 200) {
            throw new Error(body.message)
        }
        return weatherDataFromOpenMapData(body as OpenWeatherMapData)
    })
    return [controller.abort.bind(controller), promise]
}

const DEBOUNCE_MS = 400

const Main: FunctionComponent<MainProps> = (props) => {
    const [weatherData, setWeatherData] = useState<WeatherData | undefined>()
    const [error, setError] = useState<Error | undefined>()
    const locationRef = useRef<string>()
    const apiKeyRef = useRef<string>()

    const queuedReq = useRef<number>()
    const cancelInflightRequest = useRef<() => void>()
    const lastCallArgs = useRef<string>()
    const fetchWeatherFn = () => {
        if (props.onGetWeatherData) {
            return props.onGetWeatherData
        }
        return (opts: GetWeatherOpts) => {
            const argsStr = opts.apiKey + opts.location
            if (argsStr === lastCallArgs.current) {
                // Dedupe calls
                return
            }
            lastCallArgs.current = argsStr
            // Whenever we get another call, cancel any inflight request (only keep the latest one)
            if (cancelInflightRequest.current) {
                cancelInflightRequest.current()
                cancelInflightRequest.current = undefined
            }
            return new Promise<WeatherData>((resolve, reject) => {
                if (queuedReq.current) {
                    // If we call again faster than DEBOUNCE_MS, just cancel our queued request and let this one go instead.
                    window.clearTimeout(queuedReq.current)
                    queuedReq.current = undefined
                }
                queuedReq.current = window.setTimeout(() => {
                    const [cancel, promise] = getWeatherData(opts)
                    cancelInflightRequest.current = cancel
                    promise
                        .then(resolve)
                        .catch((e) => {
                            if (
                                e instanceof DOMException &&
                                e.code === e.ABORT_ERR
                            ) {
                                // Don't show aborted errors to the user
                                return
                            }
                            reject(e)
                        })
                        .finally(() => {
                            queuedReq.current = undefined
                            cancelInflightRequest.current = undefined
                        })
                }, DEBOUNCE_MS)
            })
        }
    }
    useEffect(() => {
        if (
            !weatherData ||
            apiKeyRef.current !== props.apiKey ||
            locationRef.current !== props.location
        ) {
            apiKeyRef.current = props.apiKey
            locationRef.current = props.location
            const promise = fetchWeatherFn()({
                apiKey: props.apiKey,
                location: props.location,
            })
            if (promise) {
                promise
                    .then((data) => {
                        setError(undefined)
                        setWeatherData(data)
                    })
                    .catch(setError)
            }
        }
    }, [props.onGetWeatherData, props.location, props.apiKey])
    return <WeatherView data={weatherData} error={error} />
}

export default Main
