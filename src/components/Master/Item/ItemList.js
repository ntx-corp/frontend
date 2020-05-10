import React from 'react';
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
import {ItemService} from "./ItemService";
import {Helper} from "../../../helpers/helper";

export default class ItemList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            res:null,
            form:{}
        };
    }
    componentDidMount() {
        this.search();
    }
    search = ()=>{
        ItemService.getList(this.state.form).then(res => this.setState({ res }));
    }
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
        this.props.history.push('/admin/master/item/create');
    }
    reset =()=>{
        this.setState({form:{}})
    }
    render(){
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
                                                    <Label htmlFor="text-input">Code</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" name="code" placeholder="Item code"  onChange={this.onChange} value={this.state.form.code || ''}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Name</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" name="name" placeholder="Item name"  onChange={this.onChange} value={this.state.form.name || ''}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                                <Col md="3">
                                                    <Label htmlFor="text-input">Category</Label>
                                                </Col>
                                                <Col xs="12" md="9">
                                                    <Input type="text" name="category_id" placeholder="Category" onChange={this.onChange} value={this.state.form.category_id || ''}/>
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
                                <i className="fa fa-align-justify"></i> List
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm" className="table-align-middle">
                                    <thead>
                                    <tr align={"center"} valign="middle">
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Manufacturer</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Tag</th>
                                        <th>Url SEO</th>
                                        <th>Created by</th>
                                        <th>Created on</th>
                                        <th>Updated by</th>
                                        <th>Updated on</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        res && (res.data.rows).map((row,index)=>
                                            <tr key={row.id}>
                                                <td align={"center"} width={"3%"} valign="middle">{index+1}</td>
                                                <td width={"5%"} align={"center"} valign="middle">
                                                    <img style={{
                                                        width: 50,
                                                        height:50
                                                    }} id="imageView" src={row.image?("https://drive.google.com/uc?export=view&id="+row.image):'/assets/img/no_image.jpg'}/>
                                                </td>
                                                <td width={"5%"} valign="middle"><a href={"#/admin/master/item/"+row.id}>{row.code}</a></td>
                                                <td width={"13%"} valign="middle"><a href={"#/admin/master/item/"+row.id}>{row.name}</a></td>
                                                <td width={"13%"} valign="middle">{row.title}</td>
                                                <td width={"7%"} valign="middle">{row.category_name}</td>
                                                <td width={"7%"}>{row.manufacturer_name}</td>
                                                <td width={"4%"} align={"center"}>
                                                    {row.ac===1?<Badge color="success">Active</Badge>:<Badge color="danger">Inactive</Badge>}
                                                </td>
                                                <td width={"1%"}>{row.priority}</td>
                                                <td width={"5%"}>{row.tag}</td>
                                                <td width={"5%"}>{row.url_seo}</td>
                                                <td width={"7%"} align={"center"}>{Helper.formatDate(row.created_at)}</td>
                                                <td width={"7%"} align={"center"}>{row.updated_by_name}</td>
                                                <td width={"7%"} align={"center"}>{Helper.formatDate(row.updated_at)}</td>
                                                <td width={"7%"} align={"center"}>{row.updated_by_name}</td>
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