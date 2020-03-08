import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {Redirect} from "react-router";
import {UserService} from "./UserService";

export default class UserDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            id:this.props.match.params.id,
            form:{}
        };
        this.detail();
    }
    // static getDerivedStateFromProps(props, state) {
    //     // console.log(props)
    //     return {favoritecolor: props.favcol };
    // }
    detail = ()=>{
        if(this.props.match.params.id)
            UserService.detail(this.props.match.params.id).then(res => this.setState({ form:res.data}));
    }
    // componentDidMount() {
    //     this.setState({'id':this.props.match.params.id});
    // }
    cancel=()=>{
        // this.props.history.push('/admin/master/user');
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/admin/master/user' />
        }
    }
    onChange = (e) =>{
        // console.log(e.target.value);
        const form = {
            ...this.state.form
        }
        form[e.target.name] = e.target.value;
        this.setState({
            form:form
        });
    }
    create = ()=>{
        UserService.create(this.state.form);
        this.cancel();
    }
    update=()=>{
        UserService.update(this.state.id,this.state.form);
        this.cancel();
    }
    render(){
        // console.log(this.state.form);
        return (
            <div>
                {this.renderRedirect()}
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Search info</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" autoComplete="off" >
                                    <FormGroup row>
                                        <Col md="6">
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Username</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" id="txt_username" name="username" placeholder="Username"  onChange={this.onChange} value={this.state.form.username || ''} autoComplete="off"/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Email</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" id="txt_email" name="email" placeholder="Email"  onChange={this.onChange} value={this.state.form.email || ''}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Password</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="password" id="txt_email" name="password" placeholder="Password"  onChange={this.onChange} autoComplete="off"/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">First name</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" id="txt_fist_name" name="first_name" placeholder="First name" onChange={this.onChange} value={this.state.form.first_name || ''}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Last name</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" id="txt_fist_name" name="last_name" placeholder="Last name" onChange={this.onChange} value={this.state.form.last_name || ''}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="selectSm">Status</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="select" name="status" id="cbo_status" bsSize="lg" onChange={this.onChange} value={this.state.form.status || 0}>
                                                        <option value="0">Please select</option>
                                                        <option value="AT">Active</option>
                                                        <option value="IA">Inactive</option>
                                                    </Input>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" className="btn btn-success" onClick={this.state.id ? this.update: this.create}><i className="fa fa-plus-square"></i> {this.state.id ?"Update":"Create"}</Button>
                                <Button type="reset" size="sm" color="danger" onClick={this.cancel}><i className="fa fa-ban"></i> Cancel</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
