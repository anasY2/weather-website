const request=require('request');
const weather = ({lat,long,place}, callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=2a667163f62461201eb332cfbfe6f163&query=" +
     lat+","+long;
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect!",undefined);
      } else if (response.body.error) {
        callback("Unable to find the location!",undefined);
      } else {
        let data = {
          temp: response.body.current.temperature,
          feelTemp: response.body.current.feelslike,
          desc: response.body.current.weather_descriptions[0],
          place:place
        };
        callback(undefined,data);
      }
    });
  };
module.exports=weather;

