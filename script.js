
let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to handle form submission
document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    // Basic validation to ensure no empty fields
    if (name && id && email && contact) {

        students.push({ name, id, email, contact });


        localStorage.setItem("students", JSON.stringify(students));


        displayStudents();

        // Clear the form fields after submission
        this.reset();
    }
});

// Function to display students in the table
function displayStudents() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = '';

    // Loop through each student and create a row in the table
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete a student from the list
function deleteStudent(index) {

    students.splice(index, 1);


    localStorage.setItem("students", JSON.stringify(students));


    displayStudents();
}

// Function to edit a student's details
function editStudent(index) {
    const student = students[index];  

    // Populate form fields with existing student data
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Remove the student from the array (to update with edited data)
    students.splice(index, 1);

    // Update localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Display the updated student list
    displayStudents();
}

// Initial display of students on page load
displayStudents();
