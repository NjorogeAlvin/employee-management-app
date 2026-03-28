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
    alert('Submitted succesfully');
    location.reload()
}
