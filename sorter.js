const fs = require('fs');
const path = require('path');

const config = {
    // Quellverzeichnis
    sourceDir: './downloads',
    
    // Dateierweiterungen
    allowedExtensions: ['.ppt', '.zip', '.docx', '.xlsx'],
    
    // Modul-Mapping
    modules: {
        '295': 'M295',
        '300': 'M300',
        '322': 'M322',
        '450': 'M450'
    }
};

// Analysiert Dateinamen
function analyzeFileName(fileName) {
    const parts = fileName.split('_');
    const extension = path.extname(fileName);
    
    return {
        isLA: parts[0] === 'LA',
        moduleNumber: parts[1],
        taskNumber: parts[2],
        extension: extension,
        isValidExtension: config.allowedExtensions.includes(extension)
    };
}

// Erstellt  Ordner, falls er nicht existiert
function createFolderIfNotExists(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Ordner erstellt: ${folderPath}`);
    }
}

// Dateiesortiertung
function sortFiles() {
    // Überprüfen ob Quellverzeichnis existiert
    if (!fs.existsSync(config.sourceDir)) {
        console.error(`Quellverzeichnis ${config.sourceDir} existiert nicht!`);
        return;
    }

    // Alle Dateien im Quellverzeichnis lesen
    const files = fs.readdirSync(config.sourceDir);

    files.forEach(file => {
        const fileInfo = analyzeFileName(file);
        
        // Überprüfen ob LA Datei
        if (fileInfo.isLA && fileInfo.isValidExtension) {
            const moduleFolder = config.modules[fileInfo.moduleNumber];
            
            if (moduleFolder) {
                // Zielpfad und Quellpfad
                const targetFolder = path.join(config.sourceDir, moduleFolder);
                const sourcePath = path.join(config.sourceDir, file);
                const targetPath = path.join(targetFolder, file);
                
                try {
                    // Modulordner erstellen
                    createFolderIfNotExists(targetFolder);
                    
                    // Dateiverschiebung
                    fs.renameSync(sourcePath, targetPath);
                    console.log(`Datei verschoben: ${file} -> ${moduleFolder}`);
                } catch (error) {
                    console.error(`Fehler beim Verschieben von ${file}:`, error);
                }
            } else {
                console.warn(`Unbekanntes Modul in Datei: ${file}`);
            }
        } else if (!fileInfo.isLA) {
            console.log(`Keine LA-Datei: ${file}`);
        } else if (!fileInfo.isValidExtension) {
            console.log(`Ungültige Dateierweiterung: ${file}`);
        }
    });
}
// Überwachung
function watchDirectory() {
    console.log(`Überwache Verzeichnis: ${config.sourceDir}`);
    
    fs.watch(config.sourceDir, (eventType, filename) => {
        if (eventType === 'rename' && filename) {
            console.log(`Neue Datei erkannt: ${filename}`);
            sortFiles();
        }
    });
}

// Start
console.log('Starte Dateisortierung...');
createFolderIfNotExists(config.sourceDir);
sortFiles();
watchDirectory();