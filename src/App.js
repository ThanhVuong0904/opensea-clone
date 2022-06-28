import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import Default from '~/layouts/Default';
import { Fragment, useContext, useLayoutEffect } from 'react';
import { AuthenticateContext } from '~/contexts/AuthenticateContext';
import Login from './pages/Login';

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};
function App() {
    const { active } = useContext(AuthenticateContext);
    return (
        <Router>
            {/* <ScrollToTop /> */}
            <ScrollToTop>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = Default;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Default;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    active ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Layout>
                                            <Login />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </ScrollToTop>
        </Router>
    );
}

export default App;
