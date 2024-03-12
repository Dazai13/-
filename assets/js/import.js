document.addEventListener("DOMContentLoaded", function() {
    var importedEntries = [];
    var totalVacanciesCounter = 0;
    var addedVacanciesCounter = 0;
    var allSchetdata = []; // Массив для хранения всех дат SCHETDATA

    function checkDuplicateEntry(schetnomer, vaknazv, elpocht) {
        var rows = document.querySelectorAll(".row");
        for (var i = 0; i < rows.length; i++) {
            var entry = rows[i];
            var schetnomerCell = entry.querySelector(".calculation-column");
            var vaknazvCell = entry.querySelector(".active-vacancies-column");
            var elpochtCell = entry.querySelector(".elpocht-column");
            if (schetnomerCell && vaknazvCell && elpochtCell) {
                if (schetnomerCell.textContent === schetnomer && vaknazvCell.textContent === vaknazv && elpochtCell.textContent === elpocht) {
                    return true;
                }
            }
        }
        return false;
    }    

    function createRow(index, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile, selectedBron, isTable) {
        var newRow;
        newRow = document.createElement("tr");
        newRow.className = "row"; // Добавляем класс "row" для строки таблицы

        var listNumberCell = document.createElement("td"); // Создаем ячейку td для индекса
        var listNumberDiv = document.createElement("div");
        listNumberDiv.textContent = index + "   " + "193201";
        listNumberCell.appendChild(listNumberDiv);
        newRow.appendChild(listNumberCell);

        var innCompanyCell = document.createElement("td");
        var innCompanyDiv = document.createElement("div");
        innCompanyDiv.textContent = innkomban;
        innCompanyCell.appendChild(innCompanyDiv);
        innCompanyCell.classList.add("inn-column"); // Добавляем класс "inn-column" для ячейки с ИНН
        var nazvkombanDiv = document.createElement("div");
        nazvkombanDiv.textContent = nazvkomban;
        innCompanyCell.appendChild(nazvkombanDiv);
        var telefDiv = document.createElement("div");
        telefDiv.textContent = telef.trim() + " / " + elpocht.trim();
        innCompanyCell.appendChild(telefDiv);
        newRow.appendChild(innCompanyCell);

        var bronCell = document.createElement("td");
        bronCell.textContent = selectedBron;
        newRow.appendChild(bronCell);

        var calculationCell = document.createElement("td");
        calculationCell.textContent = schetnomer.toString() + " " + schetdata.toString();
        newRow.appendChild(calculationCell);

        var activeVacanciesCell = document.createElement("td");
        if (Array.isArray(vaknazv)) {
            vaknazv.forEach(function (vacancy) {
                var vacancyDiv = document.createElement("div");
                vacancyDiv.textContent = vacancy;
                activeVacanciesCell.appendChild(vacancyDiv);
            });
        } else {
            activeVacanciesCell.textContent = vaknazv;
        }
        newRow.appendChild(activeVacanciesCell);

        var randomValueCell1 = document.createElement("td");
        var randomValue1 = Math.floor(Math.random() * 21);
        randomValueCell1.textContent = randomValue1;
        newRow.appendChild(randomValueCell1);

        var sourceFileCell = document.createElement("td");
        sourceFileCell.textContent = sourceFile;
        newRow.appendChild(sourceFileCell);

        var randomValueCell2 = document.createElement("td");
        var randomValue2 = Math.floor(Math.random() * 21);
        randomValueCell2.textContent = randomValue2;
        newRow.appendChild(randomValueCell2);

        // Находим tbody таблицы и добавляем в него новую строку
        var tableBody = document.querySelector("#data-table tbody");
        tableBody.appendChild(newRow);

        return newRow;
    }

    function mergeRowsByINNAndCompany(innkomban) { // Принимаем ИНН в качестве параметра
        var rows = document.querySelectorAll(".row");
        var mergedRow = null;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var existingInnDiv = row.querySelector(".inn-column div"); // Изменяем запрос к ячейке с ИНН
            if (existingInnDiv) {
                var existingInn = existingInnDiv.textContent;
                if (existingInn === innkomban) { // Сравниваем строки только по ИНН
                    if (!mergedRow) {
                        mergedRow = row;
                    } else {
                        console.log("Attempting merge:");
                        console.log("Existing merged row:");
                        console.log(mergedRow);
                        console.log("Next row to merge:");
                        console.log(row);
    
                        mergedRow.querySelector(".bron-column").textContent += "  " + row.querySelector(".bron-column").textContent;
                        mergedRow.querySelector(".calculation-column").textContent += " " + row.querySelector(".calculation-column").textContent;
                        mergedRow.querySelector(".active-vacancies-column").textContent += " " + row.querySelector(".active-vacancies-column").textContent;
                        mergedRow.querySelector(".random-value-column").textContent += " " + row.querySelector(".random-value-column").textContent;
                        row.parentNode.removeChild(row);
                    }
                }
            }
        }
        if (mergedRow) {
            console.log("Rows merged successfully");
        } else {
            console.log("No rows were merged");
        }
        return mergedRow;
    }

    function generateUniqueId() {
        return Date.now().toString();
    }

    function importXml() {
        var xmlFileInput = document.getElementById("xmlFileInput");
        var files = xmlFileInput.files;
        var tableBody = document.querySelector("#data-table tbody"); // Получаем ссылку на tbody таблицы
        var rowCount = tableBody.getElementsByClassName("row").length;
        var selectElement = document.getElementById("selectOutput");
        var importedVacanciesCounter = 0;
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
                    allSchetdata.push(schetdata); // Добавляем дату SCHETDATA в список
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

                    // Создаем уникальный ключ для вакансии на основе нескольких параметров
                    var uniqueKey = schetnomer + '|' + vaknazv + '|' + elpocht;

                    if (!checkDuplicateEntry(schetnomer, vaknazv, elpocht) && schetnomer && schetdata && elpocht && innkomban && nazvkomban && telef && vaknazv) {
                        // Убедитесь, что вы получаете нужные данные из XML
                        var innkomban = getXmlValue(row, "INNKOMPAN");
                        var nazvkomban = getXmlValue(row, "NAZVKOMPAN");

                        var selectedBron = document.getElementById("bron").value;
                        // Вставляем данные в соответствующие столбцы при создании новой строки
                        var newRow = createRow(rowCount + 1, innkomban, nazvkomban, telef, elpocht, schetnomer, schetdata, vaknazv, sourceFile, selectedBron); // Fix here
                        // Добавляем созданную строку в тело таблицы
                        tableBody.appendChild(newRow);
                        importedEntries.push({ schetnomer: schetnomer, vaknazv: vaknazv, elpocht: elpocht });
                        rowCount++;
                        mergeRowsByINNAndCompany(innkomban); // Вызываем функцию объединения строк по ИНН
                        uniqueValues.add(oblast);
                        // Увеличиваем счетчик общего количества вакансий
                        totalVacanciesCounter++;
                        importedVacanciesCounter++; // Увеличиваем счетчик импортированных вакансий
                        // Обновляем значения счетчиков в HTML
                        document.getElementById("totalVacancies").textContent = totalVacanciesCounter;
                        document.getElementById("addedVacancies").textContent = importedVacanciesCounter; // Обновляем второй счетчик
                    }
                }
                // Находим минимальную и максимальную дату из всех SCHETDATA
                var result = compareDates(allSchetdata);
                if (result) {
                    document.getElementById("minDateOutput").textContent = result.minDate;
                    document.getElementById("maxDateOutput").textContent = result.maxDate;
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

    function getXmlValue(row, tagName) {
        var element = row.getElementsByTagName(tagName)[0];
        return element ? element.textContent : "";
    }

    function compareDates(allSchetdata) {
        var minDate = null;
        var maxDate = null;

        for (var i = 0; i < allSchetdata.length; i++) {
            var currentDate = new Date(allSchetdata[i]);
            if (!isNaN(currentDate.getTime())) {
                if (!minDate || currentDate < minDate) {
                    minDate = currentDate;
                }
                if (!maxDate || currentDate > maxDate) {
                    maxDate = currentDate;
                }
            }
        }

        var formattedMinDate = minDate ? formatDate(minDate, 'yy') : null;
        var formattedMaxDate = maxDate ? formatDate(maxDate, 'yy') : null;

        return { minDate: formattedMinDate, maxDate: formattedMaxDate };
    }

    function formatDate(date, format) {
        const options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        };
        const formattedDate = new Intl.DateTimeFormat('ru', options).format(date);
        return formattedDate;
    }

    var xmlFileInput = document.getElementById("xmlFileInput");
    xmlFileInput.addEventListener("change", importXml);
    document.getElementById("importXmlButton").addEventListener("click", importXml);

    var links = document.querySelectorAll("#data-table .row a");
    links.forEach(function(link) {
        link.addEventListener("click", handleLinkClick);
    });
}); 