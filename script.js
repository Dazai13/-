/*Import Table*/
var importedEntries = [];
function checkDuplicateEntry(schetnomer, vaknazv, zarpl) {
  for (var i = 0; i < importedEntries.length; i++) {
    var entry = importedEntries[i];
    if (entry.schetnomer === schetnomer && entry.vaknazv === vaknazv && entry.zarpl === zarpl) {
      return true;
    }
  }
  return false;
}
function importXml() {
  var xmlFileInput = document.getElementById("xmlFileInput");
  var files = xmlFileInput.files;
  var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];
  var rowCount = tableBody.getElementsByTagName("tr").length;

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();
    reader.onload = function (e) {
      var xmlContent = e.target.result;
      var decoder = new TextDecoder("windows-1251");
      var xmlDecoded = decoder.decode(new Uint8Array(xmlContent));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlDecoded, "text/xml");
      var rows = xmlDoc.getElementsByTagName("ROW");

      for (var j = 0; j < rows.length; j++) {
        var row = rows[j];
        var schetnomer = getXmlValue(row, "SCHETNOMER") || "Unknown";
        var schetdata = getXmlValue(row, "SCHETDATA");
        var innkomban = getXmlValue(row, "INNKOMPAN");
        var nazvkomban = getXmlValue(row, "NAZVKOMPAN");
        var telef = getXmlValue(row, "TELEF");
        var elpocht = getXmlValue(row, "ELPOCHTA") || getXmlValue(row, "ELPOCHTAKADROVIK");
        var vaknazv = getXmlValue(row, "VAKNAZV");
        var sourceFile = file.name;
        var duplicateEntry = checkDuplicateEntry(schetnomer, vaknazv, elpocht);
        
        if (!duplicateEntry && schetnomer && schetdata) {
          if (rowCount === 0) {
            var newRow = createTableRow(rowCount + 1, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile);
            tableBody.appendChild(newRow);
            importedEntries.push({ schetnomer: schetnomer, vaknazv: vaknazv, elpocht: elpocht });
            rowCount++;
          } else {
            var prevRow = tableBody.getElementsByTagName("tr")[rowCount - 1];
            var prevInfoCell = prevRow.cells[1];
            var prevCalculationCell = prevRow.cells[3];
            var prevActiveVacanciesCell = prevRow.cells[4];
            var prevSourceCell = prevRow.cells[6];
            
            if (prevInfoCell.textContent === innkomban + "\n" + nazvkomban + "\n" + telef + "\n" + elpocht) {
              prevCalculationCell.textContent += "\n" + schetnomer + " / " + schetdata;
              prevActiveVacanciesCell.textContent += "\n" + vaknazv;
              prevSourceCell.textContent += "\n" + sourceFile;
            } else {
              var newRow = createTableRow(rowCount + 1, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile);
              tableBody.appendChild(newRow);
              importedEntries.push({ schetnomer: schetnomer, vaknazv: vaknazv, elpocht: elpocht });
              rowCount++;
            }
          }
        }
      }
    };
    reader.readAsArrayBuffer(file);
  }
}
function createTableRow(index, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile) {
  var newRow = document.createElement("tr");
  var listNumberCell = document.createElement("td");
  listNumberCell.textContent = index;
  newRow.appendChild(listNumberCell);
  var infoCell = document.createElement("td");
  infoCell.textContent = innkomban + "\n" + nazvkomban + "\n" + telef + "\n" + elpocht;
  newRow.appendChild(infoCell);
  var emptyCell1 = document.createElement("td");
  newRow.appendChild(emptyCell1);
  var calculationCell = document.createElement("td");
  calculationCell.textContent = schetnomer + " / " + schetdata;
  newRow.appendChild(calculationCell);
  var activeVacanciesCell = document.createElement("td");

  activeVacanciesCell.textContent = vaknazv;
  newRow.appendChild(activeVacanciesCell);
  var emptyCell2 = document.createElement("td");
  newRow.appendChild(emptyCell2);
  var sourceCell = document.createElement("td");
  sourceCell.textContent = sourceFile;
  newRow.appendChild(sourceCell);
  var emptyCell3 = document.createElement("td");
  newRow.appendChild(emptyCell3);
  return newRow;
}
function getXmlValue(row, tagName) {
  var element = row.getElementsByTagName(tagName)[0];
  return element ? element.textContent : "";
}
var xmlFileInput = document.getElementById("xmlFileInput");
xmlFileInput.addEventListener("change", importXml);
var input = document.getElementById("searchInput");
input.addEventListener("input", handleSearch);
document.getElementById("importXmlButton").addEventListener("click", importXml);
var searchInput = document.getElementById("searchInput");
document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearch);
});
var links = document.querySelectorAll("#data-table tbody a");
links.forEach(function(link) {
  link.addEventListener("click", handleLinkClick);
});
/*------------------------------------------------------------*/
/*Курсор на месте при перезагрузкке (Пункт 3)*/
window.addEventListener('beforeunload', function(event) {
  localStorage.setItem('cursorX', event.clientX);
  localStorage.setItem('cursorY', event.clientY);
});
/*------------------------------------------------------------*/
