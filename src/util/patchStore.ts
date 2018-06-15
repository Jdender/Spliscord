import { Store } from 'klasa';
import fs = require('fs-nextra');
import { extname, relative, sep } from 'path';


(Store as any).walk = async (store: any, core: boolean) => {

    const dir = core ? store.coreDir : store.userDir;
                    
    const extensions = Object.keys(require.extensions).filter(key => key !== '.json' && key !== '.node');
            
    const filter = (stats: any, path: string) => stats.isFile() && extensions.includes(extname(path));

    const files = await fs.scan(dir, { filter })
    .catch(() => 
        fs.ensureDir(dir)
        .catch(err => store.client.emit('error', err))
    );
             
    if (!files) return true;

    const load = [...files.keys()]
    .map(file => store.load(
            relative(dir, file).split(sep), core,
        ),
    );
     
    return Promise.all(load);
};
