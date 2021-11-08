import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi } from "../../../api/address";

export default function AddressForm(props) {
  const { setShowModal } = props;

  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      createAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };

    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.error("Error adding address", {
        theme: "colored",
      });
    } else {
      toast.success("New address added!", {
        theme: "colored",
      });
      formik.resetForm();
      setShowModal(false);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="Address identifier"
        placeholder="Address identifier"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Complete name"
          placeholder="Complete name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Address"
          placeholder="Address"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="City"
          placeholder="City"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="State/Region"
          placeholder="State/Region"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalcode"
          type="text"
          label="Postal code"
          placeholder="Postal code"
          onChange={formik.handleChange}
          value={formik.values.postalcode}
          error={formik.errors.postalcode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Phone number"
          placeholder="Phone number"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="actions">
        <Button
          className="submit"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Add address
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required("This field is mandatory"),
    name: Yup.string().required("This field is mandatory"),
    address: Yup.string().required("This field is mandatory"),
    city: Yup.string().required("This field is mandatory"),
    state: Yup.string().required("This field is mandatory"),
    postalcode: Yup.string().required("This field is mandatory"),
    phone: Yup.string().phone().required("This field is mandatory"),
  };
}
