const handlePatch = require('./handlePatch');

const [, , ...files] = process.argv;

handlePatch(files);
