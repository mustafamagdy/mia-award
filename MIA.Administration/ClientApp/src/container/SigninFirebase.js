/**
 * Signin Firebase
 */

import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, FormFeedback } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import QueueAnim from "rc-queue-anim";
import { Fab } from "@material-ui/core";
import authActions from "Store/auth/actions";
import { useForm } from "react-hook-form";

// components
import { SessionSlider } from "Components/Widgets";

// app config
import AppConfig from "Constants";

const Signin = ({ loading, login, history }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      userName: "admin",
      password: "admin@123456.com"
    }
  });

  const onUserSignUp = () => {
    history.push("/signup");
  };
  const onSubmit = data => {
    login(data);
  };

  return (
    <QueueAnim type="bottom" duration={2000}>
      <div className="rct-session-wrapper">
        {loading && <LinearProgress />}
        <AppBar position="static" className="session-header">
          <Toolbar>
            <div className="container">
              <div className="d-flex justify-content-between">
                <div className="session-logo">
                  <Link to="/">
                    <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                  </Link>
                </div>
                <div>
                  <a className="mr-15" onClick={() => onUserSignUp()}>
                    Create New account?
                  </a>
                  <Button variant="contained" className="btn-light" onClick={() => onUserSignUp()}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <div className="session-inner-wrapper">
          <div className="container">
            <div className="row row-eq-height">
              <div className="col-sm-7 col-md-7 col-lg-8">
                <div className="session-body text-center">
                  <div className="session-head mb-30">
                    <h2 className="font-weight-bold">Get started with {AppConfig.brandName}</h2>
                    <p className="mb-0">Most powerful ReactJS admin panel</p>
                  </div>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="has-wrapper">
                      <Input
                        innerRef={register({ required: true })}
                        type="mail"
                        name="userName"
                        id="userName"
                        className="has-input input-lg"
                        placeholder="Enter username"
                        invalid={errors.userName}
                      />
                      <span className="has-icon">
                        <i className="ti-email"></i>
                      </span>
                      <FormFeedback>Please enter username</FormFeedback>
                    </FormGroup>
                    <FormGroup className="has-wrapper">
                      <Input
                        innerRef={register({ required: true })}
                        type="Password"
                        name="password"
                        id="password"
                        className="has-input input-lg"
                        placeholder="Password"
                        invalid={errors.password}
                      />
                      <FormFeedback>Please enter password</FormFeedback>
                      <span className="has-icon">
                        <i className="ti-lock"></i>
                      </span>
                    </FormGroup>
                    <FormGroup className="mb-15">
                      <Button color="primary" className="btn-block text-white w-100" variant="contained" size="large" type="submit">
                        Sign In
                      </Button>
                    </FormGroup>
                  </Form>
                  <p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
                  <p className="mb-0">
                    <a target="_blank" href="#/terms-condition" className="text-muted">
                      Terms of Service
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-sm-5 col-md-5 col-lg-4">
                <SessionSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueueAnim>
  );
};

// map state to props
const mapStateToProps = ({ auth }) => {
  const { currentUser: user, loading } = auth;
  return { user, loading };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
