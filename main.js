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

    // Success
    alert('Submitted successfully!');
    location.reload();
}