// Will move to Yatsul soontm.
import { join } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';

export const readdirAsync = promisify(readdir);
export const statAsync = promisify(stat);

export type Constructor < T > = new(...args: any[]) => T;

export const walk = async (dir: string): Promise<any> => (await statAsync(dir)).isDirectory() ? await Promise.all((await readdirAsync(dir)).map(async file => await walk(join(dir, file)))) : dir;

export const pipe = (...funcs: Function[]) => funcs.reduce((f1, f2) => (...args: any[]) => f2(f1(...args)));