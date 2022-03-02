import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator'
import { Col } from "reactstrap"

const ValidateInput = props => {
  const label           = props.label
  const validator       = props.simpleReactValidator
  const validate        = props.validate
  const maxLenghtInput  = props.maxLength
  const inputName       = props.name
  const value           = props.value
  const error           = props.error
  const showError       = props.showError
  const setValue        = props.onSetValue
  const setError        = props.onSetError
  const setShowError    = props.onSetShowError
  const type            = props.type
  const format          = props.format
  const [data, setData]           = useState(value)
  const [maxLength, setMaxLength] = useState(maxLenghtInput)
  const [number, setNumber]       = useState(true) 

  const onChangeText = (event) => {
    const value =  event.target.value;
    const name = event.target.name;
    var message = "";
    validator.message(name, value, validate);
    message = validator.errorMessages[name]; //valid -> null
    message !== null ? setShowError(true) : setShowError(false)
    message !== null ? null : message = ""
    message === "Vui lòng nhập "? message = message + label : null
    setData(value);
    setError(preState => ({ ...preState, [inputName]: message }));
  }

  const titleCase = (str) => {
    var capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1); 
    return capitalizedStr
  }

  useEffect(() => {
    setValue(preState => ({ ...preState, [inputName]: data }));
  }, [data])

  const  isNumberKey = (evt) => {
    const value =  evt.target.value;
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if(!(charCode > 31 && (charCode < 48 || charCode > 57))){ 
      setData(value);
    } else {
      evt.preventDefault();
    }
  }
  return (
    <React.Fragment>  
        <div className={showError ? "text-danger mb-3" : "mb-3"}>
          <div className="form-floating">
          <input 
            type={type} 
            name={inputName}
            value={data}  
            maxLength={maxLength} 
            onChange={onChangeText} 
            className={showError ? "invalid-input form-control" : "form-control"} 
            onKeyPress={type === "number" ? isNumberKey : null} />
          <label>{titleCase(label)}<span className="required">*</span></label>
          </div>
          <div className="validate-error">{showError ? error : ""}</div>
          {format && <small style={{ color: "#f46a6a",fontWeight : 600 }}>{format}</small>}
        </div>
    </React.Fragment>
  )
}

ValidateInput.propTypes = {
  simpleReactValidator: PropTypes.any,
  validate: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  onSetValue: PropTypes.func,
  onSetError: PropTypes.func,
  onSetShowError: PropTypes.func,
  maxLength: PropTypes.number,
  type: PropTypes.string,
  format: PropTypes.string,
}
ValidateInput.defaultProps = {
  value : '',
  format: '',
}

export default ValidateInput
