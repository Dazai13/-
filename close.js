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