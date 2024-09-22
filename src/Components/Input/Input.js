import React, { useState } from "react";
import "./index.css";

const Validation_Regex = {
  NUMBER: /^[0-9]*$/,
  STRING: /^[a-zA-Z ]*$/,
  DECIMAL: /^(100|([0-9][0-9]?(\.[0-9]+)?))$/,
  UPPERCASE: /^[a-zA-Z0-9]*$/,
  EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  RESTRICTED: /^[a-zA-Z0-9 ()'&.,-/]*$/gi,
  RESTRICTED2: /^[a-zA-Z0-9 ()@.,-]*$/gi,
  RESTRICTED3: /^[A-Z0-9_-]*$/gi,
};

const InputField = ({
  name = "Input",
  fontsize,
  placeholder = "",
  width = "100%",
  height = "90px",
  inputHeight = "37px",
  keyname,
  style,
  onBlur,
  onChange,
  onClick,
  maxLength,
  value = "",
  type = "text",
  index = "",
  disable = false,
  toast = false,
  avoidSplChar = false,
  toastMsg = "Required field",
  inputType = "mixedString",
  important = false,
  min,
  max,
  handleKeyDown,
  id = "input_id",
  onKeyPress,
  classNameInLabel = "",
  Error_Message,
}) => {
  const inputProps = {
    style: { ...style, width: width, height: height },
  };
  
  const [errorValue, setErrorValue] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For storing specific error messages

  const _handleOnChange = (e) => {
    const inputValue = e.target.value;

    // Reset error state
    setErrorValue(false);
    setErrorMessage("");

    // Validation based on input type
    switch (inputType) {
      case "number":
        if (!Validation_Regex.NUMBER.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Invalid number format.");
        } else {
          onChange(keyname, inputValue.trim(), index);
        }
        break;

      case "decimal":
        if (!Validation_Regex.DECIMAL.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Invalid decimal value.");
        } else {
          onChange(keyname, inputValue.trim(), index);
        }
        break;

      case "string":
        if (!Validation_Regex.STRING.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Only alphabetic characters are allowed.");
        } else {
          onChange(keyname, inputValue, index);
        }
        break;

      case "upperCase":
        if (!Validation_Regex.UPPERCASE.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Only alphanumeric characters are allowed.");
        } else {
          onChange(keyname, inputValue.toUpperCase(), index);
        }
        break;

      case "restrictedString":
        if (!Validation_Regex.RESTRICTED.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Invalid characters in restricted string.");
        } else {
          onChange(keyname, inputValue, index);
        }
        break;

      case "reasonString":
        if (!Validation_Regex.RESTRICTED2.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Invalid characters in reason.");
        } else {
          onChange(keyname, inputValue, index);
        }
        break;

      case "employeeCode":
        if (!Validation_Regex.RESTRICTED3.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Invalid employee code format.");
        } else {
          onChange(keyname, inputValue.toUpperCase(), index);
        }
        break;

      case "emailType":
        if (!Validation_Regex.EMAIL.test(inputValue)) {
          setErrorValue(true);
          setErrorMessage("Invalid email format.");
        } else {
          onChange(keyname, inputValue.toLowerCase(), index);
        }
        break;

      case "mixedString":
        let mixedValue = avoidSplChar
          ? inputValue.replace(/[^\w\s]/gi, "")
          : inputValue;
        onChange(keyname, mixedValue, index);
        break;

      default:
        onChange(keyname, inputValue, index);
        break;
    }
  };

  return (
    <div className="Dimmenxion-input-container" {...inputProps}>
      {toast && <div className="Dimmenxion-input-toast-con">{toastMsg}</div>}
      <div
        className={`Dimmenxion-input-name-block ${classNameInLabel}`}
        style={{ fontSize: "18px", fontWeight: "bold" }}
      >
        {name}
        {important && <span className="important-field">*</span>}{" "}
      </div>
      <input
        index={index !== "" ? index : 0}
        type={type}
        name={name}
        label={name}
        id={id}
        min={min}
        onBlur={onBlur}
        maxLength={maxLength}
        className={`Dimmenxion-input ${classNameInLabel}_input`}
        placeholder={placeholder !== "" ? placeholder : name}
        style={{ height: inputHeight }}
        onChange={_handleOnChange}
        value={value}
        disabled={disable}
        max={max}
        onKeyDown={handleKeyDown}
        onClick={onClick}
        onKeyPress={onKeyPress}
      />
      {/* Display error message below input */}
      {errorValue && (
        <div className="input_error" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputField;
