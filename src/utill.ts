export default null;

declare global {

    interface Array<T> {
        equals(array: any[]): boolean;
    }
}

// From https://stackoverflow.com/a/14853974
Array.prototype.equals = function(array: any[]) {

    if (!array)
        return false;

    if (this.length !== array.length)
        return false;

    for (let i = 0; i < this.length; i++)
        if (this[i] !== array[i])
            return false;

    return true;
};
