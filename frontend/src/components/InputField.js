import { useState } from "react";
import PropTypes from "prop-types";
import { validateInput } from "../utilities/Validator";
import styled from "styled-components";

const InputField = ({
  value,
  placeholder,
  validators,
  type,
  required,
  onChange,
  fontAwesomeIcon,
}) => {
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setError(validateInput(validators, value));
    onChange(value);
  };

  return (
    <div>
      <MainWrapper className="input-group form-group">
        <span className="input-group-text bg-info">
          <i className={fontAwesomeIcon}></i>
        </span>
        <InputWrapper
          className="form-control"
          placeholder={placeholder}
          type={type}
          value={value}
          required={required ? required : ""}
          onChange={handleChange}
        />
      </MainWrapper>
      {error && <ErrorMessageWrapper>{error.message}</ErrorMessageWrapper>}
    </div>
  );
};

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validators: PropTypes.array,
  value: PropTypes.string,
};

InputField.defaultProps = {
  placeholder: "",
  type: "text",
  validators: [],
  value: "",
};

export default InputField;

const MainWrapper = styled.div`
  > span {
    color: white;
  }
`;

const InputWrapper = styled.input`
  width: 100%;
  margin: 0 auto 1rem auto;
  border-radius: 5px;
  height: 2.5rem;
`;

const ErrorMessageWrapper = styled.div`
  color: red;
`;
