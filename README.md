# weather-view

A weather widget written in React

In general, this is a demonstration repo for publishing shared React components, and all the wild build tools available.

Uses https://openweathermap.org/current to fetch some data and display it. Requires an API key for this service, but it's free for low usage.

Looks like this: ![image of weather component](https://p198.p4.n0.cdn.getcloudapp.com/items/lluJQdbB/Image%202020-06-05%20at%2012.07.22%20AM.png?v=a4e31e2476d45abd78e455152db682c2)

To obtain an API key, go to https://openweathermap.org and sign in, then click on API Keys:

![image of openweathermap website pointing to api keys page](https://p198.p4.n0.cdn.getcloudapp.com/items/Z4uqLlZk/Members%202020-12-03%20at%201.10.36%20PM.jpg?v=6ef1908beafe9b2f3bacc04a7ae2d4a4)

Then generate a new key and copy it to your react component

![image of clicking the generate api key button](https://p198.p4.n0.cdn.getcloudapp.com/items/v1u4D1e1/Members%202020-12-03%20at%201.12.37%20PM.jpg?v=17e066e457a2fdce1b61cd1e32ebaff8)

### Usage:

`npm install --save weather-view`

Then, in a React 16 project:

```javascript
import Weather from 'weather-view'

export const MyComponent = () => {
    return (
        <div>
            <Weather
                apiKey={/* Open Weather Map API Key */}
                location={/* a location to pass to Open Weather Map API */}
            />
        </div>
    )
}
```
