require('dotenv').config()

const {inquirerMenu, readInput, pause, listPlaces} = require('./helpers/InteractiveMenu');
const Searches = require('./models/request');

const searches = new Searches();


const main = async() =>{
    let opt;

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                const search = await readInput('Ciudad deseada: ');
                const places = await searches.city(search);
                if (places == []) {
                    
                    const  id = await listPlaces(places);
                    if (id!== 0) {
                        const selPlace = places.find(p => p.id === id);
                        console.log(`\n${'Información de la ciudad'.white}\n${'Ciudad:'.yellow} ${selPlace.name}\n${'Latitud:'.yellow} ${selPlace.lat}\n${'Longitud:'.yellow} ${selPlace.lng}`);
                    }else{
                        console.log('Acción cancelada'.white);
                    }
                }else{
                    console.log('No existen coincidencias'.red);
                }


                break;
            case 2:
                console.log('elegiste la opción 2');
                break;
        }
        await pause();
    } while (opt !== 0);
}

main();