# Local Weather

## [Live Demo](https://local-weather-24172.firebaseapp.com/)

## This app will display weather based on a zipcode the user inputs. The user must register before having access to this app. The zipcode and other pertinent information will be relayed to the OpenWeatherMap API. Data is stored and retrieved from Firebase and will be formatted and displayed on the screen for the user to see. The user can see today's weather or switch to a 5-day forecast.

## Technology
- HTML5
- CSS3/Bootstrap
- JavaScript/ES6/jQuery
- Node.JS/Browserify/Grunt
- Firebase (database & authentication)

## Screenshots

Here is the page upon load. The background image is 1 of 7 random images that can appear. When the user presses the 'Go!' button, the input is validated, it must be a 5-digit numeric value.

![Page upon load](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/on-load.png)
___

Here, the app has rejected this input because it contained the letter `k`.

![Bad zip](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/validate-input.png)
___

Here are a few examples of the weather in different locales. The background image matches the type of weather that day (clear, cloudy, rainy, misty, or snowy) and is randomly chosen.


![Weather in Nashville](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/current-nashville.png)
___

![Weather in Fort Collins](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/current-fort-collins.png)
___

![Weather in Murfreesboro](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/current.png)
___

If the user clicks the `Forecast` button, the app will remove the current weather and switch to a more detailed forecast view.

![Forecast](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/forecast.png)
___

In the `Forecast` view, the user is able to save events to their personal profile. Each user has their own saved weather events of which they can view, update and delete. After an event is saved, a Bootstrap 3 Alert is shown and the Save icon fades away.

![Forecast view](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/weather-event-saved.png)
___


The user can click the `Dashboard` button to access their saved weather events. The user can mark the event as 'Scary' if the forecast makes them scared. The user may delete weather events as well.

![Dashboard view](https://raw.githubusercontent.com/amillion3/local-weather/master/images/screenshots/dashboard.png)

___
## Running The Project
1. Clone down this repo and CD into project.
2. Install the [http-server](https://www.npmjs.com/package/http-server) plugin via [npm](https://www.npmjs.com/).
3. CD into the `lib` directory and run `npm install` via command line.
4. In the `lib` directory run the command `grunt`.
5. CD to the root of the directory and type `hs` to start the local http-server.
6. The terminal will give you a URL, such as `http://127.0.0.1:8081`, enter that address into your web browser.


## Contributors
[Andy Million](https://github.com/amillion3)