import React from "react";
import {Input} from "reactstrap";

const DropDown = ({name,id,data=[{cd:0,name:"Select"}]},onChange)=>{
    return (
        <Input type="select" name={name} id={id} bsSize="sm" onChange={onChange}>
            {data.map((row,idx)=>
                <option value={row.code}>{row.name}</option>
            )}
        </Input>
    )
}
export default DropDown;