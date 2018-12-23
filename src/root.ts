import { Maybe } from './functional';
import { pipe } from 'rxjs';

const t = pipe(
    _ => Maybe.of(1),
    _ => Maybe.map(x => x + 1, _),
    _ => Maybe.map(x => null, _),
    _ => Maybe.nullToNone(_),
    _ => Maybe.orElse('wew', _),
);

console.log(t(1));
