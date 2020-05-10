import React, {useState} from "react";
import {
    Button, Input, Row, Table, Col,
    Modal, ModalHeader, ModalBody, ModalFooter, Badge
} from "reactstrap";
import NumberFormat from 'react-number-format';
import Popup from "reactjs-popup";

const Sku = ({form, skuOnChange, skuPrint, skuTplClick, idxSku}) => {

    const [modal, setModal] = useState(false);

    const toggle = (idx) => {
        skuPrint(idx);
        setModal(!modal);
    };
    return (
        <Row>
            <Table hover bordered striped responsive size="sm" className="table-align-middle">
                <thead>
                <tr align={"center"} valign="middle">
                    <th>Sku</th>
                    <th>Value</th>
                    <th>UPC</th>
                    <th>Cost price</th>
                    <th>Sale price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    form.skus && (form.skus).map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    <td width={"15%"} align={"center"} valign="middle">
                                        {row.sku}
                                    </td>
                                    <td width={"20%"} align={"center"} valign="middle">
                                        {row.variant_value_name}
                                    </td>
                                    <td width={"15%"} valign="middle" align={"center"}>
                                        <Input type="text" name="upc" onChange={e => skuOnChange(e, idx)}
                                               value={row.upc || ''} maxLength={20}/>
                                    </td>
                                    <td width={"15%"} align={"center"} valign="middle">
                                        <NumberFormat thousandSeparator={true} className="form-control" name="cost_price"
                                                      onChange={e => skuOnChange(e, idx)} value={row.cost_price || ''}
                                                      maxLength={10}/>
                                    </td>
                                    <td width={"15%"} align={"center"} valign="middle">
                                        <NumberFormat thousandSeparator={true} className="form-control" name="sale_price"
                                                      onChange={e => skuOnChange(e, idx)} value={row.sale_price || ''}
                                                      maxLength={10}/>
                                    </td>
                                    <td width={"15%"} align={"center"} valign="middle">
                                        {row.ac===1?<Badge color="success">Active</Badge>:<Badge color="danger">Inactive</Badge>}
                                    </td>
                                    <td width={"20%"} align={"center"} valign="middle">
                                        <Button onClick={e=>toggle(idx)} size="sm" color="primary">Print</Button>
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </Table>
            <Modal isOpen={modal} toggle={e=>toggle(0)} backdrop={true}>
                <ModalHeader toggle={e=>toggle(0)}>Print Barcode</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="3">
                            <Input type="select" name="ac" bsSize="sm">
                                <option value={0}>Inactive</option>
                                <option value={1}>Active</option>
                            </Input>
                        </Col>
                        <Col md="9">
                            <Row>
                                <Col md={6}>
                                    <Row style={{marginBottom: 15}}>
                                        <Col md={3}>
                                            <img
                                                src="https://cdn-app.kiotviet.vn/retailler/Content/Giay_in_74x22.png"
                                                style={{width: 120, height: 100}}
                                            />
                                        </Col>
                                        <Col md={9} style={{fontSize: 14, display: "grid"}}>
                                            <p>Mẫu giấy cuộn 1 nhãn (Khổ giấy in nhãn 72x22mm)</p>
                                            <Button color="success"
                                                    style={{
                                                        fontSize: 14,
                                                        width: 135,
                                                        height: 35
                                                    }}
                                                    onClick={e=>skuTplClick(idxSku,1)}
                                            >
                                                <i className="fa fa-barcode"/>&nbsp;
                                                Xem bản in
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Row style={{marginBottom: 15}}>
                                        <Col md={3}>
                                            <img
                                                src="https://cdn-app.kiotviet.vn/retailler/Content/Giay_in_72x22.png"
                                                style={{width: 120, height: 100}}
                                            />
                                        </Col>
                                        <Col md={9} style={{fontSize: 14, display: "grid"}}>
                                            <p>Mẫu giấy cuộn 2 nhãn (Khổ giấy in nhãn 72x22mm)</p>
                                            <Button color="success"
                                                    style={{
                                                        fontSize: 14,
                                                        width: 135,
                                                        height: 35
                                                    }}
                                                    onClick={e=>skuTplClick(idxSku, 2)}
                                            >
                                                <i className="fa fa-barcode"/>&nbsp;
                                                Xem bản in
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </ModalBody>
                {/*<ModalFooter>*/}
                {/*    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}*/}
                {/*    <Button color="secondary" onClick={toggle}>Cancel</Button>*/}
                {/*</ModalFooter>*/}
            </Modal>
        </Row>

    )
}
export default Sku;