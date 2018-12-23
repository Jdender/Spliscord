import { _, Monad } from '../hkts';

// Type
export type Maybe<A> = { tag: 'none' } | { tag: 'some'; value: A };

export type I<A> = Maybe<A>;

// Constructors
export const none: Maybe<never> = { tag: 'none' };

export const some = <A>(value: A): Maybe<A> => ({ tag: 'some', value });

// Module
const Maybe = Monad<Maybe<_>>({
    of: some,
    chain: (f, maybe) => maybe.tag === 'none' ? none : f(maybe.value),
});

// Util
export const orElse = <A, R>(d: R, m: Maybe<A>) => m.tag === 'none' ? Maybe.of(d) : m;

export const nullToNone = <A>(m: Maybe<A>) => Maybe.chain(v => v == null ? none : some(v), m);

// Export
const { ap, chain, join, map, of } = Maybe;

export { ap, chain, join, map, of };
