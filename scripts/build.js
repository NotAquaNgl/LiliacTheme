const fs = require('fs');
const path = require('path');

const buildFile = path.join(__dirname, '..', '/build/midnight.css');
const srcDir = path.join(__dirname, '..', '/src');

const themeHeader = `/**
 * @name Midnight Lillac
 * @description Dark theme with lillac accents and custom animations
 * @author refact0r, Cerbi
 * @version 3.0.7
 * @invite nz87hXyvcy
 * @website https://github.com/refact0r/midnight-discord
 * @source https://github.com/refact0r/midnight-discord
 * @authorId 508863359777505290
*/

`;

function combineSourceFiles() {
    let combinedCSS = themeHeader;

    const allFiles = fs
        .readdirSync(srcDir)
        .filter((file) => file.endsWith('.css'))
        .map((file) => path.join(srcDir, file));

    const mainFile = allFiles.find((file) => path.basename(file) === 'main.css');
    const otherFiles = allFiles.filter((file) => path.basename(file) !== 'main.css');

    if (mainFile) {
        combinedCSS += fs.readFileSync(mainFile, 'utf8') + '\n';
    }

    otherFiles.forEach((file) => {
        combinedCSS += fs.readFileSync(file, 'utf8') + '\n';
    });

    const buildDir = path.dirname(buildFile);
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }

    fs.writeFileSync(buildFile, combinedCSS);
    console.log('done');
}

combineSourceFiles();
