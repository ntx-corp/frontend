import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import {UserList} from "./UserList";

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    static getDerivedStateFromProps(props, state) {
        return {favoritecolor: props.favcol };
    }
    render() {
        return (
          <div>
              <Switch>
                  <Route path={`${this.props.match.path}/`} component={UserList} exact />
                  {/*<Route path={`${this.props.match.path}/:id`} component={UserDetail} />*/}
              </Switch>
          </div>
        );
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({favoritecolor: "yellow"})
        }, 1000)
    }
}
