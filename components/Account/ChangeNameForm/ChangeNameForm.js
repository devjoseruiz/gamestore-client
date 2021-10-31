import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logout);
      if (!response) {
        toast.error("Error updating user data", {
          theme: "colored",
        });
      } else {
        toast.success("User data updated!", {
          theme: "colored",
        });
        setReloadUser();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Edit your personal data</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Your name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Your last name"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
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

function initialValues(name, lastname) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("Name field is mandatory"),
    lastname: Yup.string().required("Last name field is mandatory"),
  };
}
