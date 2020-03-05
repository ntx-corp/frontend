import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import routes from '../../../../routes';
const Footer = React.lazy(()=>import('./Footer'));
const Header = React.lazy(()=>import('./Header'));
const Sitebar = React.lazy(()=>import('./Sitebar'));

export default class Layout extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sitebar/>
                    <main className="main">
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={this.props.match.path+route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                children={route.children}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}
