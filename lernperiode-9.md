# Fertiges Projekt: Discord Economy Bot

## Projektbeschreibung
Der Discord Economy Bot ist ein vielseitiger Bot für Discord-Server, der ein virtuelles Währungssystem implementiert. Benutzer können Geld verdienen, sparen, ausgeben und durch verschiedene Aktivitäten und Minispiele interagieren. Der Bot wurde in Python mit der discord.py-Bibliothek entwickelt und bietet eine modulare Struktur, die leicht erweiterbar ist.

## Hauptfunktionen

### Wirtschaftssystem
- **Währungsverwaltung**: Benutzer können ihren Kontostand überprüfen (`-balance`), Geld von ihrer Wallet auf ihr Bankkonto einzahlen (`-deposit`) oder abheben (`-withdraw`)
- **Tägliche Belohnungen**: Benutzer können regelmäßig Geld verdienen durch den `-beg`-Befehl mit einem 24-Stunden-Cooldown

### Job-System
- **Jobmarkt**: Verfügbare Jobs können durchsucht werden (`-jobs`)
- **Job-Management**: Benutzer können Jobs kaufen (`-buyjob`), entfernen (`-removejob`) und ihre aktuellen Jobs anzeigen (`-myjobs`)
- **Arbeitssimulation**: Mit dem `-work`-Befehl können Benutzer ihre Jobs ausführen und Geld verdienen

### Glücksspiel
- **Gambling**: Benutzer können mit ihren Münzen spielen (`-gamble`) und versuchen, ihren Kontostand zu erhöhen

### Level-System
- **Fortschritts-Tracking**: Benutzer erhalten für ihre Aktivitäten Erfahrungspunkte
- **Levelaufstiege**: Mit steigendem Level werden neue Funktionen und Boni freigeschaltet

### Admin-Funktionen
- **Serveradministration**: Serveradmins können Bot-Einstellungen anpassen und die Wirtschaft überwachen

### Sonstiges
- **Fun-Befehle**: Verschiedene Unterhaltungsbefehle (`-david`, `-geschichte`, etc.)
- **Informationen**: Bot-Informationen und Hilfe können mit `-info` und `-help` abgerufen werden

## Technische Umsetzung
Der Bot ist in einer modularen Struktur mit verschiedenen "Cogs" organisiert:
- **EconomyCog**: Basiswirtschaftsfunktionen
- **JobMarketCog**: Job-bezogene Befehle und Funktionalität
- **GamblingCog**: Glücksspielfunktionen
- **LevelsCog**: Level-System und Fortschritt
- **AdminCog**: Administrative Befehle
- **OtherCog**: Unterhaltungs- und sonstige Funktionen
- **LastFMCog**: Integration mit Last.fm-Diensten

Alle Bot-Antworten wurden mit ansprechenden Discord-Embeds gestaltet, die die Benutzeroberfläche verbessern.

## Datenmanagement
Benutzerdaten werden in einer JSON-Datenbank gespeichert, die Folgendes für jeden Benutzer verwaltet:
- Wallet- und Bankguthaben
- Inventar und gekaufte Items
- Aktuelle Jobs
- Level und Erfahrungspunkte
- Cooldown-Zeiten für verschiedene Aktivitäten

## Team und Zusammenarbeit
Dieses Projekt wurde in Zusammenarbeit mit Florian Ruby und David Koteski entwickelt. Die gemeinsame Arbeit hat es ermöglicht, einen funktionsreichen Bot zu erstellen, der verschiedene Wirtschafts- und Unterhaltungsaspekte kombiniert.

## Zukunftspläne
Der Bot kann in Zukunft erweitert werden mit:
- Mehr Minispielen und Verdienstmöglichkeiten
- Einem Shop-System mit mehr Items
- Server-spezifischen Einstellungen
- Weiteren Benutzerstatistiken
- Verbesserter Benutzerinteraktion

## Links
- GitHub Repository: [IM23d/discord-balance-bot](https://github.com/IM23d/discord-balance-bot)


# Lern-Periode 9

21.2 bis 4.4

## Grob-Planung

1. Welche Projekte haben Sie bereits auf Ihrem github, welche Sie verlinken könnten?
   Meine "Milan's Lens" Website aus dem Modul 293, die Repository Lernatelier_2023-2024 mit einen grösseren (C# Kalender) und zwei kleineren Projekten (Taschenrechner, VALORANT Agent picker) und evtl. meine Website bettercallmilan.github.io (wird in diesem Modul neugemacht).
   
2. Wie sieht Ihr *skill portfolio* aus? Was können Sie bereits, und was wäre etwas, das Sie lernen möchten?
   Kann: C#, HTML/CSS, JS, Docker, Web API (ASP.NET), MSSQL, OOP (C#), Testen.
   Lernen: Python, C++ 
   
3. Was wäre ein gutes Projekt für die zweite Hälfte dieser Lern-Periode?
   Ein grösseres Vorzeige-Projekt, evtl. etwas mit Frontend + Backend (mit SQL, Login; C# + HTML/CSS). Edit bzw. Idee: Discord Economy Bot (Zusammenarbeit mit Florian Ruby und David Koteski)

## 21.2

- [x] Ein Grundgerüst für meine Startseite erstellen. Dieses sollte einen Abholer-Satz und Kontaktinformationen beeinhalten, auf meinen CV verlinken, und einige Projekte in den Vordergrund stellen.
  
  - [x] Ein ansprechendes Layout für die Startseite auf Papier entworfen, zusammen mit einem "Abholer-Satz", der die Aufmerksamkeit des Praktikumsgebers *in spe* auf sich zieht.
  - [x] Dieses Layout auf rudimentäre Weise mit HTML und CSS umsetzen

- [x] Online-Präsenz: Wenn der Arbeitgeber *in spe* meinen Namen auf einer Suchmaschine eingibt, sollen vor allem seriöse Informationen erscheinen, wenn überhaupt. 

- [x] Referenz-Schreiben ausfüllen:
  
  - [x] Einige Kern-Eigenschaften aufschreiben, die mich ausmachen.
  - [x] Evidenz für diese Eigenschaften finden und ausformulieren
  - [x] Rechtschreibeprüfung

✍️ Heute habe ich ein Grundgerüst für meine Startseite erstellt, den Layout auf Papier entworfen und dann in HTML/CSS umgesetzt. Bei Online-Präsenz fand ich keine Resultate zu mir. Referenz-Schreiben konnte ich auch ausfüllen.

## 28.2

- [x] Projekte verlinken (Website)
- [x] LinkedIn-Profil erstellen / ausputzen
- [x] GitHub-Profil professionalisieren (`readme.md`)
- [x] Start-Seite: Was ist das dringendste AP?

✍️ Heute habe ich meine Projekte in der Website verlinkt, mein LinkedIn Profil erstellt und vervollständigt (dazu mit ein paar Leuten verbunden) und mein GitHub Profil verbessert.

## 7.3

- [x] CV-Seite erstellen
- [x] Projektseite fertigstellen
- [x] Code/Website aufputzen
- [x] Rückmeldung geben

✍️ Heute habe ich meine Startseite fertiggestellt. Dazu konnte ich auch noch mein GitHub README.md-File verbessern. Nach dem Code aufputzen von der Website, machte ich den Rückmeldung-Teil indem ich 3 Personen aus meiner Klasse Feedback zu Website, LinkedIn Profil und GitHub Profil gab.

## 14.3

- [x] Projektplanung erstellen
- [x] Anforderungen dokumentieren
- [x] Discord Bot registrieren
- [x] Grundstruktur aufbauen

✍️ Heute habe ich die Grundlagen für meinen Discord Economy Bot geschaffen. Ich habe die Projektplanung erstellt, alle Anforderungen dokumentiert, den Bot im Discord Portal registriert und die Grundstruktur aufgebaut. Nun kann ich mit der Implementierung der eigentlichen Wirtschaftsfunktionen beginnen.

## 21.3

- [x] Datenbank einrichten
- [x] Währungssystem programmieren
- [x] Befehlsstruktur implementieren
- [x] Benutzerprofile erstellen

✍️ Heute habe ich die Struktur unseres Discord Economy Bots deutlich verbessert. Ich habe eine Datenbank für Benutzerkonten eingerichtet (json), das Währungssystem mit Wallet und Bank programmiert, eine modulare Befehlsstruktur mit Cogs implementiert und die Grundlage für Benutzerprofile geschaffen. Der Bot ist jetzt viel organisierter und leichter erweiterbar.

## 28.3

- [x] Shop-System entwickeln
- [x] Tägliche Belohnungen einführen
- [x] Embed integrieren in alle repsonses
- [x] Inventarsystem erstellen

✍️ Heute habe ich das Shop-System für meinen Discord Bot entwickelt, sodass Benutzer Items kaufen können. Zusätzlich implementierte ich tägliche Belohnungen, um Benutzer zu motivieren. Alle Bot-Antworten wurden mit Embeds aufgewertet, um die Benutzeroberfläche ansprechender zu gestalten. Parallel dazu erstellte ich ein Inventarsystem, das es Nutzern ermöglicht, gesammelte Items zu verwalten.

## 4.4

- [x] Administratorrechte definieren
- [x] Levelup-Mechanismus implementieren
- [x] Code aufputzen
- [x] Repositories verlinken (Vorzeige-Projekt/Discord Bot hier vorzeigen)

✍️ Heute habe ich Administratorrechte für den Discord Bot definiert, damit Serveradmins Einstellungen anpassen können. Ausserdem entwickelte ich mehrere Minispiele, mit denen Nutzer Münzen verdienen können. Zuletzt implementierte ich mit Florian einen Levelup-Mechanismus, der Aktivität belohnt und zusätzliche Funktionen freischaltet.
