import React from "react";
import {
    Button,
    Input,
    Row,
    Table
} from "reactstrap";
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets';

const Variant = ({form, variantOption, variantChange,variantDelete,variantCreate, variantValueChange})=>{
    return (
        <Row>
            <Table hover bordered striped responsive size="sm" className="table-align-middle">
                <thead>
                <tr align={"center"} valign="middle">
                    <th>Variant</th>
                    <th>Value</th>
                    <th>Option</th>
                </tr>
                </thead>
                <tbody>
                {
                    form.variants && (form.variants).map((row,idx)=>{
                        return (
                            <tr key={idx}>
                                <td width={"20%"} align={"center"} valign="middle">
                                    <Input type="select" name="category" bsSize="sm" onChange={e=>variantChange(e,idx)}>
                                        {variantOption.map((variant,idx)=>
                                            <option key={idx} value={variant.id}>{variant.name}</option>
                                        )}
                                    </Input>
                                </td>
                                <td width={"55%"} valign="middle">
                                    <Multiselect
                                        data={row.valueData}
                                        valueField={"id"}
                                        textField={"name"}
                                        onChange={e=>variantValueChange(e,idx)}
                                        value = {row.values}
                                    />
                                </td>
                                <td width={"20%"} valign="middle" align={"center"}>
                                    <Button type="reset" size="sm" color="danger" onClick={e=>variantDelete(e,idx)} >Delete</Button>
                                </td>
                            </tr>
                        )
                    }

                    )
                }
                    <tr>
                        <td colSpan={4} align={"center"}>
                            <Button type="submit" size="sm" className="btn btn-success" onClick={variantCreate}><i className="fa fa-plus-square"></i> Add more</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

        </Row>
    )
}
export default Variant;