// const DEFAULT_CONTACTS = [
//     { name: "John Doe", email: "johndoe@gmail.com", phone: "+2547000000", position: "Manager", department: "Admin" },
//     // ... rest of your 5 people
// ];

function editAlert(){
    alert('Edit functionality is not implemented yet!')
}

function deleteConfirm(){
    let deleteconfirm = confirm('Are you sure you want to delete?');
    if(deleteconfirm){
        alert("Contact deleted successfully");
    }
    else{
        alert("Delete canceled")
    }
}

function submitAlert() {
    // Grab all values
    let idNumber = document.getElementById('Id').value.trim();
    let firstname = document.getElementById('firstname').value.trim();
    let lastname = document.getElementById('lastname').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();
    let address = document.getElementById('address').value.trim();
    let dob = document.getElementById('DOB').value;
    let position = document.getElementById('pos').value;
    let department = document.getElementById('department').value.trim();
    
    // Grab the checked radio button element
    let genderElement = document.querySelector('input[name="gender"]:checked');

    // Basic Check: Are any fields completely empty?
    if (
        !idNumber || !firstname || !lastname || !genderElement || 
        !phone || !email || !address || !dob || 
        !position || !department
    ) {
        alert('Please fill in all fields!');
        return; 
    }

    // Strict Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Strict Phone Validation (+254 format)
    const phonePattern = /^\+254[17]\d{8}$/;
    if (!phonePattern.test(phone)) {
        alert('Invalid phone format. Use +2547XXXXXXXX or +2541XXXXXXXX.');
        return;
    }

    // Create a contact object
    const newContact = {
        id: idNumber,
        name: `${firstname} ${lastname}`,
        email: email,
        phone: phone,
        position: position,
        department: department
    };

    // Get existing contacts from Local Storage or start with an empty array
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Add the new contact to the array
    contacts.push(newContact);

    // Save the updated array back to Local Storage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Success
    alert('Submitted successfully!');
    location.reload();
}

function loadContacts() {
    const tableBody = document.querySelector("#view_table tbody");
    if (!tableBody) return;

    // Moved my Hardcoded data to JS
    const defaultContacts = [
        { name: "John Doe", email: "johndoe@gmail.com", phone: "+2547000000", department: "Manager" },
        { name: "Jane Doe", email: "janedoe@gmail.com", phone: "+2547000001", department: "Assistant Manager" },
        { name: "John Kamau", email: "johnkamau@gmail.com", phone: "+2547000002", department: "Human Resource" },
        { name: "James Otieno", email: "jamesotieno@gmail.com", phone: "+2547000003", department: "Supervisor" },
        { name: "Steve Mwaura", email: "stevemwaura@yahoo.com", phone: "+2547000004", department: "Worker" }
    ];

    // Get new contacts added via the form from Local Storage
    let newContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Combine both lists (Default + New)
    const allContacts = [...defaultContacts, ...newContacts];

    // 4. Clear the table and rebuild it
    tableBody.innerHTML = "";

    allContacts.forEach((contact, index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.department}</td>
                <td>
                    <button class="button_detail" type="button">Details</button>
                    <button class="button_edit" type="button" onclick="editAlert()">Edit</button>
                    <button class="button_del" type="button" onclick="deleteContact(${index})">Delete</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to delete a contact
function deleteContact(index) {
    if (confirm("Are you sure you want to delete this contact?")) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.splice(index, 1); // Remove item at index
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts(); // Refresh the table
    }
}

function updateDashboard() {
    // Update Date and Time
    const dateDisplay = document.getElementById('current_date');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);
    }
    // Define the same hard-coded data used in the table
    const defaultContacts = [
        { name: "John Doe", position: "Manager" },
        { name: "Jane Doe", position: "Assistant Manager" },
        { name: "John Kamau", position: "Human Resource" },
        { name: "James Otieno", position: "Supervisor" },
        { name: "Steve Mwaura", position: "Worker" }
    ];

    // Get the new contacts from Local Storage
    let newContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Combine them for the total count
    const allContacts = [...defaultContacts, ...newContacts];

    // Update Total Employees
    const empDisplay = document.getElementById('emp-count');
    if (empDisplay) {
        empDisplay.innerText = allContacts.length;
    }

    // Update No. of Positions
    // This counts unique positions from both the hard-coded and new data
    const uniquePositions = new Set(allContacts.map(c => c.position));
    const posDisplay = document.getElementById('pos-count');
    if (posDisplay) {
        posDisplay.innerText = uniquePositions.size;
    }
    // Update Recent Hires Table
    const recentBody = document.getElementById('recent_body');
    if (recentBody) {
        recentBody.innerHTML = "";
        // Take the last 3 contacts added to the array
        const recentHires = allContacts.slice(-3).reverse(); 

        recentHires.forEach(contact => {
            let row = `<tr>
                <td>${contact.name}</td>
                <td>${contact.position || 'N/A'}</td>
                <td>${contact.department}</td>
            </tr>`;
            recentBody.innerHTML += row;
        });
    }
}