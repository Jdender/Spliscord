




// UNTESTED YET; DO NOT USE WITHOUT TESTING FIRST








import { _, Monad } from '../hkts';
import { pipe } from 'rxjs';

// Type
export type IO<A> = { tag: 'IO'; value: () => A };

export type I<A> = IO<A>;

// Constructors
export const fromVal = <A>(v: A): IO<A> => ({ tag: 'IO', value: () => v });

export const fromFn = <A>(value: () => A): IO<A> => ({ tag: 'IO', value });

// Module
const IO = Monad<IO<_>>({
    of: fromVal,
    chain: (f, maybe) => fromFn(() => pipe(maybe.value, f) as any).value(),
});

// Export
const { ap, chain, join, map, of } = IO;

export { ap, chain, join, map, of };
