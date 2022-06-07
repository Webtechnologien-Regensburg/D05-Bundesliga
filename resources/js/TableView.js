/**
 * In dieser Datei implementieren wir alle notwendigen Klassen und Methoden, die zum Anzeigen
 * der Team-Objekten im _User Interface_ der Anwendung notwendig sind. Hier erstellen wir auf
 * Basis der Team-Objekte einzelne HTML-Elemente, die als Kindelemente der existierenden Tabelle
 * (<table>) in das DOM eingefügt und so für die Nutzer*innen sichtbar werden.
 */


/**
 * Die Methode erstellt ein einzelnes tr-Element (Zeile), mit dem das als Parameter übergebene Team-Objekt
 * in der Tabelle angezeigt werden kann. Die Informationen aus dem Team-Objekt werden dazu über
 * dessen Eigenschaften ausgelesen und in einzelne td-Elemente (Zellen) der neuen Zeile eingefügt. Dabei wird
 * zwischen Text- und Bilddaten unterschieden, die durch unterschiedliche Zellen abgebildet werden.
 * 
 * @param {Object} team Der Verein, der in der Tabellenzeile dargestellt werden soll
 * @returns Ein neues tr-Element, das zur Anzeige des Vereins im UI verwendet werden kann
 */
function createRowElementFromTeam(team) {
    let row = document.createElement("tr"); // Erzeugen eines neuen, leeren td-Elements
    row.append(createCellForValue(team.position)); // Hinzufügen einer neuen Zelle mit der Position des Vereins
    row.append(createCellForImage(team.icon)); // Hinzufügen einer neuen Zelle mit dem Logo des Vereins
    row.append(createCellForValue(team.name)); // Hinzufügen einer neuen Zelle mit dem Namen des Vereins
    row.append(createCellForValue(team.wins)); // Hinzufügen einer neuen Zelle mit der Anzahl der gewonnen Spiele des Vereins
    row.append(createCellForValue(team.draws)); // Hinzufügen einer neuen Zelle mit der Anzahl der unentschiedenen Spiele des Vereins
    row.append(createCellForValue(team.losses)); // Hinzufügen einer neuen Zelle mit der Anzahl der verlorenen Spiele des Vereins
    row.append(createCellForValue(team.goals + ":" + team.opponentGoals)); // Hinzufügen einer neuen Zelle mit dem Torverhältnis des Vereins
    row.append(createCellForValue(team.points)); // Hinzufügen einer neuen Zelle mit den Punkten des Vereins
    return row; // Rückgabe des neuen Objekts
}

/**
 * Die Methode erstellt ein neues td-Element (Zelle) mit der übergebenen Text als Inhalt
 * 
 * @param {String} value Der Inhalt, der in der Zelle angezeigt werden soll
 * @returns Ein neues td-Element mit dem übergebenen Inhalt
 */
function createCellForValue(value = "") { // Falls kein Inhalt übergeben wird, wird ein leerer String verwendet (Default-Wert)
    let cell = document.createElement("td"); // Erzeugen eines neuen, leeren td-Elements
    cell.innerHTML = value || ""; // Eintragen des übergebenen Text als Inhalt des neuen Elements
    return cell; // Rückgabe des neuen Elements
}

/**
 * Die Methode erstellt ein neues td-Element (Zelle) in der das übergeben Bild dargestellt wird
 * 
 * @param {String} src URL zum Bild, das in der Zelle angezeigt werden soll
 * @returns Ein neues td-Element mit einem img-Element als Kind, in dem das übergebene Bild dargestellt wird
 */
function createCellForImage(src) {
    let cell = createCellForValue(), // Erzeugen einer normalen Zelle ohne Inhalt
        img = document.createElement("img"); // Erzeugen eines leeren Bild-Elements
    img.src = src; // Setzen des src-Attributs im neuen Bild-Element, damit dort das gewünschte Bild angezeigt wird
    cell.append(img); // Einfügen des neuen Bild-Elements in der erstellten Zelle (als Kindelement)
    return cell; // Rückgabe der neuen Zelle mit dem inneren Bild-Element
}

/**
 * Mit dieser "Klasse" repräsentieren wir die sichtbare Tabelle im UI und schaffen einen zentralen Punkt für
 * die Operationen (Anzeige der vom Server erhaltenen Daten), die in dessen Kontext implementiert bzw. verwendet 
 * werden sollen.
 */
class TableView {

    /**
     * Erstellt ein neues Objekt vom "Typ" TableView. Dabei wird das HTML-Element (<table>) als Parameter übergebenen,
     * um das sich dieses Objekt "kümmern" soll.
     * 
     * @param {HTMLElement} el Aus dem DOM selektiertes HTML-Element (<table>)
     */
    constructor(el) {
        this.el = el;
    }

    /**
     * Die Methode ersetzt alle Inhalte, die aktuelle im Body des verwalteten <table>-Elements angezeigt werden, durch
     * neue Zellen, die jeweils einen der als Array übergebenen Vereine repräsentieren.
     * 
     * @param {Array} teams Array aus Team-Objekten
     */
    show(teams) {
        let tableBody = this.el.querySelector("tbody"); // Auswahl des Tabellenrumpfs aus dem im Konstruktor übergebenen <table>-Element
        tableBody.innerHTML = ""; // Entfernen aller Inhalte aus dem Tabellenrumpf
        teams.forEach((team) => { // Iteration über alle Vereine aus dem übergebenen Array
            let teamRow = createRowElementFromTeam(team); // Erstellen einer neuen Zeile für jeden Verein
            tableBody.append(teamRow); // Anhängen der neuen Zeile an den Tabellenrumpf
        })
    }
}