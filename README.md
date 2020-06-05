# weather-view
A weather widget written in React

In general, this is a demonstration repo for publishing shared React components, and all the wild build tools available.

Uses https://openweathermap.org/current to fetch some data and display it. Requires an API key for this service, but it's free for low usage.

Looks like this: ![image of weather component](https://p198.p4.n0.cdn.getcloudapp.com/items/lluJQdbB/Image%202020-06-05%20at%2012.07.22%20AM.png?v=a4e31e2476d45abd78e455152db682c2)

### Usage:

`npm install --save weather-view`

Then, in a React 16 project:

```javascript
import Weather from "weather-view"

export const MyComponent = () => {
    return <div>
        <Weather apiKey={/* Open Weather Map API Key */} location={/* a location to pass to Open Weather Map API */} />
    </div>
}
```