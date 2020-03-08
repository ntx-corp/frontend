import Master from "./components/Master";
import User from "./components/Master/User";
import Item from "./components/Master/Item";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import UserDetail from "./components/Master/User/UserDetail";

// const Dashboard  = React.lazy(()=>import('./components/Dashboard/Dashboard'))
// const Auth = React.lazy(()=>import('./components/Auth/Auth'));
// const User = React.lazy(()=>import('./components/Admin/User/index'));
// const Item = React.lazy(()=>import('./components/Admin/Item/index'));

const routes = [

    { path:'/', exact:true, name:'Home'},
    { path: '/auth', exact: true, name: 'Auth', component: Auth},

    { path: '/admin', exact:true, name:'Admin'},

    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

    { path: '/admin/master', exact: true, name: 'Master', component: Master },

    { path: '/admin/master/user', exact: true, name: 'User', component: User },
    { path: '/admin/master/user/create',exact: true, name: 'Create', component: UserDetail },
    { path: '/admin/master/user/:id',name: 'Detail', component: UserDetail },

    { path: '/admin/master/item', exact: true, name: 'Item', component: Item },
]
export default routes;
