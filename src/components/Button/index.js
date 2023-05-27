// import React from 'react';
import PropTypes from "prop-types";
import Icon from "../Icons";
import { ButtonLoader } from "../Loader";
import "./button.css";

export const Button = ({
  type,
  backgroundColor,
  disabled,
  size,
  name,
  className,
  label,
  iconId,
  isLoading,
  iconWidth,
  iconHeight,
  btn2,
  loaderColor,
  ...props
}) => (
  <button
    type={type}
    className={[`${btn2 ? 'btn2' : "btn"}`, `btn--${size} btn--${name}`,`${iconId && "flex items-center" }`, `${className}`,`${disabled ? "disabled" : ""}`].join(" ")}
    style={backgroundColor && { backgroundColor }}
    disabled={disabled}
    {...props}
  >
    {iconId && !isLoading && <div className="mr-2"> <Icon id={iconId} width={iconWidth || "24px"} height={iconHeight || "24px"} /> </div> }
    {isLoading ? <ButtonLoader color={loaderColor ? loaderColor : name==="gift" ? "#E66652" : "#fff"}/> : label}
  </button>
);

Button.propTypes = {
  /**
   * What background color to use
   */
  // name: PropTypes.oneOf(["primary", "secondary", "danger", "tertiary"]),
  /**
   * Is this the principal call to action on the page?
   */
  outline: PropTypes.bool,
  /**
   * What background color to use
   */
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * loading state handler
   */
  isLoading: PropTypes.bool,
  /**
   * additional css Classs
   */
  className: PropTypes.string,
  /**
   * disable the button dynamically
   */
  disabled: PropTypes.bool,

  backgroundColor: PropTypes.string,

  iconId: PropTypes.string,

  iconHeight: PropTypes.string,

  iconWidth: PropTypes.string,
  btn2: PropTypes.bool
};

Button.defaultProps = {
  backgroundColor: "null",
  name: "primary",
  type: "button",
  size: "medium",
  className: "none",
  onClick: undefined,
  isLoading: false,
  disabled: false,
  iconId: ""
};

export default Button;
