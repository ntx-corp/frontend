import Master from "./components/Master";
import User from "./components/Master/User";
import Auth from "./components/Auth";
import Dashboard  from "./components/Dashboard";
import UserDetail from "./components/Master/User/UserDetail";
import {ItemDetail,ItemList} from "./components/Master/Item";

const routes = [

    { path:'/', exact:true, name:'Home'},
    { path: '/auth', exact: true, name: 'Auth', component: Auth},

    { path: '/admin', exact:true, name:'Admin'},

    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

    { path: '/admin/master', exact: true, name: 'Master', component: Master },

    { path: '/admin/master/user', exact: true, name: 'User', component: User },
    { path: '/admin/master/user/create',exact: true, name: 'Create', component: UserDetail },
    { path: '/admin/master/user/:id',name: 'Detail', component: UserDetail },

    { path: '/admin/master/item', exact: true, name: 'Item', component: ItemList },
    { path: '/admin/master/item/create',exact: true, name: 'Create', component: ItemDetail },
    { path: '/admin/master/item/:id',name: 'Detail', component: ItemDetail },
]
export default routes;
