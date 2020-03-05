import React from 'react';
import Layout from './Default/Layout'
export default class StoreFrontLayout extends React.Component{
    render(){
        return (
            <Layout {...this.props}/>
        );
    }
}
