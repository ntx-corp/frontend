import React from 'react';
import {Route, Switch} from "react-router";
import UserDetail from "./detail";

export class UserList extends React.Component{
    render(){
        return(
            <div>
                User List
                <Switch>
                    <Route path="user/:id" component={UserDetail} />
                </Switch>
            </div>
        );
    }

}
