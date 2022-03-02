import logo from "assets/images/logo-ThanhHoang.png"
import InputFieldForgetPass from "components/Custom/inputFieldForgetPass"
import { FastField, Form, Formik } from "formik"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
//redux
import { useDispatch, useSelector } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap"
import * as Yup from 'yup'
// import images
import profile from "../../assets/images/profile-img.png"
// action
import { xacNhanQuenMatKhau } from "../../store/actions"


const ForgetPasswordPage = props => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [hideMessage, setHideMessage] = useState(true)
  let { error, response } = useSelector(state => ({
    error: state.QuenMatKhau.error,
    response: state.QuenMatKhau.response,
  }))

  const handleValidSubmit = (values) => {
    var params = {
      'loai': "email",
      'gia_tri': values.ten_dang_nhap
    }
    dispatch(xacNhanQuenMatKhau(params))
    setDisabledBtn(true)
    setHideMessage(true)
  }

  useEffect(() => {
    response = {};
  }, [])

  useEffect(() => {
    if (JSON.stringify(response) !== "{}") {
      setMessage(response.message)
      setDisabledBtn(false)
      setHideMessage(false)
    }
  }, [response.id])

  const initialValues = {
    ten_dang_nhap: "",
  }

  const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const validationSchema = Yup.object().shape({
    ten_dang_nhap: Yup.string()
      .required('Vui lòng nhập trường này')
      .matches(emailRegex, 'Email không hợp lệ')
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
  })

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Quên mật khẩu | {process.env.REACT_APP_TITLE}
        </title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col md={7} xs={12}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Quên mật khẩu</h5>
                        <p>Vui lòng điền thông tin!</p>
                      </div>
                    </Col>
                    <Col md={5} xs={12} className="align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="login__logo">
                    <a href="http://thanhhoang.vn">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title bg-light fix-logo">
                          <img
                            src={logo}
                            alt=""
                            height="34"
                          />
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className={hideMessage ? "d-none" : null}>
                    {response.status && <Alert color={response.status === 200 ? "success" : "danger"} role="alert">{message}</Alert>}
                  </div>
                  <div className="p-2">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleValidSubmit}
                      validationSchema={validationSchema}
                      enableReinitialize
                    >
                      {formikProps => {
                        const { isSubmitting, values, touched, errors } = formikProps;
                        // console.log({ values, touched, errors })
                        return (
                          <Form >
                            <Row>
                              <Col md="12" xl="12" >
                                <FastField
                                  name="ten_dang_nhap"
                                  component={InputFieldForgetPass}

                                  label="Email"
                                  placeholder="Nhập email..."
                                  type="email"
                                  autoFocus={true}
                                />
                              </Col>
                            </Row>
                            <Row className="mt-3">
                              <Col className="text-end">
                                <button
                                  className="btn btn-primary w-md "
                                  type="submit"
                                  disabled={disabledBtn}
                                >
                                  Gửi yêu cầu
                                </button>
                              </Col>
                            </Row>
                          </Form>
                        )
                      }}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Trở về trang{" "}
                  <Link to="dang-nhap" className="font-weight-medium text-primary">
                    Đăng nhập
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Thành Hoàng{" "}
                  <i className="mdi mdi-heart text-danger" /> được phát triển bởi <a href="https://trieudo.net" target="_blank">TRIEUDO Co,. Ltd</a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
