import React from "react";
import {Col, Input, Label, Row} from "reactstrap";
import {Editor} from '@tinymce/tinymce-react';
import ImageUploader from "react-images-upload";

const General = ({form, onChange, categoryOption, handleEditorChange, onFileChange,fileContent}) => {
    const options = [];
    const imageUploader = React.useRef(null);
    return (
        <div>
            <Row>
                <Col md={3}>
                    <div id="frm_uploadFile">
                        <img id="imageView" src={form.image?("https://drive.google.com/uc?export=view&id="+form.image): (fileContent || '/assets/img/no_image.jpg')}/>
                        <label id="lbl_image" title="No file select" onClick={() => imageUploader.current.click()}>Choose file...</label>
                        <input type="file" accept="image/*" onChange={onFileChange} ref={imageUploader}/>
                    </div>
                </Col>
                <Col md={9}>
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
                            <Input type="select" name="ac" bsSize="sm" onChange={onChange}>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Label htmlFor="selectSm">Manufacturer</Label>
                        </Col>
                        <Col xs="12" md="9">
                            <Input type="select" name="manufacturer_id" bsSize="sm" onChange={onChange}>
                                {options.map((row, idx) =>
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
                                {categoryOption.map((row, idx) =>
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
                    <Editor
                        value={form.desc ? form.desc.long_desc : ""}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        textareaName="long_desc"
                        onEditorChange={handleEditorChange}
                    />
                </Col>
            </Row>
        </div>

    )
}
export default General;
