import InputActive from 'components/Custom/inputActiveAcount';
import SelectField from 'components/Custom/selectField';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import * as Yup from 'yup';


FormThemSuaTuyenBay.propTypes = {
    initialValues: PropTypes.object,
    modalTuyenBay: PropTypes.bool,
    setModalTuyenBay: PropTypes.func,
    optionsSanBay: PropTypes.any,
    dataEdit: PropTypes.any,
    IsAddMode: PropTypes.bool,
};
FormThemSuaTuyenBay.defaultProps = {
    initialValues: null,
    modalTuyenBay: false,
    setModalTuyenBay: null,
    optionsSanBay: null,
    dataEdit: null,
    IsAddMode: false,
}
function FormThemSuaTuyenBay(props) {
    const { initialValues, modalTuyenBay, setModalTuyenBay, switchTuyenBay, setSwitchTuyenBay, dataEdit, IsAddMode } = props;
    let { optionsSanBay } = props;
    const options = []

    const validationSchema = Yup.object().shape({
        san_bay_di_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
        san_bay_den_id: Yup.number()
            .required('Vui lòng chọn trường này')
            .nullable(),
    })

    //cover sang dạng option react-select
    optionsSanBay = optionsSanBay && optionsSanBay.map(item => {
        if (item && item.tinh) {
            options.push({
                value: item.id,
                label: `${item.tinh.ten} (${item.ten_tat})`
            })
        }
    });

    useEffect(() => {
        dataEdit && dataEdit.hai_chieu ? setSwitchTuyenBay(true) : setSwitchTuyenBay(false)
    }, [dataEdit])

    const Offsymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
            </div>
        )
    }

    const OnSymbol = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}
            >
                {" "}
            </div>
        )
    }

    const toggle = () => {
        setModalTuyenBay(!modalTuyenBay)
    }
    return (
        <Modal isOpen={modalTuyenBay} toggle={toggle}  >
            <ModalHeader toggle={toggle} tag="h4">
                {IsAddMode ? "Thêm mới tuyến bay" : "Cập nhật tuyến bay"}
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
                                        <Field
                                            name="san_bay_di_id"
                                            component={SelectField}

                                            label="sân bay đi"
                                            options={options}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md="12" >
                                        <Field
                                            name="san_bay_den_id"
                                            component={SelectField}

                                            label="sân bay đến"
                                            options={options}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col lg={12}>
                                        <Field
                                            name="hai_chieu"
                                            component={InputActive}

                                            label="Tuyến bay 2 chiều"
                                            switchQuyenTruyCap={switchTuyenBay}
                                            setSwitchQuyenTruyCap={setSwitchTuyenBay}
                                            OnSymbol={OnSymbol}
                                            Offsymbol={Offsymbol}

                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="d-flex flex-wrap gap-2 fix-button-footer mt-2">
                                        <Button type="reset" color="secondary" onClick={() => setModalTuyenBay(!modalTuyenBay)}>
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

export default FormThemSuaTuyenBay;