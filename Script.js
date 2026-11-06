
let patients = JSON.parse(localStorage.getItem("patients")) || [];

function saveData() {
    localStorage.setItem("patients", JSON.stringify(patients));
}

function showDashboard() {
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("patientSection").classList.add("hidden");
    document.getElementById("formSection").classList.add("hidden");

    updateDashboard();
}

function showPatients() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("patientSection").classList.remove("hidden");
    document.getElementById("formSection").classList.add("hidden");

    displayPatients();
}

function showForm() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("patientSection").classList.add("hidden");
    document.getElementById("formSection").classList.remove("hidden");

    document.getElementById("patientForm").reset();
    document.getElementById("patientId").value = "";
    document.getElementById("formTitle").innerText = "Add Patient";
    document.getElementById("submitBtn").innerText = "Add Patient";
}

document.getElementById("patientForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const id = document.getElementById("patientId").value;

    const patient = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("name").value.trim(),
        age: Number(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        disease: document.getElementById("disease").value.trim(),
        doctorName: document.getElementById("doctorName").value.trim()
    };

    if (id) {

        patients = patients.map(p =>
            p.id === Number(id) ? patient : p
        );

        alert("Patient updated successfully!");

    } else {

        patients.push(patient);

        alert("Patient added successfully!");

    }

    saveData();

    document.getElementById("patientForm").reset();

    showPatients();

});

function displayPatients() {

    const table = document.getElementById("patientTable");

    const search = document.getElementById("searchInput").value.toLowerCase();

    table.innerHTML = "";

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(search)
    );

    if (filteredPatients.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="8">No patients found</td>
            </tr>
        `;
        return;
    }

    filteredPatients.forEach(patient => {

        table.innerHTML += `
            <tr>
                <td>${patient.id}</td>
                <td>${escapeHTML(patient.name)}</td>
                <td>${patient.age}</td>
                <td>${escapeHTML(patient.gender)}</td>
                <td>${escapeHTML(patient.phone)}</td>
                <td>${escapeHTML(patient.disease)}</td>
                <td>${escapeHTML(patient.doctorName)}</td>

                <td>
                    <button class="edit-btn"
                        onclick="editPatient(${patient.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deletePatient(${patient.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function editPatient(id) {

    const patient = patients.find(p => p.id === id);

    if (!patient) return;

    document.getElementById("patientId").value = patient.id;
    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("disease").value = patient.disease;
    document.getElementById("doctorName").value = patient.doctorName;

    document.getElementById("formTitle").innerText = "Update Patient";
    document.getElementById("submitBtn").innerText = "Update Patient";

    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("patientSection").classList.add("hidden");
    document.getElementById("formSection").classList.remove("hidden");

}

function deletePatient(id) {

    if (confirm("Are you sure you want to delete this patient?")) {

        patients = patients.filter(p => p.id !== id);

        saveData();

        displayPatients();

        updateDashboard();

        alert("Patient deleted successfully!");

    }

}

function updateDashboard() {

    document.getElementById("totalPatients").innerText = patients.length;

    document.getElementById("malePatients").innerText =
        patients.filter(p => p.gender === "Male").length;

    document.getElementById("femalePatients").innerText =
        patients.filter(p => p.gender === "Female").length;

}

updateDashboard();
