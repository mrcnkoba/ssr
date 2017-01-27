export default class App {
    constructor() {
        this.router = new Router();
    }

    locationChanged(path) {
        const viewDescriptor = router.getEntryPoint();
        viewDescriptor.fetchData();
    }
}