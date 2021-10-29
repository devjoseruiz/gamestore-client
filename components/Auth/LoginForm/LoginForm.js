import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function LoginForm(props) {
  const { onCloseModal, showRegisterForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        toast.success("User logged in successfully!", {
          theme: "colored",
        });
        onCloseModal();
      } else {
        const message =
          response === null
            ? "Network is unreachable"
            : response?.data[0].messages[0].message;
        toast.error(message, {
          theme: "colored",
        });
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Email address"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="submit" className="submit" loading={loading}>
          Login
        </Button>
        <Button type="button" basic>
          I forgot my password
        </Button>
        <Button type="button" onClick={showRegisterForm} basic>
          I haven't an account yet
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().email(true).required("Email field is mandatory"),
    password: Yup.string().required("Password field is mandatory"),
  };
}
