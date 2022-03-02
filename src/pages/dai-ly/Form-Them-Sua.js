import InputActive from 'components/Custom/inputActiveAcount';
import InputField from 'components/Custom/inputField';
import InputFieldNumber from 'components/Custom/inputFieldNumber';
import SelectField from 'components/Custom/selectField';
import { FastField, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import { MetaTags } from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from 'reactstrap';
import * as Yup from 'yup';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { titleCase } from "./../../helpers/function/function_helper";
import { layDSVaiTro, themDaiLy, chapNhanCapNhatDaiLy, layThongTinCapNhatDaiLy } from "./../../store/actions";


FormThemSuaDaiLy.propTypes = {};

const initlabel = {
    'tab': 'đại lý'
}
const initSlug = {
    'danh_sach': '/dai-ly'
}

function FormThemSuaDaiLy(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [successDialog, setSuccessDialog] = useState(2)
    const [disabledBtn, setDisabledBtn] = useState(false)


    let { resApiActionForm, daiLyCapNhat } = useSelector(state => ({
        resApiActionForm: state.DaiLy.resApiActionForm,
        daiLyCapNhat: state.DaiLy.daiLyCapNhat
    }));

    let { options } = useSelector(state => ({
        options: state.VaiTro.content,
    }));

    const isAddMode = !id;

    // lấy danh sách vai trò
    useEffect(() => {
        dispatch(layDSVaiTro());
        id && dispatch(layThongTinCapNhatDaiLy(id));
    }, [dispatch, id])

    const initialValues = isAddMode ? {
        ten: "",
        ma_dai_ly: "",
        ten_nguoi_dai_dien: "",
        ten_dang_nhap: "",
        mat_khau: "",
        email: "",
        dien_thoai: "",
    } : {
        ten: daiLyCapNhat.ten ? daiLyCapNhat.ten : '',
        ma_dai_ly: daiLyCapNhat.ma_dai_ly ? daiLyCapNhat.ma_dai_ly : '',
        ten_nguoi_dai_dien: daiLyCapNhat.ten_nguoi_dai_dien ? daiLyCapNhat.ten_nguoi_dai_dien : '',
        ten_dang_nhap: daiLyCapNhat.ten_dang_nhap ? daiLyCapNhat.ten_dang_nhap : '',
        email: daiLyCapNhat.email ? daiLyCapNhat.email : '',
        dien_thoai: daiLyCapNhat.dien_thoai ? daiLyCapNhat.dien_thoai : '',
    };

    const phoneRegex = RegExp(
        /(0[3|5|7|8|9])+([0-9]{8})\b/
    );
    const matKhauRegex = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    );
    const emailRegex = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const tenDangNhapRegex = RegExp(
        /^[A-Za-z0-9._]+$/
    );
    const validationSchema = isAddMode ?
        Yup.object().shape({
            ten: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
            ma_dai_ly: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .matches(tenDangNhapRegex, 'Mã đại lý không hợp lệ')
                .required('Vui lòng nhập trường này')
                .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
            ten_nguoi_dai_dien: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .max(50, "Vui lòng nhập nhỏ hơn 50 kí tự"),
            ten_dang_nhap: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .matches(tenDangNhapRegex, 'Tên đăng nhập không hợp lệ')
                .max(50, "Vui lòng nhập nhỏ hơn 50 kí tự"),
            mat_khau: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .matches(matKhauRegex, 'Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt')
                .min(6, "Vui lòng nhập lớn hơn 6 kí tự")
                .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
            email: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .email('Email không hợp lệ')
                .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
            dien_thoai: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .max(10, "Vui lòng nhập số điện thoại gồm 10 số")
                .min(10, "Vui lòng nhập số điện thoại gồm 10 số")
                .matches(phoneRegex, 'Số điện thoại không hợp lệ')
                .required('Vui lòng nhập trường này'),

        })
        :
        Yup.object().shape({
            ten: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
            ma_dai_ly: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .matches(tenDangNhapRegex, 'Mã đại lý không hợp lệ')
                .required('Vui lòng nhập trường này')
                .max(20, "Vui lòng nhập nhỏ hơn 20 kí tự"),
            ten_nguoi_dai_dien: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .max(50, "Vui lòng nhập nhỏ hơn 50 kí tự"),
            email: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .required('Vui lòng nhập trường này')
                .email('Email không hợp lệ')
                .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
            dien_thoai: Yup.string()
                .test("", "Vui lòng nhập trường này", (value) => value && value.trim() !== "")
                .max(10, "Vui lòng nhập số điện thoại gồm 10 số")
                .min(10, "Vui lòng nhập số điện thoại gồm 10 số")
                .matches(phoneRegex, 'Số điện thoại không hợp lệ')
                .required('Vui lòng nhập trường này'),
        })


    // form mặc định
    useEffect(() => {
        resApiActionForm = {};
    }, [])
    //thông báo 
    useEffect(() => {
        if (JSON.stringify(resApiActionForm) !== "{}") {
            resApiActionForm.status === 200 ?
                setSuccessDialog(1) : setSuccessDialog(0)
            setDisabledBtn(false)
        }
    }, [resApiActionForm.id])

    // submit form
    const onSubmit = (values) => {
        if (isAddMode) {
            dispatch(themDaiLy(values))
            setDisabledBtn(true)
        } else {
            var requestContent = {
                params: {
                    id: Number(id)
                },
                body: values
            }
            dispatch(chapNhanCapNhatDaiLy(requestContent))
            setDisabledBtn(true)
        }
    }
    return (
        <div className="page-content">
            <MetaTags>
                <title>{isAddMode ? `Thêm ${initlabel.tab}` : `Cập nhật ${initlabel.tab}`} | {process.env.REACT_APP_TITLE}</title>
            </MetaTags>
            <Container fluid>
                <Breadcrumbs title={`${isAddMode ? "Thêm mới " : "Cập nhật "}` + initlabel.tab}
                    danhsachTitle={titleCase(initlabel.tab)}
                    danhsachSlug={initSlug.danh_sach}
                    breadcrumbItem={isAddMode ? `Thêm mới ${initlabel.tab}` : `Cập nhật ${initlabel.tab}`}
                />
                <Card>
                    <CardHeader>
                        <Row >
                            <Col md={12} className="mb-3 mt-3" >
                                <CardTitle className="h5">{`Thông Tin ${initlabel.tab} `}</CardTitle>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Container fluid>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onSubmit}
                                validationSchema={validationSchema}
                                enableReinitialize
                            >
                                {formikProps => {
                                    const { isSubmitting, values, touched, errors } = formikProps;
                                    // console.log({ values, touched, errors })
                                    return (
                                        <Form>
                                            <Row>
                                                <Col md="6" xl="6" >
                                                    <FastField
                                                        name="ten"
                                                        component={InputField}

                                                        label="Tên đại lý"
                                                        placeholder="Nhập tên đại lý"
                                                        type="text"
                                                        autoFocus={true}
                                                    />
                                                </Col>
                                                <Col md="6" xl="6">
                                                    <FastField
                                                        name="ma_dai_ly"
                                                        component={InputField}

                                                        label="Mã đại lý"
                                                        placeholder="Nhập mã đại lý"
                                                        type="text"
                                                    />
                                                </Col>
                                            </Row>
                                            <Col md={12} className="mb-2" >
                                                <CardTitle className="h5">Thông tin người đại diện</CardTitle>
                                            </Col>
                                            <Row className="mt-4">
                                                <Col md="6" xl="6" >
                                                    <FastField
                                                        name="ten_nguoi_dai_dien"
                                                        component={InputField}

                                                        label="Tên người đại diện"
                                                        placeholder="Nhập tên người đại diện"
                                                        type="text"
                                                    />
                                                </Col>
                                                <Col md="6" xl="6" >
                                                    <FastField
                                                        name="ten_dang_nhap"
                                                        component={InputField}

                                                        label="Tên đăng nhập"
                                                        placeholder="Nhập tên đăng nhập"
                                                        type="text"
                                                        disabled={isAddMode ? false : true}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col md="6" xl="6" >
                                                    <FastField
                                                        name="email"
                                                        component={InputField}

                                                        label="Email"
                                                        placeholder="Nhập email"
                                                        type="text"
                                                    />
                                                </Col>
                                                <Col md="6" xl="6" >
                                                    {isAddMode ?
                                                        <FastField
                                                            name="mat_khau"
                                                            component={InputField}

                                                            label="mật khẩu"
                                                            placeholder="Nhập mật khẩu"
                                                            type="text"
                                                            format="Sử dụng mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - kí tự đặc biệt"
                                                        />
                                                        :
                                                        <FastField
                                                            name="dien_thoai"
                                                            component={InputFieldNumber}

                                                            label="Số điện thoại"
                                                            placeholder="Nhập số điện thoại"
                                                            type="text"
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                            {isAddMode ?
                                                <Row>
                                                    <Col md="6" xl="6" >
                                                        <FastField
                                                            name="dien_thoai"
                                                            component={InputFieldNumber}

                                                            label="Số điện thoại"
                                                            placeholder="Nhập số điện thoại"
                                                            type="text"
                                                        />
                                                    </Col>
                                                </Row>
                                                : null
                                            }
                                            <Row>
                                                <div className="d-flex flex-wrap gap-2 fix-button-footer mt-2">
                                                    <Button type="reset" color="secondary" onClick={() => history.push(initSlug.danh_sach)}>
                                                        Hủy bỏ
                                                    </Button>
                                                    {" "}
                                                    <Button className="custom-btn-save" type="submit" disabled={disabledBtn} color="primary" style={disabledBtn ? { width: 'max-content' } : null}>
                                                        {disabledBtn ? "Đang lưu ... " : "Lưu"}
                                                    </Button>
                                                </div>
                                            </Row>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Container >
                    </CardBody>
                </Card>
            </Container>
            {
                successDialog === 1 &&
                <SweetAlert
                    success
                    title="Thông báo"
                    timeout={1000}
                    showCloseButton={false}
                    showConfirm={false}
                    onConfirm={() => {
                        setSuccessDialog(false)
                        history.push(initSlug.danh_sach)
                    }}
                >
                    {resApiActionForm.message}
                </SweetAlert>
            }
            {
                successDialog === 0 &&
                <SweetAlert
                    error
                    title="Thông báo"
                    timeout={2000}
                    confirmBtnBsStyle="success"
                    showCloseButton={false}
                    showConfirm={false}
                    onCancel={() => {
                        setSuccessDialog(false)
                    }}
                    onConfirm={() => {
                        setSuccessDialog(false)
                    }}
                >
                    {resApiActionForm.message}
                </SweetAlert>
            }
        </div>
    );
}

export default FormThemSuaDaiLy;