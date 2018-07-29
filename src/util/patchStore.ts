import { Store } from 'klasa';
import fs = require('fs-nextra');
import { extname, relative, sep } from 'path';

// Files that can be required
const extensions = Object.keys(require.extensions).filter(key => key !== '.json' && key !== '.node');
            
// Make sure file is a file and can be required
const filter = (stats: any, path: string) => stats.isFile() && extensions.includes(extname(path));

// Monkeypatch klasa Store
(Store as any).walk = async (store: any, core: boolean) => {

    const dir = core ? store.coreDir : store.userDir;
            
    const files = await fs.scan(dir, { filter })
    .catch(() => {}); // Ignore errors
             
    if (!files) return true;

    const load = [...files.keys()]
    .map(file => store.load(
            relative(dir, file).split(sep), core,
        ),
    );
     
    return Promise.all(load);
};
