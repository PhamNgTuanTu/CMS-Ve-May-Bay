import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SimpleReactValidator from 'simple-react-validator'
import { Col } from "reactstrap"

const THeadSort = props => {
  const label         = props.label
  const inputName     = props.name
  const sortDefault   = props.sortDefault
  const acs           = props.asc
  const setParams     = props.onSort
  const active        = props.active
  const setSortActive = props.onActive
  const [sortAsc, setSortAsc]          = useState(true)
  const [classActive, setClassActive]  = useState('') 
  const sort = () => {
    setSortActive(inputName)
  	setSortAsc(!sortAsc)
    sortAsc === true ?
    setParams(preState => ({ ...preState, ['sap_xep']: inputName, ['asc']: 0, ['trang']: 1})) :
    setParams(preState => ({ ...preState, ['sap_xep']: inputName, ['asc']: 1, ['trang']: 1}))
  }

  useEffect(() => {
    acs ? setSortAsc(acs) : null 
  }, [])

  useEffect(() => {
    if(sortDefault) {
      sortDefault === true ?
      setParams(preState => ({ ...preState, ['sap_xep']: inputName, ['asc']: 1, ['trang']: 1})) :
      setParams(preState => ({ ...preState, ['sap_xep']: inputName, ['asc']: 0, ['trang']: 1}))
    }
  }, [])

  useEffect(() => {
    active === inputName ? 
    setClassActive(' is-active') : 
    setClassActive('')
  }, [active])

  return (
    <React.Fragment>
      <div className="custom-thead-filter" onClick={sort}>  
        <label className="control-label cursor-pointer">
          {label}
        </label>
        <i onClick={sort} className={sortAsc === true? "pl-5px fas fa-sort-up" + classActive : "pl-5px fas fa-sort-down" + classActive} ></i>
      </div>  
    </React.Fragment>
  )
}

THeadSort.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onSort: PropTypes.func,
  sortDefault: PropTypes.bool,
  asc: PropTypes.bool,
  active: PropTypes.string,
  onActive: PropTypes.func
}

export default THeadSort
