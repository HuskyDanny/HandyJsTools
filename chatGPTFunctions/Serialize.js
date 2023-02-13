const fs = require('fs');

function readFilesRecursively(folderPath, pathString) {

    // Initialize an empty output string
    let outputString = '';

    // Use the `fs.readdirSync` method to get all the file names in the folder
    const fileNames = fs.readdirSync(folderPath);

    // Iterate over each file name
    fileNames.forEach((fileName) => {
        // Use the `fs.statSync` method to get information about the file
        const fileStat = fs.statSync(`${folderPath}/${fileName}`);
        fileName = fileName.trim();
        //get file extension
        let extension = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) || fileName).toLowerCase();
        if (extension !== 'script') {
            if (fileStat.isFile()) {
                // If the file is a regular file, read its contents
                const fileContent = fs.readFileSync(`${folderPath}/${fileName}`, 'utf-8');
                outputString += `${pathString}/${fileName} :: ${fileContent.split('\n').join('\n')}\n`;
                outputString += "breakPointbreakPointbreakPointbreakPointbreakPointbreakPointbreakPoint".concat('\n');
            } else if (fileStat.isDirectory()) {
                // If the file is a directory, recursively call the function on that directory
                const subfolderOutput = readFilesRecursively(`${folderPath}/${fileName}`, `${pathString}/${fileName}`);
                outputString += subfolderOutput;
            }
        }
    });

    // Return the final output string
    return outputString;
}

const outputString = readFilesRecursively("C:/Users/allenpan/source/repos/HubODSP/sources/dev/OdspDataHub/OdspDataSpoProd/Experiment/ADW/SRMDetection_Cerberus/MergeAndCopy", "")

console.log(outputString);

fs.writeFileSync(`${process.cwd()}/chatGPTFunctions/txtfile.txt`, `${outputString}\n`);