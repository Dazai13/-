/*Курсор на месте при перезагрузкке (Пункт 3)*/

window.addEventListener('beforeunload', function(event) {
    localStorage.setItem('cursorX', event.clientX);
    localStorage.setItem('cursorY', event.clientY);
  });

/*Распаковка XML файла*/

function importXml() {
    var xmlFileInput = document.getElementById("xmlFileInput");
    var files = xmlFileInput.files;
  
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var xmlContent = e.target.result;
        var decoder = new TextDecoder("windows-1251");
        var xmlDecoded = decoder.decode(new Uint8Array(xmlContent));
  
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlDecoded, "text/xml");
  
        var rows = xmlDoc.getElementsByTagName("ROW");
        var tableBody = document.getElementById("data-table").getElementsByTagName("tbody")[0];
  
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
          var filename = file.name;
  
          // Проверка наличия номера и даты счета
          if (!schetnomer || !schetdata) {
            continue; // Пропуск записи без номера или даты счета
          }
  
          // Проверка на совпадение по совокупности тегов
          var duplicateEntry = checkDuplicateEntry(schetnomer, vaknazv, zarpl);
  
          // Если нет повтора, добавляем контент в таблицу
          if (!duplicateEntry) {
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
            filenameCell.textContent = filename;
  
            newRow.appendChild(schetCell);
            newRow.appendChild(innkombanCell);
            newRow.appendChild(nazvkombanCell);
            newRow.appendChild(telefCell);
            newRow.appendChild(elpochtCell);
            newRow.appendChild(vaknazvCell);
            newRow.appendChild(filenameCell);
  
            tableBody.appendChild(newRow);
          }
        }
      };
  
      reader.readAsArrayBuffer(file);
    }
  }
  
  
  
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

/*Кнопка DESELECT (Пункт 6)*/
function clearFields() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "text") {
            inputs[i].value = "";
        }
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
var input8 = document.getElementById("searchInput8");

var clearIcon1 = document.getElementById("clearIcon1");
var clearIcon2 = document.getElementById("clearIcon2");
var clearIcon3 = document.getElementById("clearIcon3");
var clearIcon4 = document.getElementById("clearIcon4");
var clearIcon5 = document.getElementById("clearIcon5");
var clearIcon6 = document.getElementById("clearIcon6");
var clearIcon7 = document.getElementById("clearIcon7");
var clearIcon8 = document.getElementById("clearIcon8");

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
input8.addEventListener("input", function() {
    manageClearIcon(input8, clearIcon8);
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
