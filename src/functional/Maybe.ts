interface Maybe<T> {
    flatten(): T | null | undefined;
    isNothing(): boolean;
    map<R>(f: (val: T) => R): Maybe<R>;
    orElse<R>(orElse: R): Maybe<T> | Maybe<R>;
}

const isNullOrUndefined = (value: any) => (value === null || value === undefined);

export const Maybe = 
<T>(value: T, isNothing = isNullOrUndefined): Maybe<T> => ({

    flatten: () => value,

    isNothing: () => isNothing(value),

    map: f => 
        isNothing(value)
        ? Maybe(null) as any
        : Maybe(f(value)),

    orElse: orElse => 
        isNothing(value)
        ? Maybe(orElse)
        : Maybe(value),
});
