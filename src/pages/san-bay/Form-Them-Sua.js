import InputField from 'components/Custom/inputField';
import SelectField from 'components/Custom/selectField';
import { FastField, Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import * as Yup from 'yup';


FormThemSuaSanBay.propTypes = {
    initialValues: PropTypes.object,
    modalSanBay: PropTypes.bool,
    setModalSanBay: PropTypes.func,
    optionsQuocGia: PropTypes.array,
    optionsKhuVuc: PropTypes.array,
    optionsTinh: PropTypes.array,
    IsAddMode: PropTypes.bool,
};
FormThemSuaSanBay.defaultProps = {
    initialValues: null,
    modalSanBay: false,
    setModalSanBay: null,
    optionsTinh: null,
    optionsKhuVuc: null,
    optionsQuocGia: null,
    IsAddMode: false,
}
function FormThemSuaSanBay(props) {
    let { initialValues, modalSanBay, setModalSanBay, optionsTinh, optionsKhuVuc, optionsQuocGia ,IsAddMode } = props;
    //cover sang dạng option react-select
    optionsTinh = optionsTinh && optionsTinh.map(item => {
        return {
            value: item.id,
            label: item.ten,
        };
    });
    optionsKhuVuc = optionsKhuVuc && optionsKhuVuc.map(item => {
        return {
            value: item.id,
            label: item.ten,
        };
    });
    optionsQuocGia = optionsQuocGia && optionsQuocGia.map(item => {
        return {
            value: item.id,
            label: item.ten,
        };
    });

    const validationSchema = Yup.object().shape({
        ten_san_bay: Yup.string()
            .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
            .required('Vui lòng nhập trường này')
            .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
        ten_tat: Yup.string()
            .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
            .required('Vui lòng nhập trường này')
            .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
        khu_vuc_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        tinh_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        quoc_gia_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
    })


    const toggle = () => {
        setModalSanBay(!modalSanBay)
    }
    return (
        <Modal isOpen={modalSanBay} toggle={toggle}  >
            <ModalHeader toggle={toggle} tag="h4">
                {IsAddMode ? "Thêm mới sân bay" : "Cập nhật sân bay"}
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
                                            name="ten_san_bay"
                                            component={InputField}

                                            label="Tên sân bay"
                                            placeholder="Nhập tên sân bay"
                                            type="text"
                                            autoFocus={true}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <FastField
                                            name="ten_tat"
                                            component={InputField}

                                            label="Tên viết tắt"
                                            placeholder="Nhập tên viết tắt"
                                            type="text"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <Field
                                            name="tinh_id"
                                            component={SelectField}

                                            label="Tỉnh, thành phố"
                                            options={optionsTinh}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <Field
                                            name="khu_vuc_id"
                                            component={SelectField}

                                            label="Khu vực"
                                            options={optionsKhuVuc}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <Field
                                            name="quoc_gia_id"
                                            component={SelectField}

                                            label="Quốc gia"
                                            options={optionsQuocGia}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="d-flex flex-wrap gap-2 fix-button-footer mt-2">
                                        <Button type="reset" color="secondary" onClick={() => setModalSanBay(!modalSanBay)}>
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

export default FormThemSuaSanBay;