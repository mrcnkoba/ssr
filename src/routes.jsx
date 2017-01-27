import Route from "./Route";
import Posts from "./Posts";

import { loadMe } from "./dataLoaders";

const routes = [
  new Route("posts/:meId", {
    view: Posts,
    data: [loadMe]
  })
];

export default routes;
