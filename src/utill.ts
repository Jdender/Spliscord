export default null;

declare global {
    interface String {
        multiSearch(pattern: RegExp): RegExpExecArray[];
    }
}

String.prototype.multiSearch = function(pattern: RegExp) {
    return this
        .match(pattern)!
        .map(match => pattern.exec(match)!);
};
