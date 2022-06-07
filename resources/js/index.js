/**
 * Über diese URL können wir mit einer HTTP-Anfrage die Tabelle einer beliebigen Bundesligasaison
 * abfragen. Die gewünschte Saison wird am Ende der URL angefügt. Als Antwort auf die Anfrage 
 * erhalten wir die aktuelle Tabelle als strukturierten Datensatz. Das konkrete Format ist abhängig 
 * von der Art der Anfrage. Im Browser werden uns die Informationen als XML-Datensatz angezeigt.
 * Bei unserer programmatischen Anfrage im Quellcode werden wir dafür sorgen, dass die Daten im 
 * (in JavaScript) besser verarbeitbaren JSON-Format übertragen werden.
 */
 const API_URL = "https://www.openligadb.de/api/getbltable/bl1/";

 // TODO: Hier beginnt unsere Implementierung