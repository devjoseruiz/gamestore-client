import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (response?.statusCode === 400 || !response) {
        toast.error("Error updating email", {
          theme: "colored",
        });
      } else {
        toast.success("Email updated!", {
          theme: "colored",
        });
        formik.handleReset();
        setReloadUser();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Edit your email address <span>(current address: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Your new email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatemail"
            placeholder="Repeat your new email"
            onChange={formik.handleChange}
            value={formik.values.repeatemail}
            error={formik.errors.repeatemail}
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
    email: "",
    repeatemail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required("Email field is mandatory")
      .oneOf([Yup.ref("repeatemail")], true),
    repeatemail: Yup.string()
      .email(true)
      .required("This field is mandatory")
      .oneOf([Yup.ref("email")], true),
  };
}
