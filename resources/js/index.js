/*
 * In dieser Datei wird der gesamte Update-Prozess implementiert, der beim Aufruf der HTML-Seite
 * dazu führt, dass die aktuelle Bundesligatabelle angezeigt wird. Dazu wird zuerst via SeasonRequest
 * die aktuelle Tabelle vom Server erfragt und in eine Array aus Team-Objekten umgewandelt. Mit diesen
 * Daten wird anschließend ein TableView erstellt bzw. befüllt, in dem die Bundesliga-Tabelle dargestellt wird. Dazu 
 * werden auf Basis der Team-Objekte einzelne Tabellen-Zeilen (td-Elemente) erstellt und als Kindelemente
 * des bereits existierenden table-Elements im DOM eingefügt. 
 * */

const seasonRequest = new SeasonRequest("2021"); //  Erstellen des AJAX/HTTP-Requests-Wrappers

// Ausführend des Requests durch den Aufruf der "run"-Methode
seasonRequest.run((results) => { // Verarbeitung der Ergebnisse ("results") in der inline-definierten Callback-Methode
    let tableElement = document.querySelector("table"), // Selektion des Tabellen-Elements aus dem DOM
    tableView = new TableView(tableElement); // Erstellen des TableView-Objekts, das das Tabellen-Element verwaltet
    tableView.show(results); // Anzeigen der vom Server erhaltenden und im SeasonRequest transformierten Ergebnisse in der Tabelle
});