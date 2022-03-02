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
import { chapNhanCapNhatNhanVienDL, layDSDaiLy, layDSLoaiNhanVien, layDSVaiTroDaiLy, layThongTinCapNhatNhanVienDL, themNhanVienDL } from "./../../store/actions";


FormThemSuaNVDaiLy.propTypes = {};

const initlabel = {
    'tab': 'nhân viên đại lý'
}
const initSlug = {
    'danh_sach': '/dai-ly/nhan-vien'
}

function FormThemSuaNVDaiLy(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    let { optionsVaiTro, optionsDaiLy, optionsVaiTroDaiLy } = useSelector(state => ({
        optionsVaiTro: state.LoaiNhanVien.content,
        optionsDaiLy: state.DaiLy.content,
        optionsVaiTroDaiLy: state.VaiTroDaiLy.content,
    }));
    const { id } = useParams();
    const [successDialog, setSuccessDialog] = useState(2)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [optionsVaiTroDl, setOptionsVaiTroDL] = useState([])
    let { resApiActionForm, nhanVienDLCapNhat } = useSelector(state => ({
        resApiActionForm: state.NhanVienDL.resApiActionForm,
        nhanVienDLCapNhat: state.NhanVienDL.nhanVienDLCapNhat
    }));


    //cover sang dạng option react-select
    optionsVaiTro = optionsVaiTro && optionsVaiTro.map(item => {
        return {
            value: item.id,
            label: item.ten,
        };
    });
    optionsDaiLy = optionsDaiLy && optionsDaiLy.map(item => {
        return {
            value: item.id,
            label: item.ten,
        };
    });
    /*optionsVaiTroDaiLy = optionsVaiTroDaiLy && optionsVaiTroDaiLy.map(item => {
        return {
            value: item.id,
            label: item.ten_vai_tro,
        };
    });*/

    const isAddMode = !id;


    // lấy danh sách vai trò
    useEffect(() => {
        dispatch(layDSDaiLy());
        dispatch(layDSLoaiNhanVien());
        dispatch(layDSVaiTroDaiLy());
        id && dispatch(layThongTinCapNhatNhanVienDL(id));
    }, [dispatch, id])

    const initialValues = isAddMode ? {
        ho_ten: "",
        ten_dang_nhap: "",
        mat_khau: "",
        email: "",
        dien_thoai: "",
        trang_thai: "",
        dai_ly_id: "",
        loai_nhan_vien_id: "",
        vai_tro_dai_ly_id: ""
    } : {
        ho_ten: nhanVienDLCapNhat.ho_ten ? nhanVienDLCapNhat.ho_ten : '',
        email: nhanVienDLCapNhat.email ? nhanVienDLCapNhat.email : '',
        dien_thoai: nhanVienDLCapNhat.dien_thoai ? nhanVienDLCapNhat.dien_thoai : '',
        ten_dang_nhap: nhanVienDLCapNhat.ten_dang_nhap ? nhanVienDLCapNhat.ten_dang_nhap : '',
        trang_thai: Number(nhanVienDLCapNhat.trang_thai),
        dai_ly_id: Number(nhanVienDLCapNhat.dai_ly_id),
        loai_nhan_vien_id: Number(nhanVienDLCapNhat.loai_nhan_vien_id),
        vai_tro_dai_ly_id: Number(nhanVienDLCapNhat.vai_tro_dai_ly_id),
        only_trang_thai: 0,
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
            ho_ten: Yup.string()
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
            loai_nhan_vien_id: Yup.number()
                .required('Vui lòng chọn trường này')
                .nullable(),
            dai_ly_id: Yup.number()
                .required('Vui lòng chọn trường này')
                .nullable(),
            vai_tro_dai_ly_id: Yup.number()
                .required('Vui lòng chọn trường này')
                .nullable(),
        })
        :
        Yup.object().shape({
            ho_ten: Yup.string()
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
            dai_ly_id: Yup.number()
                .required('Vui lòng chọn trường này')
                .nullable(),
            loai_nhan_vien_id: Yup.number()
                .required('Vui lòng chọn trường này')
                .nullable(),
            vai_tro_dai_ly_id: Yup.number()
                .required('Vui lòng chọn trường này')
                .nullable(),
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

    useEffect(() => {
        setOptionsVaiTroDL(removeOptionQuanLy(optionsVaiTroDaiLy));
        console.log(removeOptionQuanLy(optionsVaiTroDaiLy))
    }, [optionsVaiTroDaiLy])

    const removeOptionQuanLy = (arrVaiTro) => {
        var result = new Array();
        for (let i = 0; i < arrVaiTro.length; i ++) {
            if (arrVaiTro[i].ten_vai_tro !== "Quản lý") {
                var option = {
                        value: arrVaiTro[i].id,
                        label: arrVaiTro[i].ten_vai_tro,
                    }
                result.push(option)
            }
        }
        return result;
    }
    // submit form
    const onSubmit = (values) => {
        if (isAddMode) {
            dispatch(themNhanVienDL(values))
            setDisabledBtn(true)
        } else {
            var requestContent = {
                params: {
                    id: Number(id)
                },
                body: values
            }
            dispatch(chapNhanCapNhatNhanVienDL(requestContent))
            setDisabledBtn(true)

        }
    }

    const [switchQuyenTruyCap, setSwitchQuyenTruyCap] = useState(true)
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
    useEffect(() => {
        if (id) {
            nhanVienDLCapNhat.trang_thai === 1 ? setSwitchQuyenTruyCap(true) : setSwitchQuyenTruyCap(false)
        }
    }, [nhanVienDLCapNhat.id])
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
                                    const { isSubmitting } = formikProps;
                                    return (
                                        <Form>
                                            <Row>
                                                <Col md="6" xl="6" >
                                                    <FastField
                                                        name="ho_ten"
                                                        component={InputField}

                                                        label="Họ tên"
                                                        placeholder="Nhập Họ tên"
                                                        type="text"
                                                        autoFocus={true}
                                                    />
                                                </Col>
                                                <Col md="6" xl="6">
                                                    <FastField
                                                        name="ten_dang_nhap"
                                                        component={InputField}

                                                        label="tên đăng nhập"
                                                        placeholder="Nhập tên đăng nhập"
                                                        type="text"
                                                        disabled={isAddMode ? false : true}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6" xl="6" >
                                                    <Field
                                                        name="dai_ly_id"
                                                        component={SelectField}

                                                        label="Đại lý"
                                                        options={optionsDaiLy}
                                                    />
                                                </Col>
                                                <Col md="6" xl="6">
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

                                                            label="số điện thoại"
                                                            placeholder="Nhập số điện thoại"
                                                            type="text"
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
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
                                                            name="dien_thoai"
                                                            component={InputFieldNumber}

                                                            label="số điện thoại"
                                                            placeholder="Nhập số điện thoại"
                                                            type="text"
                                                        />
                                                        :
                                                        <Field
                                                            name="vai_tro_dai_ly_id"
                                                            component={SelectField}

                                                            label="quyền truy cập"
                                                            options={optionsVaiTroDaiLy}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6" xl="6" >
                                                    <Field
                                                        name="loai_nhan_vien_id"
                                                        component={SelectField}

                                                        label="loại nhân viên"
                                                        options={optionsVaiTro}
                                                    />
                                                </Col>
                                                {isAddMode ?
                                                    <Col md="6" xl="6" >
                                                        <Field
                                                            name="vai_tro_dai_ly_id"
                                                            component={SelectField}

                                                            label="quyền truy cập"
                                                            options={optionsVaiTroDl}
                                                        />
                                                    </Col>
                                                    : null}
                                            </Row>
                                            <Row>
                                                <Col md="6" xl="6" >
                                                    <Field
                                                        name="trang_thai"
                                                        component={InputActive}

                                                        label="Kích hoạt tài khoản"
                                                        switchQuyenTruyCap={switchQuyenTruyCap}
                                                        setSwitchQuyenTruyCap={setSwitchQuyenTruyCap}
                                                        OnSymbol={OnSymbol}
                                                        Offsymbol={Offsymbol}

                                                    />
                                                </Col>
                                            </Row>
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

export default FormThemSuaNVDaiLy;