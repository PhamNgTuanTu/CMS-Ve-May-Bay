import { titleCase } from 'helpers/function/function_helper';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback } from 'reactstrap';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
};
SelectField.defaultProps = {
    label: '',
    placeholder: '',
    options: null,
}

function SelectField(props) {
    const { field, form, label, placeholder,options } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    //lấy ra value selected khi edit
    const selectedOption = options && options.find(option => option.value === value);

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
    }

    const customStyles = {
        valueContainer: () => ({
            padding: 13.5,
            width: "80%",
            overflow: "hidden",
        }),
        indicatorSeparator: () => ({
        }),
        input: () => ({
            marginTop: 10,
        }),
        singleValue: (provided, state) => {
            const color = "black";
            const paddingTop = 10;
            return { ...provided, color, paddingTop };
        }
    }

    return (
        <div className="mb-3">
            <div className="form-floating">
                <Select
                    id={name}
                    className={showError ? 'is-invalid has-error' : ''}
                    {...field}
                    value={selectedOption}
                    onChange={handleSelectedOptionChange}
                    options={options}
                    placeholder={placeholder ? placeholder : null}
                    isRequired
                    styles={customStyles}
                />
                {showError && <FormFeedback>{errors[name]}</FormFeedback>}
                {label && <label htmlFor="floatingSelectGrid" style={{ top: "-13px", color: "#979c9f" }}>{titleCase(label)}<span className="required">*</span></label>}
            </div>
        </div>
    );
}

export default SelectField;