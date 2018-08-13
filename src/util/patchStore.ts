import { Store } from 'klasa';
import fs = require('fs-nextra');
import { extname, relative, sep, join } from 'path';

// Files that can be required
const extensions = Object
.keys(require.extensions)
.filter(key => !['.json', '.node'].includes(key));
            
// Make sure file is a file and can be required
const filter = (stats: any, path: string) => 
    stats.isFile() && 
    extensions.includes(extname(path));

// Monkeypatch klasa Store
(Store as any).walk = async (store: any, dir = store.userDirectory) => {

    const files = await fs.scan(dir, { filter })
    .catch(() => {}); // Ignore errors

    if (!files) return true;

    const load = Array
    .from(files.keys())
    .map(file => 
        store.load(
            dir,
            relative(dir, file).split(sep),
        ),
    );

    return Promise.all(load);
};
