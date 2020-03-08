import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
} from '../BaseCoreUi';

import navigation from './_nav';

import routes from '../../../../routes';

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));
const Aside = React.lazy(() => import('./Aside'));

export default class Layout extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense  fallback={this.loading()}>
                        <Header onLogout={e=>this.signOut(e)}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes} router={router}/>
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                // path={this.props.match.path+route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                     <Redirect to={{ pathname: this.props.match.path+'/dashboard', state: { from: this.props.location } }} />
                                     {/*<Redirect to={{ pathname: '/admin/dashboard', state: { from: this.props.location } }} />*/}
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <Suspense fallback={this.loading()}>
                            <Aside />
                        </Suspense>
                    </AppAside>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <Footer />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}
