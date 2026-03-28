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

    // 3. Get existing contacts from Local Storage or start with an empty array
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // 4. Add the new contact to the array
    contacts.push(newContact);

    // 5. Save the updated array back to Local Storage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Success
    alert('Submitted successfully!');
    location.reload();
}

function loadContacts() {
    const tableBody = document.querySelector("#view_table tbody");
    if (!tableBody) return; // Only run on the view-contacts page

    // Get contacts from Local Storage
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Clear existing static rows
    tableBody.innerHTML = "";

    // Loop through contacts and create table rows
    contacts.forEach((contact, index) => {
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