import { Field } from 'formik';
import { InputGroup } from 'react-bootstrap';
import '../../styles/common/input.css';
import React from 'react';

export type CommonInputProps = {
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  errorText?: string;
  label?: string;
  prefix?: string;
  placeholder?: string;
  name: string;
  unit?: string;
  validate?: (fieldValue: never) => void;
  type?: string;
  opIgnore?: boolean;
};

export type SelectInputProps = CommonInputProps & React.PropsWithChildren;

export const TextInput: React.FC<CommonInputProps> = ({
  autoComplete,
  className,
  disabled,
  errorText,
  label,
  name,
  placeholder,
  prefix,
  unit,
  validate,
  type,
  opIgnore,
  ...props
}) => {
  return (
    <div {...props} className={`${className ?? ''} inputField`}>
      {label !== undefined ? (
        <label className="field-title" htmlFor={`id-${name}`}>
          {label}
        </label>
      ) : null}
      <InputGroup hasValidation>
        {prefix !== undefined ? (
          <InputGroup.Text>{prefix}</InputGroup.Text>
        ) : null}
        <Field
          aria-label={label}
          autoComplete={autoComplete}
          id={`id-${name}`}
          className={`form-control ${
            errorText !== undefined ? 'is-invalid' : ''
          }`}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          validate={validate}
          type={type}
          data-op-ignore={!!opIgnore}
        />
        {unit !== undefined ? <InputGroup.Text>{unit}</InputGroup.Text> : null}
        <span className="invalid-feedback">{errorText}</span>
      </InputGroup>
    </div>
  );
};

export const DropdownMenu: React.FC<SelectInputProps> = ({
  className,
  children,
  disabled,
  errorText,
  label,
  name,
  placeholder,
  unit,
  type,
  opIgnore,
  ...props
}) => {
  return (
    <div {...props} className={`${className ?? ''} inputField`}>
      {label !== undefined ? (
        <label className="field-title" htmlFor={`id-${name}`}>
          {label}
        </label>
      ) : null}
      <InputGroup hasValidation>
        <Field
          id={`id-${name}`}
          as="select"
          className={`
            form-select 
            ${errorText !== undefined ? 'is-invalid' : ''}`}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
          defaultValue={undefined}
          data-op-ignore={!!opIgnore}
        >
          <option hidden value={undefined}></option>
          {children}
        </Field>
        {unit !== undefined ? <InputGroup.Text>{unit}</InputGroup.Text> : null}
        <span className="errorSpace invalid-feedback">{errorText}</span>
      </InputGroup>
    </div>
  );
};
