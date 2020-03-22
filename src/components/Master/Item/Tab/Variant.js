import React from "react";
import {
    Badge, Button,
    Card,
    CardBody,
    CardHeader,
    Col, Input,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from "reactstrap";
import {Helper} from "../../../../helpers/helper";
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets';

const Variant = ({form, onChange,variantDelete})=>{
    const variants = [
        {code:1,name:"Color"},
        {code:2,name:"Size"},
        {code:3,name:"Uom"},
        {code:2,name:"Size"},
        {code:2,name:"Size"},
        {code:2,name:"Size"},
    ];
    const selected = [];
    return (
        <Row>
            <Table hover bordered striped responsive size="sm" className="table-align-middle">
                <thead>
                <tr align={"center"} valign="middle">
                    <th>No</th>
                    <th>Variant</th>
                    <th>Value</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody>
                {
                    form.variant && (form.variant).map((row,idx)=>
                        <tr>
                            <td align={"center"} width={"5%"} valign="middle">{idx+1}</td>
                            <td width={"20%"} align={"center"} valign="middle">
                                <Input type="select" name="category" bsSize="sm" onChange={onChange}>
                                    {variants.map((row,idx)=>
                                        <option key={idx} value={row.code}>{row.name}</option>
                                    )}
                                </Input>
                            </td>
                            <td width={"55%"} valign="middle">
                                <Multiselect
                                    data={variants}
                                    valueField={"code"}
                                    textField={"name"}
                                    zIndex={1}
                                />
                            </td>
                            <td width={"20%"} valign="middle" align={"center"}>
                                <Button type="reset" size="sm" color="danger" onClick={variantDelete}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </Row>
    )
}
export default Variant;