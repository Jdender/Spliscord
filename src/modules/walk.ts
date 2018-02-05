// Will move to Yatsul soontm.
import { readdirAsync, statAsync } from './fsAsync';
import { join } from 'path';


export const walk = async d => (await statAsync(d)).isDirectory() ? await Promise.all((await readdirAsync(d)).map(async f => await walk(join(d, f)))) : d;

export default walk;