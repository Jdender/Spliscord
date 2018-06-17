import { Argument, Possible, KlasaMessage } from 'klasa';
import tinycolor = require('tinycolor2');


export default class extends Argument {

    run(arg: string) {

        const color = tinycolor(arg);

        if (!color.isValid())
            throw 'Tinycolor was unable to recognize that color.';

        return color.toHexString();
    }
}
