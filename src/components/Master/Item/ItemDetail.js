import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,
    Badge, Nav, NavItem, NavLink, TabContent, TabPane,Table} from "reactstrap";
import {Redirect} from "react-router";
import {ItemService} from "./ItemService";
import {Attribute, General, Image, Inventory, Price, Sku, Variant} from "./Tab";
import Barcode from "react-barcode";
import NumberFormat from "react-number-format";

export default class ItemDetail extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            redirect: false,
            id:this.props.match.params.id,
            form:{
                attrs:[],
                desc:[],
                variants:[],
                images:[],
                skus:[],
                files:null,
            },
            activeTab: new Array(4).fill('1'),
            variantOption:[],
            categoryOption:[],
            idxSku:null,
            tplBarcode1:'',
            tplBarcode2:'',
            fileContent:''
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
            if(this.state.id){
                return <Redirect to={'/admin/master/item/'+this.state.id} />
            }else{
                return <Redirect to='/admin/master/item' />
            }

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
        let res = await ItemService.create(this.state.form);
        console.log(res);
        // this.props.history.push("/admin/master/item/"+this.state.id);
        this.setState({
            redirect: true
        })
    }
    update=async ()=>{
        await ItemService.update(this.state.id,this.state.form);
        this.props.history.push("/admin/master/item/"+this.state.id);
    }

    handleEditorChange=(content,e)=>{
        const form = {
            ...this.state.form
        }
        const desc = form.desc||{
            long_desc:"",
            short_desc:""
        };
        desc[e.targetElm.name] = content;
        form.desc = desc;
        this.setState({
            form:form
        });
    }
    variantChange = async(e,idx) =>{
        const form = {
            ...this.state.form
        }
        const variants = this.state.form.variants;
        variants[idx].variant_id = e.target.value;
        ItemService.variantValue(e.target.value).then(res=>{
            variants[idx].valueData=res.data;
            variants[idx].values = [];
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

    skuOnChange=(e,idx)=>{
        const form = {
            ...this.state.form
        }
        const skus = this.state.form.skus;
        skus[idx][e.target.name] = e.target.value;
        form.skus = skus;
        this.setState({
            form:form
        });
    }
    skuPrint=(idx)=>{
        this.setState({
            idxSku:idx
        })
        console.log(idx);
        const skus = this.state.form.skus;
        let itemName = this.state.form.name;
        if(itemName.length > 20){
            itemName = itemName.substring(0,20)+"...";
        }
        let tplBarcode1=(
            <Table size="sm" className="table">
                <tbody style={{fontSize: 10}}>
                <tr>
                    <td valign="middle" align={"center"} style={{margin: 0, pading: 0, paddingLeft: 10}}>
                        <p style={{marginBottom: 3}}>{itemName}</p>
                        <p style={{margin: 0}}>
                            <Barcode value={skus[idx].upc?skus[idx].upc:skus[idx].sku} width={1} height={22} fontSize={10} margin={0}/>
                        </p>
                        <p style={{margin: 0}}>Gia: <NumberFormat displayType={'text'} thousandSeparator={true} className="form-control" value={skus[idx].sale_price || ''} maxLength={10}/> VND</p>
                    </td>
                </tr>
                </tbody>
            </Table>
        )
        let tplBarcode2=(
            <Table size="sm" className="table">
                <tbody style={{fontSize: 12}}>
                <tr>
                    <td valign="middle" align={"center"} style={{margin: 0, pading: 0, paddingLeft: 10,paddingTop:7}}>
                        <p style={{marginBottom: 3}}>{itemName}</p>
                        <p style={{margin: 0}}>
                            <Barcode value={skus[idx].upc?skus[idx].upc:skus[idx].sku} width={1} height={22} fontSize={10} margin={0}/>
                        </p>
                        <p style={{margin: 0,paddingTop:5}}>Gia: <NumberFormat displayType={'text'} thousandSeparator={true} className="form-control" value={skus[idx].sale_price || ''} maxLength={10}/> VND</p>
                    </td>
                    <td valign="middle" align={"center"} style={{margin: 0, padding: 0, paddingLeft: 30,paddingTop:7}}>
                        <p style={{marginBottom: 3}}>{itemName}</p>
                        <p style={{margin: 0}}>
                            <Barcode value={skus[idx].upc?skus[idx].upc:skus[idx].sku} width={1} height={22} fontSize={10} margin={0}/>
                        </p>
                        <p style={{margin: 0,paddingTop:5}}>Gia: <NumberFormat displayType={'text'} thousandSeparator={true} className="form-control" value={skus[idx].sale_price || ''} maxLength={10}/> VND</p>
                    </td>
                </tr>
                </tbody>
            </Table>
        )
        this.setState({
            tplBarcode1:tplBarcode1,
            tplBarcode2:tplBarcode2
        })

    }
    skuTplClick=(idx,tplNo)=>{
        const skus = this.state.form.skus;
        let idTpl = "printArea"+tplNo;

        var content = document.getElementById('printArea'+tplNo);
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
    onFileChange=async (e)=>{
        const form = {
            ...this.state.form
        }
        form.file = e.target.files[0];
        let fileContent = "";
        if(form.file){
            // const reader = new FileReader();
            const fileContents = await readUploadedFileAsText(form.file)
            fileContent = fileContents
        }
        form.image = null;
        this.setState({
            fileContent:fileContent,
            form:form
        });
    }
    attrAdd=(e)=>{
        const form = {
            ...this.state.form
        }
        const attrs = this.state.form.attrs;
        attrs.push({
            id:"",
            name:'',
            desc:'',
        })
        form.attrs = attrs;
        this.setState({
            form:form
        });
    }
    attrOnChange=(e,idx)=>{
        const form = {
            ...this.state.form
        }
        const attrs = this.state.form.attrs;
        attrs[idx][e.target.name] = e.target.value;
        form.attrs = attrs;
        this.setState({
            form:form
        });
    }
    render(){
        return (
            <div className="animated fadeIn">
                <iframe id="ifmcontentstoprint" style={{
                    height: '0px',
                    width: '0px',
                    position: 'absolute'
                }}></iframe>
                <div id="printArea1" style={{display:"none"}}>
                    {this.state.tplBarcode1}
                </div>
                <div id="printArea2" style={{display:"none"}}>
                    {this.state.tplBarcode2}
                </div>
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
                                    active={this.state.activeTab[0] === '6'}
                                    onClick={() => { this.toggle(0, '6'); }}
                                >
                                    Attribute
                                </NavLink>
                            </NavItem>
                            {/*<NavItem>*/}
                            {/*    <NavLink*/}
                            {/*        active={this.state.activeTab[0] === '4'}*/}
                            {/*        onClick={() => { this.toggle(0, '4'); }}*/}
                            {/*    >*/}
                            {/*        Price*/}
                            {/*    </NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*    <NavLink*/}
                            {/*        active={this.state.activeTab[0] === '5'}*/}
                            {/*        onClick={() => { this.toggle(0, '5'); }}*/}
                            {/*    >*/}
                            {/*        Image*/}
                            {/*    </NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*    <NavLink*/}
                            {/*        active={this.state.activeTab[0] === '7'}*/}
                            {/*        onClick={() => { this.toggle(0, '7'); }}*/}
                            {/*    >*/}
                            {/*        Inventory*/}
                            {/*    </NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            <TabPane tabId="1">
                                <General form={this.state.form}
                                         categoryOption = {this.state.categoryOption}
                                         onChange={this.onChange}
                                         handleEditorChange={this.handleEditorChange}
                                         onFileChange = {this.onFileChange}
                                         fileContent = {this.state.fileContent}
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
                                <Sku form={this.state.form}
                                    skuOnChange={this.skuOnChange}
                                     skuPrint = {this.skuPrint}
                                     idMessage="popUpPrint"
                                     skuTplClick = {this.skuTplClick}
                                     idxSku = {this.state.idxSku}
                                />
                            </TabPane>
                            <TabPane tabId="6">
                                <Attribute form={this.state.form}
                                           attrAdd={this.attrAdd}
                                           attrOnChange ={this.attrOnChange}
                                />
                            </TabPane>
                            {/*<TabPane tabId="4">*/}
                            {/*    <Price/>*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tabId="5">*/}
                            {/*    <Image/>*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tabId="7">*/}
                            {/*    <Inventory/>*/}
                            {/*</TabPane>*/}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}
const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
    });
};
