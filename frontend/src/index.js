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
  const confirmarBorrar = document.getElementById("delete_student_button");
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

function studentEdit(id) {
  const confirmarEditar = document.getElementById("edit_student_button");
  console.log(id);
  axios
    .get("http://localhost:3000/api/read/" + id)
    .then(function (response) {
      data = response.data;
      const student = data[0].student;
      $("#id_e").val(student.ID);
      $("#name_e").val(student.name);
      $("#age_e").val(student.age);
      $("#grade_e").val(student.grade);
      $("#editModal").modal("toggle");
      console.log(data[0].id);
      confirmarEditar.addEventListener("click", function () {
        axios.put(`http://localhost:3000/api/update/${data[0].id}`, {
          student: {
            ID: parseInt($("#id_e").val()),
            name: $("#name_e").val(),
            age: parseInt($("#age_e").val()),
            grade: $("#grade_e").val(),
          },
        });
        location.reload();
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function studentCreate() {
  axios
    .post("http://localhost:3000/api/create", {
      student: {
        ID: parseInt($("#id_c").val()),
        name: $("#name_c").val(),
        age: parseInt($("#age_c").val()),
        grade: $("#grade_c").val(),
      },
    })
    .then(function (response) {
      location.reload();
      console.log("creado");
    })
    .catch(function (error) {
      console.log(error);
    });
}
window.studentEdit = studentEdit;
window.studentCreate = studentCreate;

window.studentDelete = studentDelete;
