const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

yargs(hideBin(process.argv))
    .command({
        command: 'crear',
        describe: 'Crea una nueva tarea',
        builder: {
            titulo: {
                describe: 'El título de la tarea',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            try {
                // 1. Leer el archivo tareas.json
                const dataBuffer = fs.readFileSync('tareas.json', 'utf-8');
                const tareas = JSON.parse(dataBuffer);

                // 2. Crear el objeto de la tarea con tu firma
                const nuevaTarea = {
                    titulo: argv.titulo,
                    fecha: new Date().toLocaleString(),
                    autor: "Jorge Alberto" // Se guarda en el JSON
                };

                // 3. Guardar en el archivo
                tareas.push(nuevaTarea);
                fs.writeFileSync('tareas.json', JSON.stringify(tareas, null, 2));

                // 4. Mostrar en la terminal con la firma debajo de la fecha
                console.log('------------------------------------------');
                console.log(`✅ Tarea: "${argv.titulo}"`);
                console.log(`📅 Fecha: ${nuevaTarea.fecha}`);
                console.log(`👤 Creado por: ${nuevaTarea.autor}`); // Aquí aparece en consola
                console.log('------------------------------------------');

            } catch (error) {
                console.error('❌ Error:', error.message);
            }
        }
    })
    .parse();