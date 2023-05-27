import React from "react";
import PropTypes from "prop-types";

const Icon = ({ id, height, width, ...props }) => (
  <svg width={width} height={height} {...props}>
    <use
      xlinkHref={`${process.env.PUBLIC_URL}/svgs/icon-sprite.svg#${id}`}
    />
  </svg>
);

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
  // type: PropTypes.oneOf(['text', 'password', 'number', 'tel']).isRequired,
  // size: PropTypes.oneOf(['small', 'medium', 'large']),
  // onChange: PropTypes.func,
  // onKeyDown: PropTypes.func,
};

Icon.defaultProps = {
  height: "40px",
  width: "40px"
};

export default Icon;
