async function apiPutMaintenance(id, data) {
    return await fetch("http://localhost:8080/maintenance/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        mode: 'cors'
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetUnavailability() {
    return await fetch("http://localhost:8080/unavailability")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function apiGetUnavailabilityWithId(id) {
    return await fetch("http://localhost:8080/unavailability/" + id)
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

async function apiGetVehicleWithId(id) {
    return await fetch("http://localhost:8080/vehicles/" + id)
        .then(res => res.json())
        .then(res => {
            return res;
        })
}


function deleteMaintenanceLocal() {
    localStorage.removeItem("maintenance")
}


function getMaintenanceLocal() {
    let local = localStorage.getItem("maintenance")
    if (local != null) {
        return parseInt(local)
    } else {
        deleteMaintenanceLocal()
        window.location.href = "index.html";
    }
}

async function displayResultMaintenance(data) {
    alert(data.message)
    if (data.success) {
        window.location.href = "../dashboard.html";
    }
}

async function editMaintenance() {
    try {
        let maintenance = getMaintenanceLocal();
        document.getElementById("id").value = maintenance
        displaySelect("idVehicle", "model", await apiGetVehicleWithId(maintenance), await apiGetVehicle())
        displaySelect("idUnavailability", "description", await apiGetUnavailabilityWithId(maintenance), await apiGetUnavailability())
    } catch (error) {
        deleteMaintenanceLocal()
        window.location.href = "../../../index.html";
    }
}


function displaySelect(id, title, compare, data) {
    let select = document.getElementById(id)
    data.forEach(element => {
        if (element.id === compare) {
            select.innerHTML += `
        <option value="${element.id}" selected>${element[title]}</option>
    `;
        } else {
            select.innerHTML += `
        <option value="${element.id}">${element[title]}</option>
    `;
        }
    });
}

async function formEditMaintenance() {
    event.preventDefault();
    const id = document.getElementById("id").value
    const idVehicle = parseInt(document.getElementById("idVehicle").value)
    const idUnavailability = parseInt(document.getElementById("idUnavailability").value);
    const maintenanceData = {
        idVehicle,
        idUnavailability,
    };
    await displayResultMaintenance(await apiPutMaintenance(id, maintenanceData));
}

editMaintenance()