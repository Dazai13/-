function exportToXML() {
    var table = document.getElementById("data-table");
    var rows = table.getElementsByTagName("tr");
  
    var xmlDoc = document.implementation.createDocument(null, "data");
  
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");

      var rowElement = xmlDoc.createElement("row");
  
      for (var j = 0; j < cells.length; j++) {
        var cellValue = cells[j].textContent.trim();
        var cellName = "column_" + (j + 1);

        var cellElement = xmlDoc.createElement(cellName);
        cellElement.textContent = cellValue;

        rowElement.appendChild(cellElement);
      }
      function exportToXML(importedEntries) {

        var xmlDoc = document.implementation.createDocument(null, "ROOT");
      
        var rootElement = xmlDoc.documentElement;

        importedEntries.forEach(function(entry) {

          var rowElement = xmlDoc.createElement("ROW");

          rootElement.appendChild(rowElement);

          for (var key in entry) {
            if (entry.hasOwnProperty(key)) {

              var dataElement = xmlDoc.createElement(key);
              dataElement.textContent = entry[key];

              rowElement.appendChild(dataElement);
            }
          }
        });

        var xmlString = new XMLSerializer().serializeToString(xmlDoc);

        var link = document.createElement("a");
        link.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(xmlString));
        link.setAttribute("download", "exported_data.xml");
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      }

      xmlDoc.documentElement.appendChild(rowElement);
    }

    var xmlString = new XMLSerializer().serializeToString(xmlDoc);

    var link = document.createElement("a");
    link.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(xmlString));
    link.setAttribute("download", "exported_data.xml");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }
  exportToXML(importedEntries);
  