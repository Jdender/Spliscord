// Will move to Yatsul soontm.
import { pipe } from './oneline';
import { expect } from 'chai';
import 'mocha';

describe('pipe function', () => {
    it('should pipe these three functions', () => {
        const inc = i => i + 1;
        const dub = i => i * 2;
        const squ = i => i * i;

        const func = pipe(
            inc,
            dub,
            squ
        );

        const value = func(1);

        expect(value).to.equal(16);
    });
});