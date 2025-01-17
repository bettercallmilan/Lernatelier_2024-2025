const fs = require('fs');
const path = require('path');

// Verzeichnis, in dem die Dateien gespeichert werden sollen
const baseDir = path.join(__dirname, 'Downloads');
const moduleMapping = {
    'M295': 'Modul 295',
    'M300': 'Modul 300'
};

// Erstellung fehlender Ordner
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
