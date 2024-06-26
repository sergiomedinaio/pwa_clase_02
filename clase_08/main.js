const db = new Dexie("AplicacionWeb");

const dbVersion = db.version(1).stores({
    users: "++id, name, age",
    logs: "++id, date"
});

const mostrarLista = (logs) => {
    const lista = document.getElementById('lista');
    logs.forEach(log => {
        lista.innerHTML += `<li>${new Date(log.date).toISOString()}</li>`
    });
}

db.logs
    .add({
        date: new Date().getTime()
    })
    .then(() => db.logs
            .where('date')
            .below(new Date(2024, 4, 21).getTime())
            .toArray()
    )
    .then((logs) => {
        mostrarLista(logs)
    })
    
