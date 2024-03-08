function importXml() {
    // Код для обработки импорта XML-файлов
  }
  
  function cancelImport() {
    var importPopup = document.getElementById("importPopup");
    importPopup.style.display = "none";
  }
  
  function exportXml() {
    // Код для обработки экспорта XML-файлов
  }
  
  function cancelExport() {
    var exportPopup = document.getElementById("exportPopup");
    exportPopup.style.display = "none";
  }
  function openImportPopup() {
    var importPopup = document.getElementById("importPopup");
    var overlay = document.getElementById("overlay");
    importPopup.style.display = "block";
    overlay.style.display = "block";
  }
  
  function openExportPopup() {
    var exportPopup = document.getElementById("exportPopup");
    var overlay = document.getElementById("overlay");
    exportPopup.style.display = "block";
    overlay.style.display = "block";
  }
  
  function closePopup() {
    var importPopup = document.getElementById("importPopup");
    var exportPopup = document.getElementById("exportPopup");
    var overlay = document.getElementById("overlay");
    importPopup.style.display = "none";
    exportPopup.style.display = "none";
    overlay.style.display = "none";
  }


// Не требует изменений
//Popup's
function showImportPopup() {
  var importPopup = document.getElementById("importPopup");
  importPopup.style.display = "block";
}
function showExportPopup() {
  var exportPopup = document.getElementById("exportPopup");
  exportPopup.style.display = "block";
}
function showAddPopup() {
  var addPopup = document.getElementById("addPopup");
  addPopup.style.display = "block";
}
function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "block";
}
function hidePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "none";
}