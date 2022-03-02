import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator'
import { Col } from "reactstrap"
import ReactTagInput from "../Custom/react-tag-input";
import "../Custom/react-tag-input/index.css";
// import { handleInputChange } from "react-select/src/utils"

const THeadInputFilter = props => {
  const label = props.label
  const inputName = props.name
  const inputValues = props.values
  const setParams = props.onChange
  const placeholder = props.placeholder



  const handleChange = (value) => {
    const array = [];
    for (let i = 0; i < value.length; i++) {
      const result = String(value[i]).trim();
      array.push(result)
    }
    setParams(preState => (
      {
        ...preState,
        [inputName]: array !== '' ? array : value,
        ['trang']: 1
      }
    ))
  }

  return (
    <React.Fragment>
      <label className="control-label cursor-pointer">
        {label}
      </label>
      <div className="fix-overflow">
        <ReactTagInput
          tags={inputValues}
          placeholder={placeholder}
          editable={true}
          readOnly={false}
          removeOnBackspace={true}
          onChange={
            (item) => handleChange(item)
          }
        />
      </div>
    </React.Fragment>
  )
}

THeadInputFilter.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default THeadInputFilter
