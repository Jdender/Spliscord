interface Maybe<T> {
    flatten(): T;
    isNothing(): boolean;
    map<R>(f: (val: T) => R): Maybe<R>;
    mapElse<R>(orElse: R): Maybe<T> | Maybe<R>;
}

const isNullOrUndefined = (value: any) => (value === null || value === undefined);

export const Maybe = {

    of: <T>(val: T) => Maybe.create(val),

    create: <T>(value: T, isNothing = isNullOrUndefined): Maybe<T> => ({

            flatten() {
                return value;
            },
        
            isNothing() {
                return isNothing(value);
            },
        
            map<R>(f: (val: T) => R): Maybe<R> {
                return this.isNothing()
                ? Maybe.of(null) as any
                : Maybe.of(f(value));
            },
        
            mapElse<R>(orElse: R) {
                return this.isNothing()
                ? Maybe.of(orElse)
                : this;
            },
    }),
};
