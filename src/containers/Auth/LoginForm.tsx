import React, { useEffect, useState } from "react";
import { getAuthRequest } from "../../actions/auth/auth";
import Form, { FormProps } from "./Form";
import { IFormControls } from "./IFormControl";
import { useDispatch } from "react-redux";

const LoginForm =
  (FormComponent: React.FC<FormProps>) =>
  ({ ...props }) => {
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
      },
    });

    const loginHandler = function () {
      dispatch(
        getAuthRequest({
          email: formState.formControls.email.value,
          password: formState.formControls.password.value,
        })
      );
    };

    return (
      <FormComponent
        {...props}
        title="Sign in"
        formState={formState}
        setFormState={setFormState}
        authHandler={loginHandler}
      />
    );
  };

export default LoginForm(Form);
