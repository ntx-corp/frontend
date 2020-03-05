import React from 'react';

export default class UserDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props)
        return {favoritecolor: props.favcol };
    }
    componentDidMount() {
        console.log(this.props.id)
    }

    render(){
        return (
            <div>
                User Detail
            </div>
        );
    }
}
