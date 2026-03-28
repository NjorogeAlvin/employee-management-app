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

function submitAlert(){
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let iD = document.getElementById('iD').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let position = document.getElementById('pos').value;
    let department = document.getElementById('department').value;

    if (firstname === ''){
        alert('Please fill in all fields!');
        return;
    
    }

    alert('Submitted succesfully');
    location.reload();
}
