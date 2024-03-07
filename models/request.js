const axios = require('axios');

class Searches {


    constructor(){
        // TODO: leer DB
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

}

module.exports = Searches;