var importedEntries = [];
function checkDuplicateEntry(schetnomer, vaknazv, elpocht) {
  for (var i = 0; i < importedEntries.length; i++) {
    var entry = importedEntries[i];
    if (entry.schetnomer === schetnomer && entry.vaknazv === vaknazv && entry.elpocht === elpocht) {
      return true;
    }
  }
  return false;
}
function mergeRowsByINNAndCompany(tableBody, innkomban, nazvkomban) {
  var rows = tableBody.getElementsByTagName("tr");
  var mergedRow = null;
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var existingInnkomban = row.cells[1].textContent.split("\n")[0].trim();
    var existingNazvkomban = row.cells[1].textContent.split("\n")[1]?.trim() || '';
    if (existingInnkomban === innkomban) {
      if (!mergedRow) {
        mergedRow = row;
      } else {
        mergedRow.cells[3].textContent += "  " + row.cells[3].textContent;
        mergedRow.cells[4].textContent += " " + row.cells[4].textContent;
        mergedRow.cells[5].textContent += " " + row.cells[5].textContent;
        mergedRow.cells[6].textContent += " " + row.cells[6].textContent;
        row.parentNode.removeChild(row);
      }
    }
  }
  if (!mergedRow) {
    mergedRow = createTableRow(rows.length + 1, innkomban, nazvkomban, "", "", "", "", "", "");
    tableBody.appendChild(mergedRow);
  }
  return mergedRow;
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
        var telefNodes = row.getElementsByTagName("TELEF_NOMER");
        var telef = "";
        for (var k = 0; k < telefNodes.length; k++) {
          var telefValue = telefNodes[k].textContent;
          telef += telefValue + "\n";
        }

        var elpochtNodes = row.getElementsByTagName("ELPOCHTA");
        var elpocht = "";
        for (var k = 0; k < elpochtNodes.length; k++) {
          var elpochtValue = elpochtNodes[k].textContent;
          elpocht += elpochtValue + "\n";
        }

        var vaknazv = getXmlValue(row, "VAKNAZV");
        var oblast = getXmlValue(row, "ADRESSORABOTI-OBLAST");
        var sourceFile = file.name;

        var duplicateEntry = checkDuplicateEntry(schetnomer, vaknazv, elpocht);

        if (!duplicateEntry && schetnomer && schetdata && elpocht && innkomban && nazvkomban && telef && vaknazv) {
          var newRow = createTableRow(rowCount + 1, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile);
          tableBody.appendChild(newRow);
          importedEntries.push({ schetnomer: schetnomer, vaknazv: vaknazv, elpocht: elpocht });
          rowCount++;
          mergeRowsByINNAndCompany(tableBody, innkomban, nazvkomban);
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
  infoCell.classList.add("info-column");
  infoCell.innerHTML = innkomban + "\n<strong>" + nazvkomban + "</strong>\n" + telef + elpocht;
  newRow.appendChild(infoCell);

  var emptyCell1 = document.createElement("td");
  newRow.appendChild(emptyCell1);

  var calculationCell = document.createElement("td");
  calculationCell.classList.add("calculation-column");
  calculationCell.textContent = schetnomer.toString() + " " + schetdata.toString();
  newRow.appendChild(calculationCell);

  var activeVacanciesCell = document.createElement("td");
  activeVacanciesCell.classList.add("vacancies-column");
  if (Array.isArray(vaknazv)) {
      vaknazv.forEach(function (vacancy) {
          var vacancyText = document.createTextNode(vacancy + "\n");
          activeVacanciesCell.appendChild(vacancyText);
      });
  } else {
      var vacancyText = document.createTextNode(vaknazv + "\n");
      activeVacanciesCell.appendChild(vacancyText);
  }
  newRow.appendChild(activeVacanciesCell);

  var emptyCell2 = document.createElement("td");
  newRow.appendChild(emptyCell2);

  var sourceCell = document.createElement("td");
  sourceCell.classList.add("source-column");
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

document.getElementById("importXmlButton").addEventListener("click", importXml);

var links = document.querySelectorAll("#data-table tbody a");
links.forEach(function(link) {
  link.addEventListener("click", handleLinkClick);
});