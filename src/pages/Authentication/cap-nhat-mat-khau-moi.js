import React, { useEffect, useState }from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Row, Col, Alert, Card, CardBody, Container, Button, Form } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link, useLocation } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator'
import ValidateInput from "components/Custom/ValidateInput"

// action
import { xacNhanMatKhauMoi } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "assets/images/logo-ThanhHoang.png"
const initInput = {
  mat_khau: "",
  xac_nhan: "",
}
const initError = {
  mat_khau: "Vui lòng nhập mật khẩu",
  xac_nhan: "Vui lòng xác nhận mật khẩu",
}
const ResetMatKhau = props => {
  const dispatch = useDispatch()
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [hideMessage, setHideMessage] = useState(true)
  const [input, setInput] = useState(initInput);
  const [error, setError] = useState(initError);
  const [showErMatKhau, setShowErMatKhau] = useState(false)
  const [showErXacNhan, setShowErXacNhan] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)
  const validator = new SimpleReactValidator({
      validators: {
        mat_khau: {  
          message:'',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\@\#\$\%\^\&\*\(\)\_\-\=\+\"\:\>\<\.\,\/\?\\\|\{\[\}\]]).{6,}$/g) && params.indexOf(val) === -1
          } 
        }
      },
      messages: {
        default: 'Vui lòng nhập ',
        in: 'Mât khẩu không khớp',
        mat_khau: 'Mật khẩu tối thiểu 6 kí tự, bao gồm chữ hoa - thường - số - ký tự đặc biệt'
      }
  });
  let { response } = useSelector(state => ({
    response: state.QuenMatKhau.response,
  }))

  const validateInput = (name, data, error, funcShowError) => {
    var invalid = false;
    if(error[name] !== "") {
      data[name] === "" ? funcShowError(true) : null
      invalid = true
    } else {
      funcShowError(false)
    }
    return invalid 
  }

  const validateForm = () => {
    var checked = 0;
    var valid = false;
    validateInput("mat_khau", input, error, setShowErMatKhau) === true ? 
    checked = checked + 1 : null
    
    validateInput("xac_nhan", input, error, setShowErXacNhan) === true ? 
    checked = checked + 1 : null

    checked > 0 ? valid = false :  valid = true
    //console.log(checked)
    return valid
  }

  const onHandleSubmit = () => {
    if(validateForm() === true) {
      var token  = getToken()
      var params = {
        'token': token,
        'mat_khau_moi': input.mat_khau
      }
      dispatch(xacNhanMatKhauMoi(params))
      setDisabledBtn(true)
      setHideMessage(true)
    }
  }

  const getToken = () => {
    var string = location.search
    var total  = location.search.length
    var start  = string.search("=") + 1
    var token  = string.slice(start, total)
    return token
  }

  useEffect(() => {
    response = {};
  }, [])

  useEffect(() => {
    if(JSON.stringify(response) !== "{}"){
      setMessage(response.message)
      setDisabledBtn(false)
      setHideMessage(false)
    }
  }, [response.id])

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Forget Password | Skote - React Admin & Dashboard Template
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
                  <Row>
                     <Col md={12}>
                       <ValidateInput 
                        simpleReactValidator={validator} 
                        label="mật khẩu" 
                        name="mat_khau" 
                        validate={"required|mat_khau"}
                        value={input.mat_khau}
                        error={error.mat_khau}
                        showError={showErMatKhau} 
                        onSetValue={setInput} 
                        onSetError={setError} 
                        onSetShowError={setShowErMatKhau}
                        type={"password"}
                        >
                      </ValidateInput>
                    </Col>

                    <Col md={12}>
                      <ValidateInput 
                        simpleReactValidator={validator} 
                        label="xác nhân mật khẩu" 
                        name="xac_nhan" 
                        validate={"required|in:" + input.mat_khau}
                        value={input.xac_nhan}
                        error={error.xac_nhan} 
                        showError={showErXacNhan} 
                        onSetValue={setInput}
                        onSetError={setError} 
                        onSetShowError={setShowErXacNhan}
                        type={"password"}
                        >
                      </ValidateInput>
                    </Col>

                    <Col md={12} className="text-end">
                      <Button  type="submit" disabled={disabledBtn} color="primary"  onClick={onHandleSubmit}>
                        Gửi yêu cầu
                      </Button>
                    </Col>
                  </Row>
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

ResetMatKhau.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ResetMatKhau)
