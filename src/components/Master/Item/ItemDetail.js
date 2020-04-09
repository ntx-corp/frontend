import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,
    Badge, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {Redirect} from "react-router";
import {ItemService} from "./ItemService";
import {Attribute, General, Image, Inventory, Price, Sku, Variant} from "./Tab";

export default class ItemDetail extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            redirect: false,
            id:this.props.match.params.id,
            form:{
                variants:[]
            },
            activeTab: new Array(4).fill('1'),
            variantOption:[],
            categoryOption:[]
        };
    }
    componentDidMount() {
        this.detail();
    }
    toggle(tabPane, tab) {
        // console.log(this.state)
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }
    detail = ()=>{
        if(this.props.match.params.id){
            try{
                ItemService.detail(this.props.match.params.id).then(res => this.setState({ form:res.data}));
            }
            catch (e) {
                console.log(e.message);
            }
        }
        ItemService.variant().then(res =>this.setState({ variantOption:res.data}));
        ItemService.category().then(res =>this.setState({ categoryOption:res.data}));
    }

    backToList=()=>{
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/admin/master/item' />
        }
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

    create = async ()=>{
        await ItemService.create(this.state.form).then(res=>this.setState({id:res.data.id}));
        this.props.history.push("/admin/master/item/"+this.state.id);
    }
    update=async ()=>{
        await ItemService.update(this.state.id,this.state.form);
    }

    variantChange = async(e,idx) =>{
        const form = {
            ...this.state.form
        }
        const variants = this.state.form.variants;
        variants[idx].variant_id = e.target.value;
        ItemService.variantValue(e.target.value).then(res=>{
            variants[idx].valueData=res.data;
            form.variants = variants;
            this.setState({
                form:form
            });
        });

    }
    variantCreate=(e)=>{
        const form = {
            ...this.state.form
        }
        const variants = this.state.form.variants;
        variants.push({
            id:"",
            variant_id:'',
            valueData:[],
            values:[]
        })
        form.variants = variants;
        this.setState({
            form:form
        });
    }
    variantDelete=(e,idx)=>{
        const form = {
            ...this.state.form
        }
        var variants = this.state.form.variants;
        delete variants[idx];
        form.variants = variants;
        this.setState({
            form:form
        });
    }
    variantValueChange = (e,idx)=>{
        let values = e.map(data=>{
            return data.id
        });
        const form = {
            ...this.state.form
        }
        const variants = this.state.form.variants;
        variants[idx].values = values;
        form.variants = variants;
        this.setState({
            form:form
        });
    }
    render(){
        return (
            <div className="animated fadeIn">
                {this.renderRedirect()}
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardFooter>
                                <Button type="submit" size="sm" className="btn btn-success" onClick={this.state.id ? this.update: this.create}><i className="fa fa-plus-square"></i> {this.state.id ?"Update":"Create"}</Button>
                                <Button type="reset" size="sm" color="danger" onClick={this.backToList}><i className="fa fa-ban"></i> Cancel</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '1'}
                                    onClick={() => { this.toggle(0, '1'); }}
                                >
                                    General
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '2'}
                                    onClick={() => { this.toggle(0, '2'); }}
                                >
                                    Variant
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '3'}
                                    onClick={() => { this.toggle(0, '3'); }}
                                >
                                    Sku
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '4'}
                                    onClick={() => { this.toggle(0, '4'); }}
                                >
                                    Images
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '5'}
                                    onClick={() => { this.toggle(0, '5'); }}
                                >
                                    Price
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '6'}
                                    onClick={() => { this.toggle(0, '6'); }}
                                >
                                    Attribute
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '7'}
                                    onClick={() => { this.toggle(0, '7'); }}
                                >
                                    Inventory
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            <TabPane tabId="1">
                                <General form={this.state.form}
                                         categoryOption = {this.state.categoryOption}
                                         onChange={this.onChange}
                                />
                            </TabPane>
                            <TabPane tabId="2">
                                <Variant form={this.state.form}
                                         variantOption={this.state.variantOption}
                                         variantChange={this.variantChange}
                                         variantCreate={this.variantCreate}
                                         variantDelete={this.variantDelete}
                                         variantValueChange={this.variantValueChange}
                                />
                            </TabPane>
                            <TabPane tabId="3">
                                <Sku/>
                            </TabPane>
                            <TabPane tabId="4">
                                <Image/>
                            </TabPane>
                            <TabPane tabId="5">
                                <Price/>
                            </TabPane>
                            <TabPane tabId="6">
                                <Attribute/>
                            </TabPane>
                            <TabPane tabId="7">
                                <Inventory/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}
