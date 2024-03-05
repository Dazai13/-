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
  var selectElement = document.getElementById("selectOutput");
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
      var uniqueValues = new Set();
      for (var j = 0; j < rows.length; j++) {
        var row = rows[j];
        var schetnomer = getXmlValue(row, "SCHETNOMER") || "Unknown";
        var schetdata = getXmlValue(row, "SCHETDATA");
        var innkomban = getXmlValue(row, "INNKOMPAN");
        var nazvkomban = getXmlValue(row, "NAZVKOMPAN");
        var telef = getXmlValue(row, "TELEF");
        var elpocht = getXmlValue(row, "ELPOCHTA") + getXmlValue(row, "ELPOCHTAKADROVIK") || "";
        var vaknazv = getXmlValue(row, "VAKNAZV");
        var oblast = getXmlValue(row, "ADRESSORABOTI-OBLAST");
        var sourceFile = file.name;
        var duplicateEntry = checkDuplicateEntry(schetnomer, vaknazv, elpocht);
        var isDuplicateRow = false;

        // Поиск совпадающей строки по `innkomban` и `nazvkomban`
        var existingRow;
        for (var k = 0; k < rowCount; k++) {
          existingRow = tableBody.getElementsByTagName("tr")[k];
          var infoCell = existingRow.cells[1];
          var existingInnkomban = existingRow.cells[1].textContent.split("\n")[0].trim();
          var existingNazvkomban = existingRow.cells[1].textContent.split("\n")[1].trim();
          if (existingInnkomban === innkomban && existingNazvkomban === nazvkomban) {
            isDuplicateRow = true;
            break;
          }
        }

        if (!duplicateEntry && !isDuplicateRow && schetnomer && schetdata && elpocht) {
          // Создание новой строки, если не найдена совпадающая строка
          if (!isDuplicateRow) {
            var newRow = createTableRow(rowCount + 1, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile);
            tableBody.appendChild(newRow);
            importedEntries.push({ schetnomer: schetnomer, vaknazv: vaknazv, elpocht: elpocht });
            rowCount++;
          }
          
          // Обновление значений предыдущей строки в случае совпадения `innkomban` и `nazvkomban`
          else {
            var prevCalculationCell = existingRow.cells[3];
            var prevActiveVacanciesCell = existingRow.cells[4];
            var prevSourceCell = existingRow.cells[6];
            prevCalculationCell.textContent += "\n" + schetnomer + " / " + schetdata;
            prevActiveVacanciesCell.textContent += "\n" + vaknazv;
            prevSourceCell.textContent += "\n" + sourceFile;
          }
          uniqueValues.add(oblast);
        }
      }
      selectElement.innerHTML = "";
      uniqueValues.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        selectElement.appendChild(option);

      });
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
