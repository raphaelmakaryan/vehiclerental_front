async function apiPostMaintenance(data) {
    return await fetch("http://localhost:8080/maintenance", {
        method: "POST",
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

async function apiGetVehicle() {
    return await fetch("http://localhost:8080/vehicles")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

async function displayResultMaintenance(data) {
    alert(data.message)
    if (data.success) {
        window.location.href = "../dashboard.html";
    }
}

async function addMaintenance() {
    displaySelect("idVehicle", "model", await apiGetVehicle())
    displaySelect("idUnavailability", "description", await apiGetUnavailability())
}

function displaySelect(id, title, data) {
    let select = document.getElementById(id)
    data.forEach(element => {
        select.innerHTML += `
        <option value="${element.id}">${element[title]}</option>
    `;
    });

}

async function formAddMaintenance() {
    event.preventDefault();
    const id_vehicle = parseInt(document.getElementById("idVehicle").value)
    const id_unavailability = parseInt(document.getElementById("idUnavailability").value);
    const maintenanceData = {
        id_vehicle,
        id_unavailability,
    };
    await displayResultMaintenance(await apiPostMaintenance(maintenanceData));
}

addMaintenance()