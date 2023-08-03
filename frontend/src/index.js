const axios = require("axios");

document.addEventListener("DOMContentLoaded", readAllStudents);

function readAllStudents() {
  axios
    .get("http://localhost:3000/api/read")
    .then(function (response) {
      const tableBody = document.getElementById("students_table");
      let data = response.data;
      for (let index = 0; index < data.length; index++) {
        const student = data[index].student;
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = student.ID;
        row.appendChild(idCell);
        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        row.appendChild(nameCell);
        const ageCell = document.createElement("td");
        ageCell.textContent = student.age;
        row.appendChild(ageCell);
        const gradeCell = document.createElement("td");
        gradeCell.textContent = student.grade;
        row.appendChild(gradeCell);
        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
        <button type="button" class="btn btn-primary" onclick="studentEdit(${student.ID})">Edit</button>
        <button type="button" class="btn btn-danger" onclick="studentDelete(${student.ID})">Delete</button>
        `;
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function studentDelete(id) {
  const confirmarBorrar = document.getElementById("delete_playlist_button");
  axios
    .get("http://localhost:3000/api/read/" + id)
    .then(function (response) {
      data = response.data;
      const student = data[0].student;
      console.log("datos:" + data[0].id);
      $("#delete_modal_content").html("Estudiante: " + student.name);
      $("#deleteModal").modal("toggle");
      confirmarBorrar.addEventListener("click", function () {
        axios.delete("http://localhost:3000/api/delete/" + data[0].id);
        window.location.reload(true);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

window.studentDelete = studentDelete;
