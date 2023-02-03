import { Field } from 'formik';
import { InputGroup } from 'react-bootstrap';
import '../../styles/common/input.css';
import React from 'react';

export type CommonInputProps = {
  autoComplete?: string;
  disabled?: boolean;
  errorText?: string;
  label?: string;
  placeholder?: string;
  name: string;
  key?: string;
  unit?: string;
  validate?: (fieldValue: never) => void;
  type?: string;
};

export type SelectInputProps = CommonInputProps & React.PropsWithChildren;

export const TextInput: React.FC<CommonInputProps> = ({
  autoComplete,
  disabled,
  errorText,
  label,
  name,
  placeholder,
  key,
  unit,
  validate,
  type,
}) => {
  return (
    <div key={key} className={'inputField'}>
      {label !== undefined ? (
        <label className="fieldTitle" htmlFor={`id-${name}`}>
          {label}
        </label>
      ) : null}
      <InputGroup hasValidation>
        <Field
          id={`id-${name}`}
          className={`form-control ${
            errorText !== undefined ? 'is-invalid' : ''
          }`}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          validate={validate}
          type={type}
        />
        {unit !== undefined ? <InputGroup.Text>{unit}</InputGroup.Text> : null}
        <span className="invalid-feedback">{errorText}</span>
      </InputGroup>
    </div>
  );
};

export const DropdownMenu: React.FC<SelectInputProps> = ({
  children,
  disabled,
  errorText,
  label,
  name,
  placeholder,
  key,
  unit,
  type,
}) => {
  return (
    <div key={key} className={'inputField'}>
      {label !== undefined ? (
        <label className="fieldTitle" htmlFor={`id-${name}`}>
          {label}
        </label>
      ) : null}
      <InputGroup hasValidation>
        <Field
          id={`id-${name}`}
          as="select"
          className={`form-select ${
            errorText !== undefined ? 'is-invalid' : ''
          }`}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
        >
          {children}
        </Field>
        {unit !== undefined ? <InputGroup.Text>{unit}</InputGroup.Text> : null}
        <span className="errorSpace invalid-feedback">{errorText}</span>
      </InputGroup>
    </div>
  );
};
