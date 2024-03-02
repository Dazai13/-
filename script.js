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

/*Курсор на месте при перезагрузкке (Пункт 3)*/
window.addEventListener('beforeunload', function(event) {
    localStorage.setItem('cursorX', event.clientX);
    localStorage.setItem('cursorY', event.clientY);
  });

/*Кнопка DESELECT (Пункт 6)*/
function clearFields() {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "text") {
          inputs[i].value = "";
          var clearIcon = inputs[i].nextElementSibling;
          clearIcon.style.display = "none";
      }
  }
}

var deselectButton = document.querySelector("[onclick='clearFields()']");
deselectButton.addEventListener("click", function () {
  clearFields();
  var clearIcons = document.querySelectorAll("[id^='clearIcon']");
  clearIcons.forEach(function (clearIcon) {
      clearIcon.style.display = "none";
  });
});

var searchInputs = document.querySelectorAll("input[id^='searchInput']");
searchInputs.forEach(function (input) {
  input.addEventListener("input", function () {
      manageClearIcon(input);
  });

  var clearIcon = input.nextElementSibling;
  clearIcon.addEventListener("click", function () {
      input.value = "";
      manageClearIcon(input);
  });

  clearIcon.addEventListener("mouseover", function () {
      this.style.opacity = "0.5";
  });

  clearIcon.addEventListener("mouseout", function () {
      this.style.opacity = "1";
  });
});

function manageClearIcon(input) {
  var clearIcon = input.nextElementSibling;
  if (input.value.length > 0) {
      clearIcon.style.display = "inline-block";
  } else {
      clearIcon.style.display = "none";
  }
}

/*Крестик на поиске(Пункт 2) */
var input1 = document.getElementById("searchInput1");
var input2 = document.getElementById("searchInput2");
var input3 = document.getElementById("searchInput3");
var input4 = document.getElementById("searchInput4");
var input5 = document.getElementById("searchInput5");
var input6 = document.getElementById("searchInput6");
var input7 = document.getElementById("searchInput7");

var clearIcon1 = document.getElementById("clearIcon1");
var clearIcon2 = document.getElementById("clearIcon2");
var clearIcon3 = document.getElementById("clearIcon3");
var clearIcon4 = document.getElementById("clearIcon4");
var clearIcon5 = document.getElementById("clearIcon5");
var clearIcon6 = document.getElementById("clearIcon6");
var clearIcon7 = document.getElementById("clearIcon7");

input1.addEventListener("input", function() {
    manageClearIcon(input1, clearIcon1);
});
input2.addEventListener("input", function() {
    manageClearIcon(input2, clearIcon2);
});
input3.addEventListener("input", function() {
    manageClearIcon(input3, clearIcon3);
});
input4.addEventListener("input", function() {
    manageClearIcon(input4, clearIcon4);
});
input5.addEventListener("input", function() {
    manageClearIcon(input5, clearIcon5);
});
input6.addEventListener("input", function() {
    manageClearIcon(input6, clearIcon6);
});
input7.addEventListener("input", function() {
    manageClearIcon(input7, clearIcon7);
});

function manageClearIcon(input, clearIcon) {
    if (input.value.length > 0) {
        clearIcon.style.display = "inline-block";
    } else {
        clearIcon.style.display = "none";
    }
}

var clearIcons = document.querySelectorAll("[id^='clearIcon']");
for (var i = 0; i < clearIcons.length; i++) {
    clearIcons[i].addEventListener("mouseover", function() {
        this.style.opacity = "0.5";
    });
    clearIcons[i].addEventListener("mouseout", function() {
        this.style.opacity = "1";
    });
}

function clearSearch(index) {
    var input = document.getElementById("searchInput" + index);
    var clearIcon = document.getElementById("clearIcon" + index);
    input.value = "";
    clearIcon.style.display = "none";
}

// При нажатии на название на колонку необходимо производить сортировку в колонке по А-Я, если повторно нажать, то сортировка должна происходить уже в обратном направлении Я-А

var columnSorting = {};

function createLinkCell(text, link, columnIndex) {
  var cell = document.createElement("td");
  var linkElement = document.createElement("a");
  linkElement.href = link;
  linkElement.textContent = text;
  linkElement.setAttribute("data-content", text);
  linkElement.classList.add("sortable");
  linkElement.addEventListener("click", function() {
    handleSort(columnIndex);
  });
  cell.appendChild(linkElement);
  var tableRows = document.querySelectorAll("#data-table tbody tr");
  tableRows.forEach(function(row) {
    var cells = row.getElementsByTagName("td");
    if (cells.length <= columnIndex) {
      var emptyCell = document.createElement("td");
      row.appendChild(emptyCell);
    }
  });

  return cell;
}

function handleSort(columnIndex) {
  var tableBody = document.querySelector("#data-table tbody");
  var rows = tableBody.querySelectorAll("tr");

  var previousSort = columnSorting[columnIndex] || "";
  var direction = previousSort === "asc" ? "desc" : "asc";
  columnSorting[columnIndex] = direction;

  var sortedRows = Array.from(rows);

  sortedRows.sort(function(a, b) {
    var cellsA = a.querySelectorAll("td");
    var cellsB = b.querySelectorAll("td");

    if (cellsA.length > columnIndex && cellsB.length > columnIndex) {
      var valueA = cellsA[columnIndex].textContent;
      var valueB = cellsB[columnIndex].textContent;

      if (direction === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }

    return 0;
  });

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  sortedRows.forEach(function(row) {
    tableBody.appendChild(row);
  });
}

function addColumnSortListeners() {
  var tableHead = document.getElementById("data-table").getElementsByTagName("thead")[0];
  var headerCells = tableHead.getElementsByTagName("th");

  for (var i = 0; i < headerCells.length; i++) {
    var headerCell = headerCells[i];
    var linkElement = headerCell.querySelector("a");

    if (linkElement) {
      linkElement.addEventListener("click", function(e) {
        e.preventDefault();
        handleSort(i);
      });
    }
  }
}

addColumnSortListeners();








 
  
/*Распаковка XML файла*/

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
  var addedRows = {};

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

// Функция для создания ячейки с гиперссылкой
function createLinkCell(text, link) {
  var cell = document.createElement("td");
  var linkElement = document.createElement("a");
  linkElement.href = link;
  linkElement.textContent = text;
  linkElement.setAttribute("data-content", text); // Добавить атрибут data-content
  cell.appendChild(linkElement);
  return cell;
}

// Обработчик клика по гиперссылке
function handleLinkClick(event) {
  event.preventDefault();

  var content = this.getAttribute("data-content");
  var searchInput = document.getElementById("searchInput");
  var searchValues = searchInput.value.split(",");

  var newSearchValues = searchValues.filter(function(value) {

    return value.trim() !== content;
  });

  searchInput.value = newSearchValues.join(",");
  handleSearch();
}

// Обработчик поиска и фильтрации таблицы
function handleSearch() {
  var searchInput = document.getElementById("searchInput");
  var searchText = searchInput.value.toLowerCase();

  var tableRows = document.querySelectorAll("#data-table tbody tr");

  tableRows.forEach(function(row) {
    var rowVisible = false;
    var cells = row.getElementsByTagName("td");

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var cellText = cell.textContent.toLowerCase();

      if (cellText.includes(searchText)) {
        rowVisible = true;
        break;
      }
    }

    row.style.display = rowVisible ? "" : "none";
  });
}

// Основной код
document.getElementById("importXmlButton").addEventListener("click", importXml);

var searchInput = document.getElementById("searchInput1");
searchInput.addEventListener("input", handleSearch);

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
  
      var existingSchetnomer = row.getElementsByTagName("td")[0].textContent.split('')[0];
      var existingVaknazv = row.getElementsByTagName("td")[5].textContent;
      var existingZarpl = row.getElementsByTagName("td")[6].textContent;
  
      if (existingSchetnomer === schetnomer && existingVaknazv === vaknazv && existingZarpl === zarpl) {
        return true;
      }
    }
  
    return false;

}

document.getElementById("importXmlButton").addEventListener("click", importXml);



