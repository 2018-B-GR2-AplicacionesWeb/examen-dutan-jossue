const fs = require('fs');
const inquirer = require('inquirer');

class People {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[] = [];
    species: string[] = [];
    vehicles: string[] = [];
    starships: string[] = [];
    created: string;
    edited: string;
    url: string
}

const preguntasIngreso = [
    {
        type: 'input',
        name: 'name',
        message: "Cuál es el name",
    },{
        type: 'input',
        name: 'height',
        message: "Cuál es el height",
    },{
        type: 'input',
        name: 'mass',
        message: "Cuál es el mass",
    },{
        type: 'input',
        name: 'hair_color',
        message: "Cuál es el hair_color",
    },{
        type: 'input',
        name: 'eye_color',
        message: "Cuál es el eye_color",
    },{
        type: 'input',
        name: 'birth_year',
        message: "Cuál es el birth_year",
    },{
        type: 'input',
        name: 'gender',
        message: "Cuál es el gender",
    },{
        type: 'input',
        name: 'homeworld',
        message: "Cuál es el homeworld",
    },{
        type: 'input',
        name: 'created',
        message: "Cuál es el created",
    },{
        type: 'input',
        name: 'edited',
        message: "Cuál es el edited",
    },{
        type: 'input',
        name: 'url',
        message: "Cuál es el url",
    }
];


const leerBDD = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('data/people.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            }
            else {
                const bdd = JSON.parse(contenido);
                console.log('\nGender:')
                const gender = bdd.map((v) => v.gender);
                console.log(gender)
                console.log('\neye_color:')
                const eye_color = bdd.map((v) => v.eye_color);
                console.log(eye_color)
                console.log('\nskin_color:\n')
                const skin_color = bdd.map((v) => v.skin_color);
                console.log(skin_color)
                console.log('\nhair_color:\n')
                const hair_color = bdd.map((v) => v.hair_color);
                console.log(hair_color)

                const respuesta = {
                    massTotal: 0,
                    heightTotal: 0
                }
                console.log('\nSumatoria:\n')
                respuesta.massTotal = bdd
                    .reduce(
                        (acumulado, actual) => {
                            if(actual.mass === "unknown"){
                                return acumulado + 0
                            }else{
                                let strMasaActual = actual.mass;
                                let numeroActual = strMasaActual.replace(/,/g, ".");
                                return acumulado + Number(numeroActual)
                            }
                        },0
                    );
                respuesta.heightTotal = bdd
                    .reduce(
                        (acumulado, actual) => {
                            if(actual.height === "unknown"){
                                return acumulado + 0
                            }else{
                                let strMasaActual = actual.height;
                                let numeroActual = strMasaActual.replace(/,/g, ".");
                                return acumulado + Number(numeroActual)
                            }
                        },0
                    );

                console.log('Mass Total:', respuesta.massTotal)
                console.log('Height Total:', respuesta.heightTotal)

                console.log('\nTodos los personajes usan vehículo:\n')

                const respuestaEvery = bdd
                    .every(
                        (valorActual) => {
                            return valorActual.vehicles.length > 0
                        }
                    );

                console.log(respuestaEvery);

                console.log('\nTodos los personajes usan starships:\n')

                const respuestaStarship = bdd
                    .every(
                        (valorActual) => {
                            return valorActual.starships.length > 0
                        }
                    );

                console.log(respuestaStarship);

                console.log('\nPersonajes por film:\n')

                const respuestaFilms = []
                let personajeFilms:{
                    nombre:string
                    numFilms:number
                }

                bdd.forEach(
                    (people) => {
                        console.log(people.name);
                        //personajeFilms.nombre = people.name;
                        console.log(people.films.length);
                        //personajeFilms.numFilms = people.films.length;
                        // respuestaFilms.push(personajeFilms)
                    }
                );

                console.log(respuestaFilms)
                resolve(bdd)
            }
        });
    });
};

const ingresarPeople = (people) => {
    return new Promise((resolve, reject) => {
        fs.readFile('data/people.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            }
            else {
                const bdd = JSON.parse(contenido);
                bdd.push(people);
                fs.writeFile('data/people.json', JSON.stringify(bdd), (err) => {
                    if (err) {
                        console.log('Error ', err);
                        reject(err);
                    }
                    else {
                        resolve({mensaje: 'People creado'});
                    }
                });
            }
        });
    });
};

async function main() {
    try {
        await leerBDD();
        // let arregloRepuesta = [{a:false},{b:false},{c:false},{d:false},
        //     {e:false},{f:false},{g:false},{h:false},{i:false},{j:false},
        //     {k:false},{l:false},{m:false},{n:false},{o:false},{p:false},
        //     {q:false},{r:false},{s:false},{t:false},{u:false},{v:false},
        //     {w:false},{x:false},{y:false},{z:false}];
        // console.log(arregloRepuesta)

        console.log('\nIngresar People\n')
        const respuestaIng = await inquirer.prompt(preguntasIngreso);
        const respuestaIngresar = await ingresarPeople(respuestaIng);
        console.log(respuestaIngresar);

    }
    catch (e) {
        console.log('Hubo un error', e);
    }
}

main()

interface respuestaBDD {
    mensaje: string;
}