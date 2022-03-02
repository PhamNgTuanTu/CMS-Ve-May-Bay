import InputField from 'components/Custom/inputField';
import InputFile from 'components/Custom/inputFile';
import { FastField, Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import * as Yup from 'yup';



FormThemSuaHangBay.propTypes = {
    initialValues: PropTypes.object,
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    IsAddMode: PropTypes.bool,

};
FormThemSuaHangBay.defaultProps = {
    initialValues: null,
    modal: false,
    setModal: null,
    IsAddMode: false,
}
function FormThemSuaHangBay(props) {
    const { initialValues, modal, setModal, IsAddMode } = props;

    const validationSchema = Yup.object().shape({
        ten_hang_bay: Yup.string()
            .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
            .required('Vui lòng nhập trường này')
            .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
        ma_hang_bay: Yup.string()
            .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
            .required('Vui lòng nhập trường này')
            .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
        logo: Yup.mixed()
            .required("Vui lòng chọn hình ảnh")
            .nullable(),
    })

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}  >
            <ModalHeader toggle={toggle} tag="h4">
                {IsAddMode ? "Thêm mới hãng bay" : "Cập nhật hãng bay"}
            </ModalHeader>
            <ModalBody>
                <Formik
                    initialValues={initialValues}
                    onSubmit={props.onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {formikProps => {
                        const { isSubmitting, values, touched, errors } = formikProps;
                        // console.log({ values, touched, errors })
                        return (
                            <Form>
                                <Row>
                                    <Col md="12" >
                                        <FastField
                                            name="ten_hang_bay"
                                            component={InputField}

                                            label="Tên hãng bay"
                                            placeholder="Nhập tên hãng bay"
                                            type="text"
                                            autoFocus={true}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <FastField
                                            name="ma_hang_bay"
                                            component={InputField}

                                            label="tên viết tắt"
                                            placeholder="Nhập mã hãng bay"
                                            type="text"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <Field
                                            name="logo"
                                            component={InputFile}
                                            label="Logo"
                                            placeholder="Vui lòng chọn logo có dạng (jpg, jpeg, png)"
                                            type="file"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="d-flex flex-wrap gap-2 fix-button-footer mt-2">
                                        <Button type="reset" color="secondary" onClick={() => setModal(!modal)}>
                                            Hủy bỏ
                                        </Button>
                                        {" "}
                                        <Button className="custom-btn-save" type="submit" disabled={isSubmitting} color="primary" style={isSubmitting ? { width: 'max-content' } : null}>
                                            {isSubmitting ? "Đang lưu ... " : "Lưu"}
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalBody>
        </Modal>
    );
}

export default FormThemSuaHangBay;