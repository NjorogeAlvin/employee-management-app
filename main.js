// 1. DATA MANAGEMENT: Consistent helper for all functions
function getAllContacts() {
    const defaultContacts = [
        { name: "John Doe", email: "johndoe@gmail.com", phone: "+2547000000", position: "Manager", department: "Admin" },
        { name: "Jane Doe", email: "janedoe@gmail.com", phone: "+2547000001", position: "Assistant Manager", department: "Admin" },
        { name: "John Kamau", email: "johnkamau@gmail.com", phone: "+2547000002", position: "Human Resource", department: "HR" },
        { name: "James Otieno", email: "jamesotieno@gmail.com", phone: "+2547000003", position: "Supervisor", department: "Operations" },
        { name: "Steve Mwaura", email: "stevemwaura@yahoo.com", phone: "+2547000004", position: "Worker", department: "Operations" }
    ];
    let newContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    return [...defaultContacts, ...newContacts];
}

// 2. DASHBOARD LOGIC: Fix for counts and Recent Hires table
function updateDashboard() {
    // Set Current Date
    const dateDisplay = document.getElementById('current_date');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);
    }

    const allContacts = getAllContacts();
    
    // Update Dashboard Counts
    const empCount = document.getElementById('emp-count');
    const posCount = document.getElementById('pos-count');
    
    if (empCount) empCount.innerText = allContacts.length;
    if (posCount) {
        const uniquePositions = new Set(allContacts.map(c => c.position));
        posCount.innerText = uniquePositions.size;
    }

    // Update Recent Hires Table
    const recentBody = document.getElementById('recent_body');
    if (recentBody) {
        recentBody.innerHTML = "";
        // Show last 3 added contacts
        const recentHires = allContacts.slice(-3).reverse(); 

        recentHires.forEach(contact => {
            let row = `<tr>
                <td>${contact.name}</td>
                <td>${contact.position}</td>
                <td>${contact.department}</td>
            </tr>`;
            recentBody.innerHTML += row;
        });
    }
}


function loadContacts() {
    const tableBody = document.querySelector("#view_table tbody");
    if (!tableBody) return;

    const allContacts = getAllContacts();
    tableBody.innerHTML = "";

    allContacts.forEach((contact, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.department}</td>
                <td>
                    <button class="button_detail" onclick="showDetails(${index})">Details</button>
                    <button class="button_edit" onclick="editAlert()">Edit</button>
                    <button class="button_del" onclick="deleteContact(${index})">Delete</button>
                </td>
            </tr>`;
    });
}

// Shows details when details button is pressed
function showDetails(index) {
    const all = getAllContacts();
    const c = all[index];
    if (c) {
        alert(
            `EMPLOYEE PROFILE\n` +
            `--------------------------\n` +
            `Name: ${c.name}\n` +
            `Email: ${c.email}\n` +
            `Phone: ${c.phone}\n` +
            `Position: ${c.position}\n` +
            `Department: ${c.department}`
        );
    }
}

// Edit function
function editAlert() {
    alert('Edit functionality is not implemented yet!');
}

// Added the ability to delete contacts but only the ones manually added and not hard-coded
function deleteContact(index) {
    if (index < 5) {
        alert("System Error: Standard employees cannot be deleted.");
        return;
    }
    if (confirm("Are you sure you want to remove this contact?")) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.splice(index - 5, 1); 
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts(); // Refresh the table
    }
}

// Added ability to add new persons
function submitAlert() {
    let idNumber = document.getElementById('Id')?.value.trim();
    let firstname = document.getElementById('firstname')?.value.trim();
    let lastname = document.getElementById('lastname')?.value.trim();
    let phone = document.getElementById('phone')?.value.trim();
    let email = document.getElementById('email')?.value.trim();
    let address = document.getElementById('address')?.value.trim();
    let dob = document.getElementById('DOB')?.value;
    let position = document.getElementById('pos')?.value;
    let department = document.getElementById('department')?.value.trim();
    let genderElement = document.querySelector('input[name="gender"]:checked');

    if (!idNumber || !firstname || !lastname || !genderElement || !phone || !email || !address || !dob || !position || !department) {
        alert('Please fill in all fields!');
        return; 
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const newContact = {
        id: idNumber,
        name: `${firstname} ${lastname}`,
        email: email,
        phone: phone,
        position: position,
        department: department
    };

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    alert('Submitted successfully!');
    window.location.href = "view-contacts.html"; // Redirect to table after saving
}