import { IFormControl, IFormControls, IValidation } from "./IFormControl";
import is from "is_js";
import React from "react";
import Input, { InputProps } from "../../components/UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { errorRequest } from "../../actions/auth/auth";
import classes from "./Auth.module.css";
import { IApplicationState } from "../../reducers";
import Button from "../../components/UI/Button/Button";

export type FormProps = {
  title: string;
  formState: IFormControls;
  setFormState: (state: IFormControls) => void;
  authHandler: () => void;
};

const Form = ({ title, formState, setFormState, authHandler }: FormProps) => {
  const dispatch = useDispatch();
  const serverErrorMessage = useSelector<IApplicationState, string>(
    (state) => state.auth.serverErrorMessage
  );

  const validateControl = (value: string, validation: IValidation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) => {
    const formControls = { ...formState.formControls };
    const control: IFormControl = formControls[controlName];

    control.value = event.target.value;
    if (control.validation) {
      control.touched = true;
      control.valid = validateControl(control.value, control.validation);
    }
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      const valid = formControls[name].valid;
      if (valid != null) {
        isFormValid = valid && isFormValid;
      }
    });

    setFormState({ formControls, isFormValid });
    dispatch(errorRequest({ serverErrorMessage: "" }));
  };

  const renderInputs = () => {
    const formControls = formState.formControls;

    return Object.keys(formControls).map((controlName, index) => {
      const control: IFormControl = formControls[controlName];

      const attributes: InputProps = {
        type: control.type,
        value: control.value,
        label: control.label,
        shouldValidate: !!control.validation,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(event, controlName),
      };

      if (control.validation) {
        attributes.valid = control.valid;
        attributes.touched = control.touched;
        attributes.errorMessage = control.errorMessage;
      }

      return <Input key={controlName + index} {...attributes} />;
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center flex-grow-1 pt-5">
      <div className="w-100 px-1" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-5">{title}</h2>

        <form onSubmit={submitFormHandler} className={classes.AuthForm}>
          {renderInputs()}

          <Button onClick={authHandler} disabled={!formState.isFormValid}>
            Next
          </Button>
          {serverErrorMessage.trim().length > 0 ? (
            <div className={classes.Error}>{serverErrorMessage}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Form;
