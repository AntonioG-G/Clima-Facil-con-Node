
const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: `${'Selecciona una opcion ↑ ↓'.yellow}`,
        choices: [
            {
                value: 1,
                name: `${'1.'.yellow} ${'Buscar ciudad'.white}`
            }, 
            {
                value: 2,
                name: `${'2.'.yellow} ${'Historial'.white}`
            },
            {
                value: 0,
                name: `${'0.'.yellow} ${'Salir'.white}`
            }
        ]
    }
];


const pauseInput = [
    {
        type: 'input',
        name: 'pauseI',
        message: `\n\nPresiona ${'Enter'.yellow} para continuar: `
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('=================================='.yellow);
    console.log('   Conoce el clima con Node.JS'.white);
    console.log('==================================\n'.yellow);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pause = async ()=>{    
    const inputpause = await inquirer.prompt(pauseInput)
}


const readInput = async(msg) =>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate( value){
                if( value.length === 0){
                    return 'Por favor, ingresa un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async(places = []) =>{
    const choices = places.map( (place, i) =>{
            return{
                value: place.id,
                name:`${i+1}. ${place.name}`.white
            }
    });
    choices.unshift({
        value: 0,
        name: '0. '.white +'Cancelar'.red
    })
    const question = [
        {
            type: 'list',
            name: 'ids',
            message: `${'Selecciona la ciudad deseada ↑↓'.yellow}`,
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

// We define an asynchronous function 'changeStatus' to change the status of tasks.
const changeStatus = async(tasks = [])=>{

    const choices = tasks.map( (task, i) =>{
        if (task.completeDate !== null) {
            return{
                value: task.id, // The value to return if this choice is selected.
                name: `${i+1}. ${task.description.white} ${'Completada'.green} ${'→'.white} ${'Pendiente'.red}` // The name of the choice to display to the user.
            }
        }else{
            return{
                value: task.id,
                name: `${i+1}. ${task.description.white} ${'Pendiente'.red} ${'→'.white} ${'Completada'.green}`
            }
        }
    });
    //We add the Cancel as the first option.
    choices.unshift({
        value: 0,
        name: '0. '.white +'Cancelar'.red
    })
    const question = [
        {
            type: 'checkbox', // The type of prompt is 'checkbox', which allows the user to select multiple choices.
            name: 'ids', // The name of the answer for this question will be 'ids'.
            message: `${'Selecciona las opciones a borrar ↑↓'.yellow}`, // The message to display when prompting the user.
            choices // The choices for the 'checkbox' prompt.
        }
    ]
    const {ids} = await inquirer.prompt(question); // We use the inquirer prompt to get the user's choices.
    return ids; // We return the user's choices.
}

// We define an asynchronous function 'deleteMenu' to delete tasks.

// We define an asynchronous function 'confirmDelete' to confirm deletion of tasks.
const confirmDelete = async(tasks = [], id) =>{
    let desc= [];
    for (let i = 0; i < id.length; i++) {
        tasks.forEach(task => {
            if (task.id === id[i]) {
                desc.push('\n', task.description) // We add the description of the task to be deleted to 'desc'.
            }
        });
    }
    const question = [
        {
            type: 'list', // The type of prompt is 'list', which allows the user to select from a list of choices.
            name: 'confirmation', // The name of the answer for this question will be 'confirmation'.
            message: `¿Estás seguro que deseas borrar ${desc}?`.yellow, // The message to display when prompting the user.
            choices: [ // The choices for the 'list' prompt.
                {
                    value: true,
                    name: 'Si'
                },
                {
                    value: false,
                    name: 'No'
                }
            ]
        }
    ]
    console.clear(); // We clear the console, and put the apps header on top.
    console.log('=================================='.yellow);
    console.log('   Gestor de tareas con Node.JS'.white);
    console.log('==================================\n'.yellow);
    const {confirmation} = await inquirer.prompt(question); 
    return confirmation; // We return the user's confirmation.
}

// We export the functions so they can be used in other modules.
module.exports =  {
    inquirerMenu,
    pause,
    readInput,
    changeStatus,
    listPlaces,
    confirmDelete
}
