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
  // AddNewRow
  function addNewRow() {
    var newSchetnomer = document.getElementById("newSchetnomer").value;
    var newSchetdata = document.getElementById("newSchetdata").value;
    var newInnkomban = document.getElementById("newInnkomban").value;
    var newNazvkomban = document.getElementById("newNazvkomban").value;
    var newTelef = document.getElementById("newTelef").value;
    var newElpocht = document.getElementById("newElpocht").value;
    var newElpochtakadrovik = document.getElementById("newElpochtakadrovik").value;
    var newVaknazv = document.getElementById("newVaknazv").value;
    var newRow = document.createElement("tr");
    var newSchetCell = document.createElement("td");
    newSchetCell.textContent = newSchetnomer + " / " + newSchetdata;
    newRow.appendChild(newSchetCell);
    var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];
    var rows = tableBody.getElementsByTagName("tr");
    var insertIndex = 0;
    while (insertIndex < rows.length && rows[insertIndex].getElementsByTagName("td")[0].textContent.localeCompare(newSchetnomer) < 0) {
      insertIndex++;
    }
    if (insertIndex === rows.length) {
      tableBody.appendChild(newRow);
    } else {
      tableBody.insertBefore(newRow, rows[insertIndex]);
    }
    updateRowCount();
  }

  /*Кнопка DESELECT (Пункт 6)*/
  function clearFields() {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "text" && !inputs[i].classList.contains("new-input")) {
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

// Функция для обновления счетчика строк
var rowCount = 0; // Количество строк
var addedRows = {}; // Создаем объект для хранения информации о добавленных строках

function updateRowCount() {
    var rowCountElement = document.getElementById("rowCountValue");
    var rowCount = document.getElementById("data-table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    rowCountElement.textContent = rowCount;
  }
  const menu = document.querySelector('select');

  menu.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    console.log(selectedOption);
  });