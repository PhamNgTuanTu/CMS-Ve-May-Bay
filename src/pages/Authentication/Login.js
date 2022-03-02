import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link, useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo-ThanhHoang.png"

//Import config
import { facebook, google } from "../../config"

const Login = props => {
  const dispatch = useDispatch()
  const history  = useHistory();

  let { error, response } = useSelector(state => ({
    error: state.Login.error,
    response: state.Login.response
  }))

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history))
  }

  useEffect(() => {
    response = {};
    sessionStorage.getItem("token") ? history.push("/") : null 
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>{process.env.REACT_APP_TITLE}</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5} xs={12}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col md={7} xs={12}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">CMS Thành Hoàng</h5>
                        <p>Vui lòng đăng nhập vào hệ thống</p>
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
                  
                    {response.status && <Alert color={response.status === 200 ? "success" : "danger"} role="alert">{response.message}</Alert>}
                  
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      <div className="mb-3">
                        <AvField
                          name="ten_dang_nhap"
                          label="Tên đăng nhập"
                          value=""
                          className="form-control"
                          placeholder="Nhập tên đăng nhập..."
                          type="text"    
                          validate={{
                            required: {value: true, errorMessage: "Vui lòng nhập tên đăng nhập"},
                          }}
                          autoComplete="off"
                          autoFocus
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="mat_khau"
                          label="Mật khẩu"
                          value=""
                          type="password"
                          validate={{
                            required: {value: true, errorMessage: "Vui lòng nhập mật khẩu"},
                          }}
                          placeholder="Nhập mật khẩu..."
                          autoComplete="off"
                        />
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                      </div>


                      <div className="mt-4 text-center">
                        <Link to="/quen-mat-khau" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Quên mật khẩu
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
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

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
