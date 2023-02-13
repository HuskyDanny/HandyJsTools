const fs = require('fs');
const path = require('path');

function deserialize(outputString, rootFolder) {

    // Split the output string into an array of file entries
    const fileEntries = outputString.split("breakPointbreakPointbreakPointbreakPointbreakPointbreakPointbreakPoint");

    // Iterate over each file entry
    fileEntries.forEach((fileEntry) => {
        if (fileEntry) {
            // Split the file entry into a file name and file content
            const [fileName, fileContent] = fileEntry.split('::');

            if (fileName && fileContent) {
                // Generate the file path by joining the root folder and the file name
                const filePath = path.join(rootFolder, fileName.replace(/(\r\n|\n|\r)/gm, ""));

                // Create the necessary directories for the file path
                fs.mkdirSync(path.dirname(filePath), { recursive: true });

                //Remove trailing whitespace
                const cleanedContent = fileContent.replace(/\s+$/, "");

                // Write the cleaned file content to the file path
                fs.writeFileSync(filePath.trim(), `${cleanedContent}`);
            }
        }
    });
}

const folderName = "AggExperimentSnapshot_Cerberus2";

const fileContent = fs.readFileSync(`${process.cwd()}/chatGPTFunctions/txtfile.txt`, 'utf-8');

deserialize(`${fileContent}`, `C:/Users/allenpan/source/repos/playAroundRepos/javascriptTryout/chatGPTFunctions/${folderName}`)