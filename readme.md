# Lern-Periode 10

25.4 bis 27.6

## Grob-Planung

1. Welche Programmiersprache möchten Sie verwenden? Was denken Sie, wo Ihre Zeit und Übung am sinnvollsten ist?
   Ich möchte etwas mit Python machen, da ich da am meisten Übung brauche. Ich finde Python eine coole Programmiersprache, die viele Möglichkeiten bieten, deswegen möchte ich meine Zeit und Übung darin investieren.
2. Welche Datenbank-Technologie möchten Sie üben? Fühlen Sie sich sicher mit SQL und möchten etwas Neues ausprobieren; oder möchten Sie sich weiter mit SQL beschäftigen?
   Ich möchte bei SQL bleiben, da sich der nächste Modul sowieso mit NoSQL befasst. Ich finde, ich kann viel strukturierter mit dem Modul lernen.
3. Was wäre ein geeignetes Abschluss-Projekt?
   Ein Haushaltsorganisations-Tool, indem Familienmitglieder Aufgaben fair verteilt bekommen, darunter auch Benachrichtigungen. Dazu kommt noch eine gemeinsame Einkaufsliste.

## 25.4

Welche 3 *features* sind die wichtigsten Ihres Projektes? Wie können Sie die Machbarkeit dieser in jeweils 45' am einfachsten beweisen?

- [x] *make or break feature* 1: Aufgabenmanagement
- [x] *make or break feature* 2: Erinnerungssystem
- [x] *make or break feature* 3: Gemeinsame Einkaufsliste

✍️ Heute habe ich einen explorativen Prototyp für ein Haushaltsorganisations-Tool mit Python, Flask und SQLite erstellt. Nach anfänglichen Kompatibilitätsproblemen mit Flask und Werkzeug konnte ich die Anwendung erfolgreich zum Laufen bringen. Ich habe gelernt, dass SQLite eine einfache, dateibasierte Datenbank ist, die sich perfekt für Prototypen eignet und keinen separaten Datenbankserver wie SQL Express benötigt. Die grundlegenden CRUD-Operationen für Aufgaben und Einkaufsliste funktionieren, und die ersten Tests verliefen erfolgreich.

## 2.5

Ausgehend von Ihren Erfahrungen vom 25.4, welche *features* brauchen noch mehr Recherche? (Sie können auch mehrere AP für ein *feature* aufwenden.)
Erinnerungssystem

- [x] Verbesserung Erinnerungssystem (mit tatsächlichen Benachrichtigungen statt nur Anzeige)
- [x] Exploration Wiederholungsmustern für regelmässige Aufgaben
- [x] Exploration einfacher Authentifizierungsmethoden ohne komplexe Benutzerprofile
- [x] UI und Struktur designen (📵)

✍️ Heute habe ich mithilfe von win11toast den Erinnerungssystem besser kennenlernen. Ich konnte erfolgreich lokale Windows-Benachrichtigungen erstellen, die für mein Haushaltsorganisations-Tool geeignet sind.

## 9.5

Planen Sie nun Ihr Projekt, sodass die *Kern-Funktionalität* in 3 Sitzungen realisiert ist. Schreiben Sie dazu zunächst 3 solche übergeordneten Kern-Funktionalitäten auf: 

1. Kern-Funktionalität: Aufgabenmanagement (+ gemeinsame Einkaufsliste)
2. Kern-Funktionalität: Erinnerungssystem
3. Kern-Funktionalität: Authentifizierungssystem

Diese Kern-Funktionalitäten brechen Sie nun in etwa 4 AP je herunter. Versuchen Sie jetzt bereits, auch die Sitzung vom 16.5 und 23.5 zu planen (im Wissen, dass Sie kleine Anpassungen an Ihrer Planung vornehmen können).

- [x] Datenmodell für Aufgaben und Einkaufslisten-Items erstellen (mit mongoDB)
- [x] CRUD-Funktionalität für Aufgaben implementieren (Erstellen, Lesen, Aktualisieren, Löschen)
- [x] CRUD-Funktionalität für Einkaufslisten-Items implementieren

✍️ Heute habe ich das Datenmodell für Aufgaben und Einkaufslisten in MongoDB erstellt. Die Dokumentenstruktur umfasst Felder wie Titel, Beschreibung, Fälligkeitsdatum und Status für Aufgaben sowie Name, Menge und Kategorie für Einkaufsitems. Anschliessend habe ich die vollständige CRUD-Funktionalität für beide Entitäten implementiert, mit Routen zum Erstellen neuer Einträge, Abrufen von Listen oder einzelnen Items, Aktualisieren bestehender Einträge und Löschen nicht mehr benötigter Daten. Die Endpunkte wurden erfolgreich getestet und funktionieren wie erwartet.

## 16.5

- [x] Implementieren eines einfachen Benutzer-Authentifizierungssystems (Registrierung, Login)
- [x] Entwicklung einer sicheren Passwort-Speicherung mit Hashing
- [ ] Implementieren von Browser-Benachrichtigungen
- [ ] Integration der Benachrichtigungen für fällige Aufgaben und wichtige Erinnerungen

✍️ Heute habe ich ein einfaches Benutzer-Authentifizierungssystem mit Flask implementiert. Ich habe Registrierungs- und Login-Funktionen erstellt. Dafür habe ich "Werkzeug" zum Hashen der Passwörter verwendet und sichergestellt, dass keine Klartextpasswörter in der Datenbank gespeichert werden. Die Benutzeroberfläche ist noch einfach gehalten, aber die Kernfunktionalität der Authentifizierung funktioniert mit Session-Management. Benachrichtigungen konnte ich heute zeitgemäss nicht implementieren.

## 23.5

- [x] Implementieren von Browser-Benachrichtigungen
- [x] Integration der Benachrichtigungen für fällige Aufgaben und wichtige Erinnerungen
- [ ] Evtl. Erstellen einer Profilseite für Benutzereinstellungen und Passwortänderung
- [x] Erstellung einer responsiven Benutzeroberfläche für alle Geräte

✍️ Heute habe ich die Browser-Benachrichtigungen erfolgreich implementiert und mit dem Aufgabenmanagement verbunden. Die Anwendung jetzt Echtzeit-Benachrichtigungen für fällige Aufgaben und wichtige Erinnerungen anzeigen. Die Integration erfolgt über einen Hintergrundprozess, der regelmässig (jede Stunde) nach Aufgaben sucht, deren Fälligkeitsdatum erreicht wurde. Zusätzlich habe ich die Benutzeroberfläche vollständig responsiv gestaltet, sodass das Tool sowohl auf Desktop-Computern als auch auf mobilen Geräten gut funktioniert. Die Basis-Funktionalität ist nun komplett und einsatzbereit.

## 6.6

Ihr Projekt sollte nun alle Funktionalität haben, dass man es benutzen kann. Allerdings gibt es sicher noch Teile, welche "schöner" werden können: Layout, Code, Architektur... beschreiben Sie kurz den Stand Ihres Projekts, und leiten Sie daraus 6 solche "kosmetischen" AP für den 6.6 und den 13.6 ab.

Mein Haushaltsorganisations-Tool hat nun alle wesentlichen Funktionen implementiert: Aufgabenmanagement, Einkaufsliste, Benutzerauthentifizierung und ein Benachrichtigungssystem. Die Grundfunktionalität ist komplett, aber das Nutzererlebnis kann noch verbessert werden.

- [x] Verbesserung des visuellen Designs (konsistente Farbschema und bessere Typografie)
- [x] Optimierung des Layouts (bessere Benutzerführung und intuitivere Navigation)
- [x] Hinzufügen von sanften Übergangsanimationen zwischen Ansichten und bei Statusänderungen
- [ ] Code-Refactoring

✍️ Heute habe ich das visuelle Design meines Haushaltsorganisations-Tools überarbeitet. Ein konsistentes Farbschema wurde implementiert, das verschiedene Funktionsbereiche klar voneinander abgrenzt. Das Layout wurde durch Neustrukturierung der Navigation und prominentere Platzierung wichtiger Funktionen verbessert. Alle Änderungen wurden mit CSS umgesetzt und sind vollständig responsiv.

## 13.6

- [ ] Hinzufügen von Dunkelmodus
- [x] Erstellen einer einfachen Profilseite für Benutzereinstellungen und Passwortänderung

✍️ Heute habe ich eine einfache Profilseite für Benutzereinstellungen implementiert. Benutzer können jetzt ihre Passwörter ändern, wobei das alte Passwort zur Verifikation abgefragt wird. Die Seite enthält grundlegende Benutzerinformationen und Einstellungsoptionen. Leider hatte ich heute keine Zeit mehr für die Implementierung des Dunkelmodus, da die Passwort-Änderungsfunktion mehr Zeit in Anspruch genommen hat als geplant. Die Profilseite ist jedoch vollständig funktional und responsiv gestaltet.

## 20.6

Was fehlt Ihrem fertigen Projekt noch, um es auszuliefern? Reicht die Zeit für ein *nice-to-have feature*?

- [ ] Dark Mode
- [x] Animations anpassen

Bereiten Sie in den verbleibenden 2 AP Ihre Präsentation vor

- [x] Materialien der Präsentation vorbereiten
- [x] Präsentation üben

✍️ Heute habe ich die Animationen angepasst. Dark Mode habe ich ausgelassen, da es zu aufwändig wäre mit den CSS root Farben. Ich konnte meine einfolige Präsentation fertigstellen. 

## 27.6

Ende
