import config from '~/config';

// Layouts
import HeaderOnly from '~/layouts/HeaderOnly';

// Pages
import Home from '~/pages/Home';
import Explore from '~/pages/Explore';
import Stats from '~/pages/Stats';
import Create from '~/pages/Create';
import Resources from '~/pages/Resources';
import Login from '~/pages/Login';
import Account from '~/pages/Account';
import Detail from '~/pages/Detail';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.stats, component: Stats },
    { path: config.routes.resources, component: Resources },
    { path: config.routes.login, component: Login },
    { path: config.routes.detail, component: Detail },
];

const privateRoutes = [
    { path: config.routes.create, component: Create, layout: HeaderOnly },
    { path: config.routes.account, component: Account, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
