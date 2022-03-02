import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Col, FormGroup } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert"

InputFile.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};
InputFile.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
}


function InputFile(props) {
    const { field, form,
        label, placeholder, type
    } = props;
    const { name, value } = field;

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const [files, setFiles] = useState([]);
    const getFileMetadata = file => {
        return {
            lastModified: file.lastModified,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath
        }
    }
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogError, setDialogError] = useState(false)
    const [titleDialog, setTitleDialog] = useState("")
    const [descriptionDialog, setDescriptionDialog] = useState("")

    const inputFile = useRef(null)
    const onButtonClick = () => {
        inputFile.current.click();
    };

    if (value && value.constructor === String) {
        window.$(`.imgupload${name}`).hide();
        window.$(`.imgupload${name}.stop`).hide();
        window.$(`.imgupload${name}.ok`).show();
        window.$(`#img${name}`).css({ "color": "green", "font-weight": 700 });
        window.$(`#img${name}`).html(value);
    }

    const handleChange = (event) => {
        //here we take the file extension and set an array of valid extensions
        let newstate = [];
        var res = window.$(`#${name}`).val();
        var arr = res.split("\\");
        var filename = arr.slice(-1)[0];
        var filextension = filename.split(".");
        var filext = "." + filextension.slice(-1)[0];
        var valid = [".jpg", ".png", ".jpeg"];
        if(event.target.files[0].size > 1048576) {
            inputFile.current.value = ""
            setOpenDialog(true)
            setDialogError(true)
            setTitleDialog("Thông báo")
            setDescriptionDialog("File ảnh phải nhỏ hơn hoặc bằng 1MB!")
            return;
        }
        //if file is not valid we show the error icon, the red alert, and hide the submit button
        if (res && valid.indexOf(filext.toLowerCase()) === -1) {
            window.$(`.imgupload${name}`).hide();
            window.$(`.imgupload${name}.ok`).hide();
            window.$(`.imgupload${name}.stop`).show();

            window.$(`#img${name}`).css({ "color": "red", "font-weight": 700 });
            window.$(`#img${name}`).html("File " + filename + " Sai Định Dạng!");

        } else if (res) {
            for (let i = 0; i < event.target.files.length; i++) {
                let file = event.target.files[i];
                let metadata = getFileMetadata(file);
                let url = URL.createObjectURL(file);
                newstate = [...newstate, { url, metadata }];
                form.setFieldValue(name, file);
            }
            //if file is valid we show the green alert and show the valid submit
            window.$(`.imgupload${name}`).hide();
            window.$(`.imgupload${name}.stop`).hide();
            window.$(`.imgupload${name}.ok`).show();


            window.$(`#img${name}`).css({ "color": "green", "font-weight": 700 });
            window.$(`#img${name}`).html(filename);
            setFiles(newstate);
        }
    }
    // Viết hoa kí tự đầu
    const titleCase = (str) => {
        var capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalizedStr
    }

    return (
        <Col md="12">
            <FormGroup>
                {label && <label>{titleCase(label)}<span className="required">*</span></label>}
                <input type={type}
                    name={name}
                    id={name}
                    ref={inputFile}
                    style={{ display: 'none' }}
                    accept=".png, .jpg, .jpeg"
                    onChange={(event) => handleChange(event)}
                />
            </FormGroup>
            <div className={showError ? "has-error-file control-input" : "control-input"} onClick={onButtonClick}>
                <div className={`imgupload${name}`}>
                    <i className='bx bxs-file-image'></i>
                </div>
                <div className={`imgupload${name} ok mt-3`} id="showImage">
                    {value && value.constructor === String
                        ?
                        <img src={value} height="200" alt={value} className="image-upload" />
                        : files.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item.url} alt="" width="100%" className="px-3" />
                                </div>
                            );
                        })}
                </div>
                <div className={`imgupload${name} stop`}>
                    <i className='bx bx-x'></i>
                </div>
                <p id={`img${name}`} className="px-3 mt-3">{placeholder}</p>
            </div>
            {showError && <div className="show-error">{errors[name]}</div>}


            {openDialog ? (
              <SweetAlert
                title={titleDialog}
                error
                showCloseButton={false}
                showConfirm={false}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Chấp nhận"
                cancelBtnText="Từ chối"
                onConfirm={() => {
                    setOpenDialog(false)
                }}
                  timeout={2000}
              >
                {descriptionDialog}
              </SweetAlert>
            ) : null}
        </Col>
  );
}

export default InputFile;