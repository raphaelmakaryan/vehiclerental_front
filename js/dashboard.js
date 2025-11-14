async function apiGetReservation() {
    return await fetch("http://localhost:8080/reservations")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetClientWithId(id) {
    return await fetch("http://localhost:8080/clients/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetVehicleWithId(id) {
    return await fetch("http://localhost:8080/vehicles/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetVehicle() {
    return await fetch("http://localhost:8080/vehicles")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetClients() {
    return await fetch("http://localhost:8080/clients")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function transformData(data) {
    let newData = []
    for (let index = 0; index < data.length; index++) {
        let dataClient = await apiGetClientWithId(data[index].idClient)
        let dateVehicle = await apiGetVehicleWithId(data[index].idVehicule)

        let id = data[index].id
        let clientName = `${dataClient[0].firstName} ${dataClient[0].lastName}`
        let vehiculeName = dateVehicle[0].model
        let estimatedKm = data[index].estimatedKm
        let startReservation = data[index].startReservation
        let endReservation = data[index].endReservation
        let priceReservation = data[index].priceReservation
        let json = {
            id,
            clientName,
            vehiculeName,
            estimatedKm,
            startReservation,
            endReservation,
            priceReservation
        }
        newData.push(json)
    }
    return newData
}

function displayReservation(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfReservation")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
      <td>${element.clientName}</td>
      <td>${element.vehiculeName}</td>
      <td>${element.estimatedKm} km</td>
      <td>${element.startReservation}</td>
      <td>${element.endReservation}</td>
            <td>${element.priceReservation} €</td>
      <td>
      <button class="edit">Modifier</button>
      <button class="delete">Supprimer</button>
      </td>`;
        });
    }
}

function displayVehicle(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfVehicles")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
            <td>${element.type}</td>
            <td>${element.model}</td>
            <td>${element.color}</td>
            <td>${element.cylinder}</td>
            <td>${element.horsePower}</td>
            <td>${element.volume}</td>
            <td>${element.registration}</td>
            <td>${element.defaultPrice}</td>
            <td>${element.pricePerKilometer}</td>
            <td>
                <button class="edit">Modifier</button>
                <button class="delete">Supprimer</button>
            </td>`
                ;
        });
    }
}

function displayClients(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfClients")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
            <td>${element.firstName}</td>
            <td>${element.lastName}</td>
            <td>${element.numberLicense}</td>
            <td>${element.birthday}</td>
            <td>${element.obtaining_license}</td>
            <td>
                <button class="edit">Modifier</button>
                <button class="delete">Supprimer</button>
            </td>`
                ;
        });
    }
}

async function reservation() {
    displayReservation(await transformData(await apiGetReservation()))
}

async function vehicle() {
    displayVehicle(await apiGetVehicle())
}

async function clients() {
    displayClients(await apiGetClients())
}

reservation()
vehicle()
clients()