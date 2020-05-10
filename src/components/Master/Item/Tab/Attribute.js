import React from "react";
import {Button, Input, Row, Table} from "reactstrap";
import {Multiselect} from "react-widgets";

export default class Attribute  extends React.Component{
    render(){
        return (
            <Row>
                <Table hover bordered striped responsive size="sm" className="table-align-middle">
                    <thead>
                    <tr align={"center"} valign="middle">
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.form.attrs && (this.props.form.attrs).map((row,idx)=>{
                                return (
                                    <tr key={idx}>
                                        <td width={"20%"} align={"center"} valign="middle">
                                            <Input type="text" name="name" bsSize="sm" onChange={e=>this.props.attrOnChange(e,idx)} value={row.name || ""}/>
                                        </td>
                                        <td width={"55%"} valign="middle">
                                            <Input type="text" name="desc" bsSize="sm" onChange={e=>this.props.attrOnChange(e,idx)} value={row.desc || ""}/>
                                        </td>
                                    </tr>
                                )
                            }

                        )
                    }
                    <tr>
                        <td colSpan={4} align={"center"}>
                            <Button type="submit" size="sm" className="btn btn-success" onClick={this.props.attrAdd}><i className="fa fa-plus-square"></i> Add more</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
        )
    }
}