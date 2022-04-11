import React, { useCallback, useState } from "react";
import { getAuthRequest } from "../../actions/auth/auth";
import Form, { FormProps } from "./Form";
import { IFormControls } from "./IFormControl";
import { useDispatch } from "react-redux";

const RegisterForm = (FormComponent: React.FC<FormProps>) => () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<IFormControls>({
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Please enter a valid email address",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Please enter a correct password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
      name: {
        value: "",
        type: "input",
        label: "Name",
        errorMessage: "Please enter your name",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2,
        },
      },
      surname: {
        value: "",
        type: "input",
        label: "Surname",
      },
    },
  });

  const registerHandler = useCallback(() => {
    dispatch(
      getAuthRequest({
        email: formState.formControls.email.value,
        password: formState.formControls.password.value,
        name: formState.formControls.name.value,
        surname: formState.formControls.surname.value,
      })
    );
  }, [formState]);

  return (
    <FormComponent
      title="Create account"
      formState={formState}
      setFormState={setFormState}
      authHandler={registerHandler}
    />
  );
};

export default RegisterForm(Form);
