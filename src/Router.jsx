class EntryPoint {
    constructor(descriptor, props, data, actions, routePatterns) {
        this.descriptor = descriptor;
        this.props = props;
        this.data = data;
        this.routePatterns = routePatterns;
        this.gotData = new Promise(resolve => this._resolveGotData = resolve);
    }

    _execute(controller, itemFuncs) {
        if(itemFuncs) {
            if(!R.isArrayLike(itemFuncs)) {
                itemFuncs = [itemFuncs];
            }

            return Promise.all(itemFuncs.map(func => func(controller, this.props)));
        }
        else {
            return Promise.resolve([]);
        }
    }

    /** @return Array<Promise> */
    fetchData(controller) {
        const promise = this._execute(controller, this.data);
        promise.then(this._resolveGotData);
        return promise;
    }
}

export default class Router {
    constructor(routes, defaultUrl) {
        this.routes = routes;
        this.defaultUrl = defaultUrl;
    }

    getEntryPoint(rawPath) {
        const [path, queryString] = util.splitQuery(rawPath);
        const queryObj = util.parseQueryWithCompression(queryString);

        let entryPoint = this._find(path);
        if(!entryPoint) {
            console.error(`Can't find an appropraite route for ${hostname} and ${rawPath}, trying default route ${this.defaultUrl}`);
            entryPoint = this._find(this.defaultUrl);
        }

        // append queryString, even if it is empty; this way, code like `if(props.queryString.something)` will never throw.
        entryPoint.props.queryString = queryObj;

        return entryPoint;
    }

    _find(path) {
        for(let route of this.routes) {
            const match = path.match(route.regex);

            if(match !== null) {
                // get all argument strings (= all capture groups except group 0, because that is the entire path)
                const argList = match.slice(1);

                // build object like { userId: ..., showEverything: "yes" }
                let args = R.zipObj(route.keyNames, argList);

                // append any default arguments baked into the route (auxProps don't overwrite route args)
                args = R.merge(route.auxProps, args);

                return new EntryPoint(route.descriptor, args, route.data, route.pattern);
            }
        }
    }
}