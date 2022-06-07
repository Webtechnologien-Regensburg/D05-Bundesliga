/**
 * Über diese URL können wir mit einer HTTP-Anfrage die Tabelle einer beliebigen Bundesligasaison
 * abfragen. Die gewünschte Saison wird am Ende der URL angefügt. Als Antwort auf die Anfrage 
 * erhalten wir die aktuelle Tabelle als strukturierten Datensatz. Das konkrete Format ist abhängig 
 * von der Art der Anfrage. Im Browser werden uns die Informationen als XML-Datensatz angezeigt.
 * Bei unserer programmatischen Anfrage im Quellcode werden wir dafür sorgen, dass die Daten im 
 * (in JavaScript) besser verarbeitbaren JSON-Format übertragen werden.
 */
const API_URL = "https://www.openligadb.de/api/getbltable/bl1/";

/**
 * Mit dieser "Klasse" bilden wir die einzelnen Vereine innerhalb der Anwendung ab. Wir übertragen 
 * dabei die Informationen aus den JSON-Objekten, die wir vom Server erhalten in eine Objekt, dessen
 * Struktur und Eigenschaftsnamen wir selber bestimmen. Eigenschaften, die innerhalb unserer Anwendung
 * nicht benötigt werden, werden nicht im Team-Objekt gespeichert.
 */
class Team {

    /**
     * Erzeugt eine neues Team-Objekt
     * 
     * @param {Number} position Position des Vereins innerhalb der Tabelle
     * @param {String} icon URL zu einer Grafik mit dem Vereinslogo
     * @param {String} name Name des Vereins
     * @param {Number} wins Anzahl der gewonnene Spiele
     * @param {Number} draws Anzahl der unentschiedenen Spiele
     * @param {Number} losses Anzahl der verlorenen Spiele
     * @param {Number} points Anzahl der Punkte
     * @param {Number} goals Anzahl der eigenen Tore
     * @param {Number} opponentGoals Anzahl der eigenen Tore
     */
    constructor(position, icon, name, wins, draws, losses, points, goals, opponentGoals) {
        // Alle übergebenen Parameter werden als Eigenschaften des neuen Objekts gespeichert
        this.position = position; 
        this.icon = icon;
        this.name = name;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
        this.points = points;
        this.goals = goals;
        this.opponentGoals = opponentGoals;
        Object.freeze(this); // Hier verhinder wir das nachträgliche Verändern des Objekts und seiner Eigenschaften
    }

    /**
     * Der Konstruktor des Objekts verfügt über viele Eigenschaften, die innerhalb unserer Anwendung aber immer
     * aus einem JSON-Objekt ausgelesen werden, das wir vom Server erhalten. Wir implementieren daher eine einfacher
     * zu verwendende, statische Konstruktionsmethode, der wir das gesamte JSON-Objekt und die Position des Vereins,
     * die sich aus der Reihenfolge in dem Datensatz vom Server ergibt, übergeben und die daraus ein neues Team-Objekt 
     * erstellt. Der komplizierte Konstruktor-Aufruf wird so "versteckt" und der Quellcode bleibt an der Stelle, an 
     * der die Daten umgewandelt werden (Vgl. "request"-Methode des APIConnector-Objekts) übersichtlicher.
     * @param {Object} json Das JSON-Objekt vom Server, dass den Verein beschreibt
     * @param {Number} position Die Position des neuen Vereins innerhalb der Bundesligatabelle
     * @returns Ein neues Team-Objekt, mit den Informationen zum übergebenen Verein
     */
    static fromJSON(json, position) {
        return new Team(position, json.TeamIconUrl, json.TeamName, json.Won, json.Draw, json.Lost, json.Points, json.Goals, json.OpponentGoals);
    }
}

/** 
 * Mit dieser "Klasse" repräsentieren wir eine einzelne Anfragen an den API-Server, um die aktuelle Tabelle einer
 * bestimmten Bundesligasaison zu erfragen. Die gewünschte Saison wird beim Erstellen der Anfrage angegeben. Der
 * gesamte AJAX-Vorgang wird im SeasonRequest-Objekt implementiert bzw. ausgeführt. Die aufrufenden Stelle des Codes
 * erhält als (asynchrone) Antwort ein Array aus Team-Objekten, das die aktuelle Tabelle für die entsprechende Saison
 * darstellt.
*/
class SeasonRequest {

    /**
     * Erzeugt ein neues SeasonRequest-Objekt 
     * 
     * @param {String} season Erstes Jahr der gewünschten Saison, z.B. "2021" für die Saison 2021/22
     */
    constructor(season) {
        // Die übergebene Saison wird gespeichert, um später die korrekte Request-URL zusammenbauen zu können
        this.season = season; 
        Object.freeze(this); // Hier verhinder wir das nachträgliche Verändern des Objekts und seiner Eigenschaften
    }

    /**
     * In dieser Methode wird der eigentliche AJAX- bzw. HTTP-Aufruf implementiert. Durch die Verwendung der 
     * fetch-API geht dabei glücklicherweise viel der eigentlichen Komplexität verloren. Damit wir den Quellcode
     * so übersichtlich und kompakt gestalten können, müssen wir allerdings einige neue Bausteine verwenden:
     * 
     * async: Wir kennzeichnen diese Methode explizit mit diesem Schlüsselwort. Die JavaScript-Laufzeitumgebung weiß
     * jetzt, dass hier eine asynchrone Operation implementiert wird und erlaubt uns, im inneren der Methode auf das 
     * Schlüsselwort await zuzugreifen, um eigentlich notwendige Callbacks bzw. Promises zu umgehen. Die Laufzeitumgebung
     * stellt sicher, dass die Methode asynchron durchgeführt wird.
     * 
     * @param {*} callback Callback-Methode, die von der aufrufenden Stelle übergeben wird und über die diese 
     * nach Abschuss der AJAX-Anfrage über das Ergebnis informiert werden soll.
     */
    async run(callback) {
        let response = await fetch(API_URL + this.season), // Wir starten die Anfrage an den API-Server und warten auf dessen Antwort
            data = await response.json(), // Wir starten die Umwandlung der Server-Antwort in das JSON-Format und warten auf das Ergebnis
            teams = data.map((team, index) => { // Wir nutzen die map-Funktion des Arrays, um alle Datensätze einzeln zu transformieren ...
                return Team.fromJSON(team, index + 1); // ... in dem wir aus den JSON-Objekten Team-Objekte erstellen ...
            }); // ... und in dem neuen Array teams speichern (Vgl. Array.prototype.map)
        callback(teams); // Die umgewandelten Daten werden über den initial übergebenen Callback zurück gegeben
    }

}