
/// Turn e.g. "a.b.c" into "a\.b\.c". for use in regexes. 
/// stolen from http://stackoverflow.com/a/494122
function regexQuote(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}

/**
 * turns e.g. "/user/:userId/list/:listId" into [regex, keyNames] where
 *   regex    = a regex like ^/user/([^/]+)/list/([^/]+)/?$,
 *   keyNames = an array like ["userId", "listId"]
 */
function toRegex(pattern) {
    var parts = pattern.split("/");  

    // turn parts into a regex pattern
    var regex = parts
        .map(part =>  (part.length === 0)
                    ? ""
                    : (part[0] === ":") 
                    ? "([^\\/]+)"
                    : regexQuote(part))     // non-capturing group, explicitly match the url
        .join("\\/");

    var regExpObj = new RegExp("^" + regex + "\\/?$");
    var keyNames = parts
        .filter(part => part[0] === ":")
        .map(part => part.substr(1));

    return [regExpObj, keyNames];
}

export default class Route {
    constructor(pattern, {view, data, auxProps, redirect}) {
        assert.is(pattern, String);
        assert.optional(auxProps, Object);

        this.pattern = pattern;
        this.auxProps = auxProps || {};
        this.descriptor = view;
        this.data = data;

        var [regex, keyNames] = toRegex(pattern);
        this.regex = regex;
        this.keyNames = keyNames;
    }
}