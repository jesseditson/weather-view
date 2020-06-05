import React, { SFC } from 'react'
import styled from '@emotion/styled'
import { injectGlobal } from 'emotion'

injectGlobal`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');
`

const Container = styled.div`
    padding: 20px;
    font-size: 24px;
    font-family: 'Noto Sans TC', sans-serif;
`
const RoundedContainer = styled.div`
    background: #f2f2f2;
    border-radius: 20px;
    color: #666;
    padding: 24px;
    padding-bottom: 32px;
    position: relative;
    display: flex;
    flex-direction: column;
`
const WeatherIcon = styled.img`
    position: absolute;
    top: -40px;
    left: -40px;
`
const LocationName = styled.h2`
    font-size: 24px;
    font-weight: 400;
    margin: 0;
    margin-left: 50px;
`
const HeroTemp = styled.h1`
    font-size: 50px;
    display: flex;
    font-weight: 400;
    align-items: center;
    margin: 0;
`
const Subtitle = styled.span`
    font-size: 14px;
    color: #999;
`

export interface WeatherData {
    location: string
    weatherName: string
    weatherDesc: string
    icon: string
    temp: number
    feelsLike: number
    tempMin: number
    tempMax: number
    pressure: number
    humidity: number
    sunrise: number
    sunset: number
}

interface WeatherViewProps {
    data?: WeatherData
    error?: Error
}

export const WeatherView: SFC<WeatherViewProps> = (props) => {
    if (props.error) {
        return <Container>{props.error.message}</Container>
    } else if (!props.data) {
        return <Container>Loading...</Container>
    }
    return (
        <Container>
            <RoundedContainer>
                <WeatherIcon src={props.data.icon} />
                <LocationName>{props.data.location}</LocationName>
                <HeroTemp>{Math.round(props.data.temp)}°F</HeroTemp>
                <Subtitle>
                    {props.data.weatherDesc}, feels Like{' '}
                    {Math.round(props.data.feelsLike)}°F
                </Subtitle>
            </RoundedContainer>
        </Container>
    )
}
