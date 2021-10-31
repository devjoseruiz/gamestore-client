import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (response?.statusCode === 400 || !response) {
        toast.error("Error updating password", {
          theme: "colored",
        });
        formik.handleReset();
      } else {
        toast.success("Password updated!", {
          theme: "colored",
        });
        formik.handleReset();
        logout();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-password-form">
      <h4>Edit your password</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Your new password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatpassword"
            type="password"
            placeholder="Repeat your new password"
            onChange={formik.handleChange}
            value={formik.values.repeatpassword}
            error={formik.errors.repeatpassword}
          />
        </Form.Group>
        <Button
          type="submit"
          className="submit"
          loading={loading}
          disabled={loading}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatpassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required("Password field is mandatory")
      .oneOf([Yup.ref("repeatpassword")], true),
    repeatpassword: Yup.string()
      .required("This field is mandatory")
      .oneOf([Yup.ref("password")], true),
  };
}
