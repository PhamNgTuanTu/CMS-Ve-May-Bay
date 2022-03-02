import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Switch from "react-switch"


InputActive.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    switchQuyenTruyCap: PropTypes.bool,
};
InputActive.defaultProps = {
    label: '',
    placeholder: '',
    switchQuyenTruyCap: false,
}

function InputActive(props) {
    const { field, form,
        label, placeholder, switchQuyenTruyCap, setSwitchQuyenTruyCap, OnSymbol, Offsymbol
    } = props;
    const { name, value } = field;


    useEffect(() => {
        switchQuyenTruyCap ? form.setFieldValue(name, 1) : form.setFieldValue(name, 0);
    }, [switchQuyenTruyCap])

    return (
        <>
            {label && <h5 className="font-size-14 mb-3">{label}</h5>}
            <div>
                <Switch
                    uncheckedIcon={<Offsymbol />}
                    checkedIcon={<OnSymbol />}
                    className={switchQuyenTruyCap ? "switch-on me-1 mb-sm-8 mb-2" : "switch-off me-1 mb-sm-8 mb-2"}
                    onColor="#02a499"
                    onChange={() =>
                        setSwitchQuyenTruyCap(!switchQuyenTruyCap)}
                    checked={switchQuyenTruyCap}
                />
            </div>
        </>
    );
}

export default InputActive;