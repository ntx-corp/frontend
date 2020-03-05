import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {AuthService} from '../../../services/AuthService'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import config from "../../../utils/config";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      message:''
    }
    // this.login = this.login.bind(this);
  }
  login = (e)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }
    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(respone=>{
          if(respone.status === 200){
            respone.text().then(text=>{
              const res = text && JSON.parse(text);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('token_expire', res.data.expire);
              AuthService.getUser();
              this.props.history.push('/');
            })
          }
          else if(respone.status === 401){
            respone.text().then(text=>{
              const res = text && JSON.parse(text);
              this.setState({
                message:res.message
              });
            });
          }
          else if(respone.status === 422){
            respone.text().then(text=>{
              const res = text && JSON.parse(text);
              const data = res.data;
              let message = data.map((value,index)=>{
                return value;
              })
              this.setState({
                message:message
              });
            });
          }
        })
        .catch(error=>{
          console.log(error)
        });
  }
  onChange = (e) =>this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username"  name='username' onChange={this.onChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={this.onChange}/>
                      </InputGroup>
                      <div style={{color:"red"}}><FormError error={this.state.message}/></div>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export const FormError = ({error})=>{
  return (<p>{error}</p>);
}
export default Login;
