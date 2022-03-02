import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

InputFieldForgetPass.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    format: PropTypes.string,
};
InputFieldForgetPass.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    autoFocus: false,
    format: '',
}

function InputFieldForgetPass(props) {
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
    return (
        <FormGroup>
            {label && <Label for={name}>{titleCase(label)}</Label>}
            <Input
                invalid={showError ? true : false}
                id={name}
                {...field}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                disabled={disabled}
            />
            {showError && <FormFeedback>{errors[name]}</FormFeedback>}
        </FormGroup>
    );
}

export default InputFieldForgetPass;