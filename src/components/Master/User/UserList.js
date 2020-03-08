import React from 'react';
// import {Route, Switch} from "react-router";
// import UserDetail from "./detail";
import {
    CardFooter,
    Form,
    FormGroup,
    Input,
    Label,
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from 'reactstrap';
import {UserService} from "./UserService";
import {Redirect} from "react-router";

export class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            res:null,
            form:{
                username:'',
                first_name:'',
                last_name:'',
                status:'',
                email:'',
                limit:15,
                page:1
            }
        };
        this.search();
    }
    // componentDidMount() {
    //     UserService.getList().then(res => this.setState({ res }));
    // }
    search = (e)=>{
        UserService.getList(this.state.form).then(res => this.setState({ res }));
    }
    // onChange = (e) =>this.setState({ [e.target.name]: e.target.value });
    onChange = (e) =>{
        const form = {
            ...this.state.form
        }
        form[e.target.name] = e.target.value;
        this.setState({
            form:form
        });
    }
    create = ()=>{
        this.props.history.push(this.props.match.path+'create');
    }
    reset =()=>{
        this.setState({form:{}})
    }
    render(){
        console.log(this.state.res);
        const {res} = this.state;
        return(
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Search info</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="6">
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Username</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" id="txt_username" name="username" placeholder="Username"  onChange={this.onChange} value={this.state.form.username || ''}/>
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
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" className="btn btn-success" onClick={this.create}><i className="fa fa-plus-square"></i> Create</Button>
                                <Button type="submit" size="sm" color="primary" onClick={this.search}><i className="fa fa-dot-circle-o"></i> Search</Button>
                                <Button type="reset" size="sm" color="danger" onClick={this.reset}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> User List
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Avatar</th>
                                        <th>Username</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Role</th>
                                        <th>Created by</th>
                                        <th>Created on</th>
                                        <th>Updated by</th>
                                        <th>Updated on</th>
                                        <th>Deleted by</th>
                                        <th>Deleted on</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        res && (res.data.rows).map((row,index)=>
                                            <tr key={row.id}>
                                                <td>{index+1}</td>
                                                <td>
                                                    {/*<img src={'../../assets/img/avatars/65.jpg'} className="img-avatar"/>*/}
                                                </td>
                                                <td><a href={"#"+this.props.match.path+row.id}>{row.username}</a></td>
                                                <td>{row.first_name}</td>
                                                <td>{row.last_name}</td>
                                                <td>{row.email}</td>
                                                <td>
                                                    {row.status=="AT"?<Badge color="success">Active</Badge>:<Badge color="danger">Inactive</Badge>}

                                                </td>
                                                <td>{row.role_name}</td>
                                                <td>{row.created_by_name}</td>
                                                <td>{row.created_at}</td>
                                                <td>{row.updated_by_name}</td>
                                                <td>{row.updated_at}</td>
                                                <td>{row.deleted_by_name}</td>
                                                <td>{row.deleted_at}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink tag="button">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}