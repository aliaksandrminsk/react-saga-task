import React from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { IFormControls } from "./IFormControl";
import { Form } from "./Form";
import { getAuthRequest } from "../../actions/auth/auth";
import { GetAuthRequest } from "../../actions/auth/types";

interface DispatchProps {
  auth: (email: string, password: string) => GetAuthRequest;
}

function mapDispatchToProps(): DispatchProps {
  return {
    auth: (email: string, password: string) => getAuthRequest(email, password),
  };
}

class LoginForm extends Form<DispatchProps, IFormControls> {
  state = {
    isFormValid: false,
    serverErrorMessage: "",
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
  };

  loginHandler = () =>
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value
    );
  // .catch(({ response }) => {
  //   let serverErrorMessage = "";
  //   switch (response?.data?.error?.message) {
  //     case "EMAIL_NOT_FOUND":
  //       serverErrorMessage =
  //         "The email you entered is incorrect. Try again.";
  //       break;
  //     case "INVALID_PASSWORD":
  //       serverErrorMessage =
  //         "The password you entered is incorrect. Try again.";
  //       break;
  //     default:
  //       serverErrorMessage = "Something went wrong. Try again.";
  //   }
  //   this.setState({
  //     ...this.state,
  //     serverErrorMessage,
  //   });
  //   console.error("An unexpected error happened:", response?.data);
  // });

  render() {
    return (
      <div className="d-flex justify-content-center flex-grow-1 pt-5">
        <div className="w-100 px-1" style={{ maxWidth: "600px" }}>
          <h2 className="text-center mb-5">Sign in</h2>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Next
            </Button>
            {this.state.serverErrorMessage.trim().length > 0 ? (
              <div className={classes.Error}>
                {this.state.serverErrorMessage}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LoginForm);