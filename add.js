function addNewRow() {
    var addPopup = document.getElementById("addPopup");
    var overlay = document.getElementById("overlay");
    addPopup.style.display = "block";
    overlay.style.display = "block";
}
function cancelAdd() {
    var addPopup = document.getElementById("addPopup");
    var overlay = document.getElementById("overlay");
    addPopup.style.display = "none";
    overlay.style.display = "none";
}
function saveNewRow() {
    var innkombanInput = document.getElementById("innkombanInput").value;
    var nazvkombanInput = document.getElementById("nazvkombanInput").value;
    var telefInput = document.getElementById("telefInput").value;
    var elpochtInput = document.getElementById("elpochtInput").value;
    var schetnomerInput = document.getElementById("schetnomerInput").value;
    var schetdataInput = document.getElementById("schetdataInput").value;
    var vaknazvInput = document.getElementById("vaknazvInput").value;
    var sourceFileInput = document.getElementById("sourceFileInput").value;
    var newRow = createTableRow(0, innkombanInput, nazvkombanInput, telefInput, elpochtInput, schetnomerInput, schetdataInput, vaknazvInput, sourceFileInput);
    var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];
    tableBody.appendChild(newRow);
    cancelAdd();
}
function saveNewRow() {
    var innkombanInput = document.getElementById("innkombanInput").value;
    var nazvkombanInput = document.getElementById("nazvkombanInput").value;
    var telefInput = document.getElementById("telefInput").value;
    var elpochtInput = document.getElementById("elpochtInput").value;
    var schetnomerInput = document.getElementById("schetnomerInput").value;
    var schetdataInput = document.getElementById("schetdataInput").value;
    var vaknazvInput = document.getElementById("vaknazvInput").value;
    var sourceFileInput = document.getElementById("sourceFileInput").value;
    var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];
    var duplicateEntry = checkDuplicateEntry(schetnomerInput, vaknazvInput, elpochtInput);
    if (!duplicateEntry) {
        var newRow = createTableRow(0, innkombanInput, nazvkombanInput, telefInput, elpochtInput, schetnomerInput, schetdataInput, vaknazvInput, sourceFileInput);
        tableBody.appendChild(newRow);
        cancelAdd();
        mergeRowsByINNAndCompany(tableBody, innkombanInput, nazvkombanInput);
    } else {
        alert("Дубликат записи!");
    }
}
document.getElementById("cancelAddButton").addEventListener("click", cancelAdd);
document.getElementById("saveNewButton").addEventListener("click", saveNewRow);