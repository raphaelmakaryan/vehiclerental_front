async function apiGetReservation() {
    return await fetch("http://localhost:8080/reservations")
        .then(res => res.json())
        .then(res => {
            return res;
        })
}

function displayReservation(data) {
    if (data.length >= 1) {
        let container = document.getElementById("listOfReservation")
        data.forEach(element => {
            container.innerHTML += `
            <td>${element.id}</td>
      <td>${element.idClient}</td>
      <td>${element.idVehicule}</td>
      <td>${element.estimatedKm}</td>
      <td>${element.startReservation}</td>
      <td>${element.endReservation}</td>
      <td>
      <button class="edit">Modifier</button>
      <button class="delete">Supprimer</button>
      </td>`;
        });
    }
}

async function reservation() {
    displayReservation(await apiGetReservation())
}

reservation()