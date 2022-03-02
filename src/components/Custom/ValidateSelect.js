import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator'
import { Col } from "reactstrap"

const ValidateSelect = props => {
  const label = props.label
  const inputName = props.name
  const value = props.value
  const error = props.error
  const showError = props.showError
  const setValue = props.onSetValue
  const setError = props.onSetError
  const setShowError = props.onSetShowError

  const onChangeSelect = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (value === Number(0)) {
      setShowError(true)
    } else {
      setShowError(false)
    }
    setValue(preState => ({ ...preState, [inputName]: Number(value) }));
    setError(preState => ({ ...preState, [inputName]: error }));
  }

  const titleCase = (str) => {
    var capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalizedStr
  }

  return (
    <React.Fragment>
      <div className={showError ? "text-danger mb-3" : "mb-3"}>
        <div className="form-floating">
          <select name={inputName} onChange={onChangeSelect} defaultValue={value} className={showError ? "invalid-input form-select" : "form-select"}>
            <option >{"Chọn " + label + "..."} </option>
            <option value={1}>Admin</option>
          </select>
          <label htmlFor="floatingSelectGrid">{titleCase(label)}<span className="required">*</span></label>
        </div>
        <div className="validate-error">{showError ? error : ""}</div>
      </div>
    </React.Fragment>
  )
}

ValidateSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  showError: PropTypes.bool,
  onSetValue: PropTypes.func,
  onSetError: PropTypes.func,
  onSetShowError: PropTypes.func
}

export default ValidateSelect
