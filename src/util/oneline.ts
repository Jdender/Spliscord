// Will move to Yatsul soontm.
import { readdirAsync, statAsync } from './fsAsync';
import { join } from 'path';

export const walk = async (dir: string) => (await statAsync(dir)).isDirectory() ? await Promise.all((await readdirAsync(dir)).map(async file => await walk(join(dir, file)))) : dir;

export const pipe = (...funcs: Function[]) => funcs.reduce((f1, f2) => (...args) => f2(f1(...args)));