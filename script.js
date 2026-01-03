const API = "http://localhost:3000/api/people";

async function loadPeople() {
  const res = await fetch(API);
  const data = await res.json();

  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.email}</td>
        <td>
          <button class="edit" onclick="editPerson(${p.id})">Edit</button>
          <button class="delete" onclick="deletePerson(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function addPerson() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, email })
  });

  loadPeople();
}

async function deletePerson(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadPeople();
}

async function editPerson(id) {
  const name = prompt("New name:");
  const age = prompt("New age:");
  const email = prompt("New email:");

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, email })
  });

  loadPeople();
}

loadPeople();
