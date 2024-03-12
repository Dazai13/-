function addNewRow() {
    var addPopup = document.getElementById("addPopup");
    var overlay = document.getElementById("overlay");
    addPopup.style.display = "block";
}

function cancelAdd() {
    var addPopup = document.getElementById("addPopup");
    var overlay = document.getElementById("overlay");
    addPopup.style.display = "none";
}

function saveNewRow() {
    var innkombanInput = document.getElementById("innkombanInput").value;
    var nazvkombanInput = document.getElementById("nazvkombanInput").value;
    var telefInput = document.getElementById("telefInput").value;
    var elpochtInput = document.getElementById("elpochtInput").value;
    
    var logoInput = document.getElementById("logoInput");
    var logoFile = null;
    if (logoInput.files && logoInput.files.length > 0) {
        logoFile = logoInput.files[0];
    }
    var formData = new FormData();
    formData.append("logo", logoFile);
    
    var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];
    var schetdataInput = document.getElementById("schetdataInput").value;
    var vaknazvInput = document.getElementById("vaknazvInput").value;
    var sourceFileInput = document.getElementById("sourceFileInput").value;
}

document.getElementById("cancelAddButton").addEventListener("click", cancelAdd);
document.getElementById("saveNewButton").addEventListener("click", saveNewRow);
