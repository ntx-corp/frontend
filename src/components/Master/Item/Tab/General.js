import React from "react";
import {Col, Input, Label, Row} from "reactstrap";
const General =({form, onChange,categoryOption})=>{
    const options=[];
    return (
        <div>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">File</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="file" name="file" onChange={onChange} value={form.url || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Name</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="name" onChange={onChange} value={form.name || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Code</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="code" onChange={onChange} value={form.code || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="selectSm">Status</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="select" name="status" bsSize="sm" onChange={onChange}>
                        <option value="IA">Inactive</option>
                        <option value="AT">Active</option>
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="selectSm">Manufacturer</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="select" name="manufacturer_id" bsSize="sm" onChange={onChange}>
                        {options.map((row,idx)=>
                            <option key={idx} value={row.id}>{row.name}</option>
                        )}
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="selectSm">Category</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="select" name="category_id" bsSize="sm" onChange={onChange}>
                        {categoryOption.map((row,idx)=>
                            <option key={idx} value={row.id}>{row.name}</option>
                        )}
                    </Input>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Priority</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="priority" onChange={onChange} value={form.title || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Meta title</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="title" onChange={onChange} value={form.title || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Tags</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="tag" onChange={onChange} value={form.tag || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Url seo</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="url_seo" onChange={onChange} value={form.url_seo || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Short description</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="short_desc" onChange={onChange} value={form.short_desc || ''}/>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                    <Label htmlFor="text-input">Long description</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" name="long_desc" onChange={onChange} value={form.long_desc || ''}/>
                </Col>
            </Row>
        </div>

    )
}
export default General;
