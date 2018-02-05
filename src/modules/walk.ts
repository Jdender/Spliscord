import { readdir, stat } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

export const walk = async d => (await statAsync(d)).isDirectory() ? await Promise.all((await readdirAsync(d)).map(async f => await walk(join(d, f)))) : d;

export default walk;