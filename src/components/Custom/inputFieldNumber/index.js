import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'helpers/function/function_helper';
import { FormFeedback, Input } from 'reactstrap';

InputFieldNumber.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    format: PropTypes.string,
};
InputFieldNumber.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    autoFocus: false,
    format: '',
}

function InputFieldNumber(props) {
    const { field, form,
        label, placeholder, autoFocus, type, disabled, format,
    } = props;
    const { name } = field;

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    // Viết hoa kí tự đầu
    const titleCase = (str) => {
        var capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalizedStr
    }
    const handleChange = (e) => {
        form.setFieldValue(name, e.target.value.replace(/[^0-9]/g, ""))
    }
    return (
        <div className="mb-3">
            <div className="form-floating">
                <Input
                    invalid={showError ? true : false}
                    id={name}
                    className="form-control"
                    {...field}
                    onChange={(e) => handleChange(e)}
                    type={type}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    disabled={disabled}
                />
                {showError && <FormFeedback>{errors[name]}</FormFeedback>}
                {label && <label>{titleCase(label)}<span className="required">*</span></label>}
                {showError ? null : format && <small style={{ color: "#a9a9a9", fontWeight: 600 }}>{titleCase(format)}</small>}
            </div>
        </div>
    );
}

export default InputFieldNumber;