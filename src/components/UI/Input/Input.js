import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

function Input(props) {
  const {
    type = 'text',
    label,
    value,
    onChange,
    valid,
    touched,
    shouldValidate,
    errorMessage,
  } = props;
  const htmlFor = `${type}-${Math.random()}`;
  const isInvalid = !valid && shouldValidate && touched;
  const cls = [classes.Input, isInvalid ? classes.invalid : null].join(' ');

  return (
    <div className={cls}>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} id={htmlFor} value={value} onChange={onChange} />

      {isInvalid && <span>{errorMessage || 'Введите верное значение'}</span>}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  errorMessage: null,
};

export default Input;
