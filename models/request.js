const axios = require('axios');

class Searches {

    record = ['-','-','-','-','-'];
    
    constructor(){
        this.loadSearch;
    }
    
    async city (place = ''){
    
        try {

            const instance = axios.create({
                baseURL: `https://geocoding-api.open-meteo.com/v1/search`,
                params: {
                    'name': `${place}`,
                    'count': 4,
                    'language': 'es',
                    'format':'json'
                }
            })

            const answer = await instance.get();
            return answer.data.results.map( places =>({
                id: places.id,
                name: places.admin1 ? `${places.name} - ${places.admin1} - ${places.country}` : `${places.name} - ${places.country}`,
                lat: places.latitude,
                lng: places.longitude

            }))
            
        } catch (error) {
            return [];
        }
    }

    async weatherPlace (lat, lon){
        try {
            const instance = axios.create({
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    'lat': `${lat}`,
                    'lon': `${lon}`,
                    'appid': `${process.env.OPWEATHER_KEY}`,
                    'lang': `es`,
                    'units': `metric`
                }
            })
            const answer = await instance.get();
            return {
                desc: answer.data.weather[0].description,
                min: answer.data.main.temp_min,
                max: answer.data.main.temp_max,
                temp: answer.data.main.temp
                
            }
        } catch (error) {
            console.log('Error en la ejecucción'.red);
        }
    }

    addSearch (place){
        this.record.pop();
        this.record.unshift(place);
    }

    loadSearch(searches = []){
        this.record = searches;
    }

}

module.exports = Searches;