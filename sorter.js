// Grundlegendes Skript zur Ordnererstellung basierend auf Dateinamen

const fs = require('fs');
const path = require('path');

// Verzeichnis, in dem die Dateien gespeichert werden sollen
const baseDir = path.join(__dirname, 'Downloads');
const moduleMapping = {
    'M295': 'Modul 295',
    'M300': 'Modul 300'
};

// Funktion zur Erstellung fehlender Ordner
function ensureFolderExists(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

// Dateien analysieren und entsprechende Ordner erstellen
fs.readdir(baseDir, (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return;
    }

    files.forEach(file => {
        const moduleName = Object.keys(moduleMapping).find(key => file.includes(key));
        if (moduleName) {
            const targetFolder = path.join(baseDir, moduleMapping[moduleName]);
            ensureFolderExists(targetFolder);
            console.log(`Ordner "${moduleMapping[moduleName]}" überprüft/erstellt.`);
        }
    });
});

// Erweiterung des Skripts um Dateisortierung

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'Downloads');
const moduleMapping = {
    'M295': 'Modul 295',
    'M300': 'Modul 300'
};

function ensureFolderExists(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

// Dateien analysieren und in die richtigen Ordner verschieben
fs.readdir(baseDir, (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return;
    }

    files.forEach(file => {
        const moduleName = Object.keys(moduleMapping).find(key => file.includes(key));
        if (moduleName) {
            const targetFolder = path.join(baseDir, moduleMapping[moduleName]);
            ensureFolderExists(targetFolder);

            const oldPath = path.join(baseDir, file);
            const newPath = path.join(targetFolder, file);

            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(`Fehler beim Verschieben von ${file}:`, err);
                } else {
                    console.log(`Datei "${file}" nach "${moduleMapping[moduleName]}" verschoben.`);
                }
            });
        }
    });
});

// Hinzufügen eines einfachen UI (z.B. Konsolenausgabe zur Statusanzeige)

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'Downloads');
const moduleMapping = {
    'M295': 'Modul 295',
    'M300': 'Modul 300'
};

function ensureFolderExists(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

// Dateien analysieren und in die richtigen Ordner verschieben
fs.readdir(baseDir, (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return;
    }

    console.log('Starte Dateisortierung...');
    files.forEach(file => {
        const moduleName = Object.keys(moduleMapping).find(key => file.includes(key));
        if (moduleName) {
            const targetFolder = path.join(baseDir, moduleMapping[moduleName]);
            ensureFolderExists(targetFolder);

            const oldPath = path.join(baseDir, file);
            const newPath = path.join(targetFolder, file);

            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(`Fehler beim Verschieben von ${file}:`, err);
                } else {
                    console.log(`Datei "${file}" erfolgreich nach "${moduleMapping[moduleName]}" verschoben.`);
                }
            });
        }
    });
    console.log('Dateisortierung abgeschlossen.');
});

// Finales Skript mit verbesserten Funktionen und Kommentaren

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'Downloads');
const moduleMapping = {
    'M295': 'Modul 295',
    'M300': 'Modul 300',
    // Weitere Module hier hinzufügen
};

function ensureFolderExists(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

// Dateien analysieren und in die richtigen Ordner verschieben
fs.readdir(baseDir, (err, files) => {
    if (err) {
        console.error('Fehler beim Lesen des Verzeichnisses:', err);
        return;
    }

    console.log('Starte Dateisortierung...');
    files.forEach(file => {
        const moduleName = Object.keys(moduleMapping).find(key => file.includes(key));
        if (moduleName) {
            const targetFolder = path.join(baseDir, moduleMapping[moduleName]);
            ensureFolderExists(targetFolder);

            const oldPath = path.join(baseDir, file);
            const newPath = path.join(targetFolder, file);

            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(`Fehler beim Verschieben von ${file}:`, err);
                } else {
                    console.log(`Datei "${file}" erfolgreich nach "${moduleMapping[moduleName]}" verschoben.`);
                }
            });
        } else {
            console.log(`Keine passende Zuordnung für Datei "${file}" gefunden.`);
        }
    });
    console.log('Dateisortierung abgeschlossen.');
});
