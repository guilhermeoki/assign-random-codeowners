"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCodeowners", {
    enumerable: true,
    get: ()=>getCodeowners
});
const _core = require("@actions/core");
const _fs = require("fs");
const _codeownersUtils = require("codeowners-utils");
const validCodeownersPaths = [
    'CODEOWNERS',
    '.github/CODEOWNERS',
    'docs/CODEOWNERS'
];
const stringify = (input)=>JSON.stringify(input);
const getCodeowners = async ()=>{
    const codeownersLocation = findCodeownersLocation();
    const codeownersContents = await _fs.promises.readFile(codeownersLocation, {
        encoding: 'utf-8'
    });
    const codeowners = (0, _codeownersUtils.parse)(codeownersContents);
    (0, _core.info)('Parsed CODEOWNERS:');
    (0, _core.info)(stringify(codeowners));
    return codeowners;
};
const findCodeownersLocation = ()=>{
    const codeownersLocation = validCodeownersPaths.find((path)=>(0, _fs.existsSync)(path));
    if (!codeownersLocation) {
        (0, _core.error)(`Did not find a CODEOWNERS file in: ${stringify(validCodeownersPaths)}.`);
        process.exit(1);
    }
    (0, _core.info)(`Found CODEOWNERS at ${codeownersLocation}`);
    return codeownersLocation;
};
