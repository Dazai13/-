function importXml() {
  var xmlFileInput = document.getElementById("xmlFileInput");
  var files = xmlFileInput.files;

  var earliestDate = Infinity; // Самая ранняя дата
  var latestDate = 0; // Самая поздняя дата
  var rowCount = 0; // Количество строк

  function getXmlValue(node, tagName) {
      var elements = node.getElementsByTagName(tagName);
      if (elements.length > 0) {
          return elements[0].textContent.trim();
      }
      return "";
  }

  var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0]; // Получаем элемент тела таблицы

  // Создаем объект для хранения информации о добавленных строках
  var addedRows = {}; // объявляем переменную addedRows

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

          var fileEarliestDate = Infinity; // Самая ранняя дата в текущем файле
          var fileLatestDate = 0; // Самая поздняя дата в текущем файле

          for (var j = 0; j < rows.length; j++) {
              var row = rows[j];

              var schetnomer = getXmlValue(row, "SCHETNOMER");
              var schetdata = getXmlValue(row, "SCHETDATA");
              var innkomban = getXmlValue(row, "INNKOMPAN");
              var nazvkomban = getXmlValue(row, "NAZVKOMPAN");
              var telef = getXmlValue(row, "TELEF");
              var elpocht = getXmlValue(row, "ELPOCHTA");
              var elpochtakadrovik = getXmlValue(row, "ELPOCHTAKADROVIK");
              var vaknazv = getXmlValue(row, "VAKNAZV");
              var zarpl = getXmlValue(row, "ZARPL");

              var duplicateEntry = checkDuplicateEntry(schetnomer, vaknazv, zarpl);

              if (!duplicateEntry && schetnomer && schetdata && !addedRows[schetnomer]) {
                  var newRow = document.createElement("tr");

                  var schetCell = document.createElement("td");
                  schetCell.textContent = schetnomer + " / " + schetdata;
                  var innkombanCell = document.createElement("td");
                  innkombanCell.textContent = innkomban;
                  var nazvkombanCell = document.createElement("td");
                  nazvkombanCell.textContent = nazvkomban;
                  var telefCell = document.createElement("td");
                  telefCell.textContent = telef;
                  var elpochtCell = document.createElement("td");
                  elpochtCell.textContent = elpochtakadrovik ? elpochtakadrovik : elpocht;
                  var vaknazvCell = document.createElement("td");
                  vaknazvCell.textContent = vaknazv;
                  var filenameCell = document.createElement("td");
                  filenameCell.textContent = file.name;

                  newRow.appendChild(schetCell);
                  newRow.appendChild(innkombanCell);
                  newRow.appendChild(nazvkombanCell);
                  newRow.appendChild(telefCell);
                  newRow.appendChild(elpochtCell);
                  newRow.appendChild(vaknazvCell);
                  newRow.appendChild(filenameCell);

                  tableBody.appendChild(newRow); // добавляем строку в тело таблицы

                  var currentDate = new Date(schetdata);
                  var currentDateMillis = currentDate.getTime();

                  if (!isNaN(currentDateMillis)) {
                      if (currentDateMillis < fileEarliestDate) {
                          fileEarliestDate = currentDateMillis;
                      }
                      if (currentDateMillis > fileLatestDate) {
                          fileLatestDate = currentDateMillis;
                      }
                  }

                  rowCount++; // увеличиваем счетчик строк

                  // Добавляем информацию о добавленной строке в объект addedRows
                  addedRows[schetnomer] = true;
              }
          }

          if (earliestDate === Infinity || fileEarliestDate < earliestDate) {
              earliestDate = fileEarliestDate;
          }

          if (fileLatestDate > latestDate) {
              latestDate = fileLatestDate;
          }

          var earliestDateElement = document.getElementById("earliestDate");
          var latestDateElement = document.getElementById("latestDate");
          var rowCountElement = document.getElementById("rowCountValue");

          earliestDateElement.textContent = new Date(earliestDate).toLocaleDateString();
          latestDateElement.textContent = new Date(latestDate).toLocaleDateString();
          rowCountElement.textContent = parseInt(rowCountElement.textContent) + rowCount; // Плюсуем импортированное количество строк
      };

      reader.readAsArrayBuffer(file);
  }
}
// Основной код
var input = document.getElementById("searchInput");
input.addEventListener("input", handleSearch);

function handleSearch(event) {
  var inputValue = event.target.value;
  // дополнительный код обработки ввода
}
document.getElementById("importXmlButton").addEventListener("click", importXml);
var searchInput = document.getElementById("searchInput");
document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearch);
});
// Присвойте обработчики клика по гиперссылкам после импорта
var links = document.querySelectorAll("#data-table tbody a");
links.forEach(function(link) {
  link.addEventListener("click", handleLinkClick);
});  
  // Функция для получения значения из xml тега
function getXmlValue(element, tagName) {
    var elements = element.getElementsByTagName(tagName);
    if (elements.length > 0) {
      return elements[0].textContent;
    }
    return "";
  }
  // Функция для проверки наличия дубликата в таблице
  function checkDuplicateEntry(schetnomer, vaknazv, zarpl) {
    var rows = document.getElementById("data-table").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
  
      var existingSchetnomer = row.getElementsByTagName("td")[0].textContent.split(" / ")[0];
      var existingVaknazv = getCellContent(row, 5);
      var existingZarpl = getCellContent(row, 6);
  
      if (existingSchetnomer === schetnomer && existingVaknazv === vaknazv && existingZarpl === zarpl) {
        return true;
      }
    }
  
    return false;
  }
  
  function getCellContent(row, index) {
    var cells = row.getElementsByTagName("td");
    if (cells.length > index) {
      return cells[index].textContent.trim();
    }
    return "";
  }
  
document.getElementById("importXmlButton").addEventListener("click", importXml);

