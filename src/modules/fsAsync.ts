// Will move to Yatsul soontm.
import { readdir, stat } from 'fs';
import { promisify } from 'util';

export const readdirAsync = promisify(readdir);
export const statAsync = promisify(stat);