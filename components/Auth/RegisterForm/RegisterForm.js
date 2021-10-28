import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {},
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Name"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Last name"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Username"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Email address"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="submit" className="submit">
          Register
        </Button>
        <Button type="button" onClick={showLoginForm} basic>
          I already have an account
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("Name field is mandatory"),
    lastname: Yup.string().required("Last name field is mandatory"),
    username: Yup.string().required("Username field is mandatory"),
    email: Yup.string().email(true).required("Email field is mandatory"),
    password: Yup.string().required("Password field is mandatory"),
  };
}
