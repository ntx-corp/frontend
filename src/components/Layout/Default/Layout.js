import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import routes from '../../../routes';

const Footer = React.lazy(()=>import('./Footer'));
const Header = React.lazy(()=>import('./Header'));

class Layout extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="app">
                <Header>

                </Header>
                <div className="app-body">
                    <main className="main">
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/dashboard" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <Footer>

                </Footer>
            </div>
        );
    }
}
export default Layout;
