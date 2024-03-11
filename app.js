require('dotenv').config()

const {inquirerMenu, readInput, pause, listPlaces} = require('./helpers/InteractiveMenu');
const { saveDB, readDB } = require('./helpers/saveFile');

const Searches = require('./models/request');



const main = async() =>{
    
    const searchDB = readDB();
    let opt;
    
    const searches = new Searches();
    if (searchDB) {
        searches.loadSearch(searchDB);
    }
    
    do {
        console.log(searches.record);
        let search = {};
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                const cityname = await readInput('Ciudad deseada: '.white);
                const places = await searches.city(cityname);
                if (places.length !== 0) {    
                    const  id = await listPlaces(places);
                    if (id!== 0) {
                        const selPlace = places.find(p => p.id === id);
                        const dataPlace = await searches.weatherPlace(selPlace.lat, selPlace.lng);
                        console.log('\nInformación de la ciudad'.white 
                        + '\nCiudad: '.yellow + `${selPlace.name}`.white 
                        + '\nLatitud: '.yellow + `${selPlace.lat}`.white 
                        + '\nLongitud: '.yellow + `${selPlace.lng}`.white
                        + '\nEstato del clima: '.yellow + `${dataPlace.desc}`.white
                        +'\nTemperatura actual: '.yellow + `${dataPlace.temp}`.white
                        +'\nTemperatura minima: '.yellow + `${dataPlace.min}`.white
                        +'\nTemperatura máxima: '.yellow + `${dataPlace.max}`.white);
                        search = {
                            name: selPlace.name,
                            desc: dataPlace.desc,
                            temp: dataPlace.temp
                        }
                        searches.addSearch(search);
                    }else{
                        console.log('Acción cancelada'.white);
                    }
                }else{
                    console.log('No existen coincidencias'.red);
                }

                break;
            case 2:
                searches.record.forEach((place, i) =>{
                    const idx =  `${i+1}.`.yellow;
                    if (place.name === undefined) {
                        console.log(' ')
                    }else{

                        console.log(`${idx} ${place.name}\n${place.temp}\n${place.desc}`);
                    }
                })
                break;
        }

        saveDB(searches.record);
        await pause();
    } while (opt !== 0);
}

main();