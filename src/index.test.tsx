import React from 'react'
import renderer, { act } from 'react-test-renderer'
import Weather from './index'

test('Basic render works', () => {
    const component = renderer.create(
        <Weather apiKey="fake" location="San Francisco" />
    )
    expect(component.toJSON()).toMatchSnapshot()
})

test('It displays data returned from onGetWeatherData', () => {
    // TODO: this doesn't work yet
    return act(async () => {
        const getWeatherData = jest.fn().mockResolvedValue({
            location: 'Test',
            weatherName: 'bad',
            weatherDesc: 'rainy and bad',
            icon: 'http://openweathermap.org/img/wn/11d@2x.png',
            temp: 42,
            feelsLike: 42,
            tempMin: 42,
            tempMax: 42,
            pressure: 42,
            humidity: 42,
            sunrise: 0,
            sunset: 0,
        })
        const component = renderer.create(
            <Weather
                apiKey="fake"
                location="San Francisco"
                onGetWeatherData={getWeatherData}
            />
        )
        expect(getWeatherData).toHaveBeenCalledWith({
            apiKey: 'fake',
            location: 'San Francisco',
        })
        expect(component.toJSON()).toMatchSnapshot()
    })
})
