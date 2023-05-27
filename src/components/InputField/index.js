import { useState } from "react";
import PropTypes from "prop-types";
import "./input.css";
import Icon from "../Icons";

/**
 * Primary UI component for user interaction
 */
const InputField = (props) => {
  const { label, type, className, touched, error, value,placeholder,disabled, className2, sharebutton } = props;

  const [showpassword, setShowpassword] = useState(false);

  return (
    <div
      className={`input ${value?.length > 0 ? "is-active" : ""} ${
        touched && error ? "has-errors" : ""
      } ${type === "tel" ? "is-number" : ""}  ${className}`}
    >
      {label && <p className="mb-3">{label}</p>}
      <div className={`flex ${className2} ${sharebutton && "relative"}`}>
        <input
          placeholder={`${type === "tel" ? label : placeholder}`}
          touched={`${touched}`}
          {...props}
          type={showpassword ? "text" : type}
          className={`input-field ${disabled ? "disabled" : "" } ${className2}`}
        />
        {type === "password" && (
          <div
            className="show-password cursor-pointer"
            onClick={() => setShowpassword(!showpassword)}
          >
            {showpassword ? <Icon id="hide-password-icon" width="24px" height="24px" /> : <Icon id="show-password-icon" width="24px" height="24px" />}
          </div>
        )}
        {sharebutton && <div className="cursor-pointer absolute right-4 top-[15%] bg-[#E6002620] p-1" ><Icon id="send-message-icon-red" width="24px" height="24px" /></div>}

      </div>
      {touched && error && <div className="error-message">{error}</div>}
    </div>
    // <div
      // className={`input ${value?.length > 0 ? "is-active" : ""} ${
      //   touched && error ? "has-errors" : ""
      // } ${type === "tel" ? "is-number" : ""}  ${className}`}
    // >
    //   {type === "tel" && (
    //     <div className="d-flx country-flag al-i-c">
    //       <p className="country-flag__field">🇳🇬 +234</p>
    //     </div>
    //   )}
    //   <input
    //     placeholder={`${type === "tel" ? label : ""}`}
    //     {...props}
    //     type={showpassword ? "text" : type}
    //     className="input--field"
    //   />
    //   {type !== "tel" && <label className="input--label">{label}</label>}
    //   {touched && error && <div className="input--error-message">{error}</div>}

      // {type === "password" && (
      //   <span
      //     className="show-password"
      //     onClick={() => setShowpassword(!showpassword)}
      //   >
      //     {showpassword ? "Hide" : "Show"}
      //   </span>
      // )}
    // </div>
  );
};

InputField.propTypes = {
  /**
   * To check for errors
   */
  label: PropTypes.string.isRequired,
  /**
   * To check for errors
   */
  error: PropTypes.string,
  /**
   * To add classname
   */
  className: PropTypes.string,
  /**
   * Input types
   */
  type: PropTypes.oneOf(["text", "password", "number", "tel", "email"]).isRequired,
  /**
   * reference to other fuction
   */
  // onChange: PropTypes.func,
  /**
   * Onleydown
   */
  onKeyDown: PropTypes.func,
  value: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  className2: PropTypes.string
};

InputField.defaultProps = {
  error: "",
  className: "",
  onKeyDown: () => {},
  type: "text"
};

export default InputField;
