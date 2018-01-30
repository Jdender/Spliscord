const fs = require('fs');
const nodeutil = require('util');
const path = require('path');

fs.readdir = nodeutil.promisify(fs.readdir);
fs.stat = nodeutil.promisify(fs.stat);

const walk = async d => (await fs.stat(d)).isDirectory() ? await Promise.all((await fs.readdir(d)).map(async f => await walk(path.join(d, f)))) : d;

module.exports = {
    walk
};