import React from 'react';
// import Layout from './Default/Layout'
import Layout from './CoreUI/Layout'
export default class AdminLayout extends React.Component{
    render(){
        return (
            <Layout{...this.props}/>
        );
    }
}
