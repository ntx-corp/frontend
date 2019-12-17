import React from 'react';

// const Dashboard  = React.lazy(()=>import('./components/Dashboard/Dashboard'))
const Auth = React.lazy(()=>import('./components/Auth/Auth'));
const User = React.lazy(()=>import('./components/User/index'));
const Item = React.lazy(()=>import('./components/Item/index'));

const routes = [
    { path:'/', exact:true, name:'Home'},
    { path: '/auth', exact: true, name: 'Auth', component: Auth },
    { path: '/user', exact: true, name: 'User', component: User },
    { path: '/item', exact: true, name: 'Item', component: Item },
]

export default routes;
