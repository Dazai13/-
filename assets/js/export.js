function exportToXML() {
  // Создаем XML документ
  var xmlDocument = document.implementation.createDocument(null, "DATA");
  var dataElement = xmlDocument.documentElement;

  // Получаем все строки таблицы
  var tableRows = document.querySelectorAll("#data-table tbody tr");

  // Для каждой строки таблицы создаем элемент ROW в XML
  tableRows.forEach(function(row) {
      var rowElement = xmlDocument.createElement("ROW");

      // Получаем данные из ячеек строки таблицы
      var cells = row.querySelectorAll("td");

      // Для каждой ячейки создаем соответствующий элемент в XML
      cells.forEach(function(cell) {
          var cellName = cell.dataset.name;
          var cellValue = cell.textContent.trim();

          // Создаем элемент с именем ячейки
          var cellElement = xmlDocument.createElement(cellName);

          // Если ячейка содержит подэлементы
          if (cellName === "ADRESSOBESEDOVANI" || cellName === "ADRESSORABOTI" || cellName === "TELEF" || cellName === "DOPINFORMS" || cellName === "GAFIK_RABOTI") {
              // Разбиваем текст ячейки на подэлементы
              var subElements = cellValue.split("\n").filter(Boolean); // Удаляем пустые строки

              // Для каждого подэлемента создаем соответствующий элемент в XML
              subElements.forEach(function(subElement) {
                  // Создаем элемент с именем подэлемента
                  var subElementNode = xmlDocument.createElement(subElement);
                  cellElement.appendChild(subElementNode);
              });
          } else {
              // Создаем текстовый узел с содержимым ячейки и добавляем его в элемент ячейки
              var textNode = xmlDocument.createTextNode(cellValue);
              cellElement.appendChild(textNode);
          }

          // Добавляем элемент ячейки в элемент строки
          rowElement.appendChild(cellElement);
      });

      // Добавляем элемент строки в элемент данных
      dataElement.appendChild(rowElement);
  });

  // Преобразуем XML документ в строку
  var serializer = new XMLSerializer();
  var xmlString = serializer.serializeToString(xmlDocument);

  // Сохраняем XML строку в файл
  var blob = new Blob([xmlString], { type: "text/xml" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "data.xml";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
