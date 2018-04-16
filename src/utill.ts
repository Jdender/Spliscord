export default null;

declare global {

    interface String {
        multiSearch(pattern: RegExp): RegExpExecArray[];
    }

    interface Array<T> {
        equals(array: any[]): boolean;
    }
}

String.prototype.multiSearch = function(pattern: RegExp) {
    return this
    .match(pattern)!
    .map(match => pattern.exec(match)!);
};

// From https://stackoverflow.com/a/14853974
Array.prototype.equals = function(array: any[]) {

    if (!array)
        return false;

    if (this.length !== array.length)
        return false;

    for (let i = 0, l = this.length; i < l; i++)
        if (this[i] instanceof Array && array[i] instanceof Array)
            if (!this[i].equals(array[i]))
                return false;
        else if (this[i] !== array[i])
            return false;

    return true;
};
