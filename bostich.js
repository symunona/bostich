'use strict'

const fs = require('fs')

/**
 * Jolitron's parser is pretty awesome, but I found it slow, so I created 
 * a wrapper to export the file in JSON format and use the native JSON parser
 * if we did parse the input data once already. This makes it lightspeed.
 * @param {String} inputFilePath - source of the inpuit file
 * @param {Jolicitron} parser - constructed parser to feed the raw file data with and creates a JSON object
 * @param {Boolean} [forceParse] - to re-parse even if cache exists
 */
module.exports = function (inputFilePath, parser, forceParse) {
    let fileNameWithoutExtension = inputFilePath.indexOf('.') > -1 ?
            inputFilePath.substr(0, inputFilePath.lastIndexOf('.') - 1) : inputFilePath,
        cacheFileName = fileNameWithoutExtension + '.cache.json',
        data,
        parsingStart = new Date()
    try {
        if (forceParse === true) {
            throw new Error('Just go an parse...')
        }
        data = JSON.parse(fs.readFileSync(cacheFileName, 'utf8'))
        console.log('Loaded from cache in ', (new Date() - parsingStart) / 1000)
    } catch (e) {        
        console.log('Reading and parsing...')
        let fileContent = fs.readFileSync(inputFilePath, 'utf8')
        data = parser(fileContent)
        console.log(`Saving cache file ${cacheFileName}`)
        fs.writeFileSync(cacheFileName, JSON.stringify(data, null, 2), 'utf8')
        console.log('Parsed in', (new Date() - parsingStart) / 1000)
    }

    return data
}
