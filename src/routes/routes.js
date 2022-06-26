import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Explore from '~/pages/Explore';
import Stats from '~/pages/Stats';
import Create from '~/pages/Create';
import Resources from '~/pages/Resources';
import Login from '~/pages/Login';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.stats, component: Stats },
    { path: config.routes.create, component: Create },
    { path: config.routes.resources, component: Resources },
    { path: config.routes.login, component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
