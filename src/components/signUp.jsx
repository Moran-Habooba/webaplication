import React from "react";
import PageHeader from "../common/pageHeader";
import "./styls/signUp.css";
import Input from "../common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Swal from "sweetalert2";
import { useCancelNavigate } from "../hook/useCancelNavigate'";

const SignUp = ({ redirect }) => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const handleCancel = useCancelNavigate("/");

  const handlePoPsignUp = () => {
    Swal.fire({
      html: "Registration successfully!</strong>",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",

      email: "",
      phone: "",
      password: "",

      state: "",
      city: "",
      street: "",
      country: "",
      house_number: "",
      zip: "",

      image_url: "",
      image_alt: "",

      isBusiness: false,
    },
    validate: validateFormikUsingJoi({
      first_name: Joi.string().min(2).max(256).required(),
      middle_name: Joi.string().min(2).max(256).allow(""),
      last_name: Joi.string().min(2).max(256).required(),
      email: Joi.string()
        .min(5)
        .required()
        .email({ tlds: { allow: false } }),
      phone: Joi.string()
        .min(9)
        .max(11)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-]).{8,}$"
          )
        )
        .messages({
          "string.pattern.base":
            "Password should be at least 8 characters inclusive !@#$%^&*-.",
        }),

      state: Joi.string().min(2).max(256).allow(""),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      country: Joi.string().min(2).max(256).required(),
      house_number: Joi.number().min(2).max(256).required(),
      zip: Joi.number().min(2).max(256).required(),
      image_url: Joi.string()
        .min(14)
        .regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)
        .messages({ "string.pattern.base": "Invalid URL string." })
        .allow(""),
      image_alt: Joi.string().min(2).max(256).allow(""),
      isBusiness: Joi.boolean().required(),
    }),

    async onSubmit(values) {
      console.log(values);
      const serverBody = {
        name: {
          first: values.first_name,
          middle: values.middle_name,
          last: values.last_name,
        },
        email: values.email,
        phone: values.phone,
        password: values.password,
        address: {
          state: values.state,
          city: values.city,
          street: values.street,
          country: values.country,
          houseNumber: values.house_number,
          zip: values.zip,
        },
        image: {
          url: values.image_url,
          alt: values.image_alt,
        },

        isBusiness: values.isBusiness,
      };

      try {
        await signUp(serverBody);
        handlePoPsignUp();
        if (redirect) {
          navigate(redirect);
        }
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }

  const getProps = (name) => {
    return {
      ...form.getFieldProps(name),
      error: form.touched[name] && form.errors[name],
    };
  };

  return (
    <>
      <PageHeader
        title="Sign-UP"
        description={
          <>
            Dive into a world of exclusive benefits by signing up today. Tailor
            your own experience, engage with our community, and stay ahead with
            early access to the latest features.
            <br />
            Quick and simple, registration is your gateway to a new adventure.
            <strong>Join us now and be part of something special!</strong>
          </>
        }
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="border p-3 m-5">
              <div className="form-top">
                <div className="form-top-left">
                  <h3>
                    Sign up now <i className="bi bi-pencil"></i>
                  </h3>
                  <p>Fill in the form below to get instant access:</p>
                </div>
              </div>

              <form onSubmit={form.handleSubmit}>
                {serverError && (
                  <div className="alert alert-danger ">{serverError}</div>
                )}
                <div className="row">
                  <Input
                    {...getProps("first_name")}
                    label="first name"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("middle_name")}
                    label="middle name"
                    type="text"
                  />
                  <Input
                    {...getProps("last_name")}
                    label="last name"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("email")}
                    label="email"
                    type="email"
                    required
                  />
                  <Input
                    {...getProps("phone")}
                    label="phone"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("password")}
                    label="password"
                    type="password"
                    required
                  />
                  <Input {...getProps("state")} label="state" type="text" />
                  <Input
                    {...getProps("city")}
                    label="city"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("street")}
                    label="street"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("country")}
                    label="country"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("house_number")}
                    label="house_number"
                    type="number"
                    required
                  />
                  <Input
                    {...getProps("image_url")}
                    label="image url"
                    type="text"
                  />
                  <Input
                    {...getProps("image_alt")}
                    label="image alt"
                    type="text"
                  />
                  <Input
                    {...getProps("zip")}
                    label="zip"
                    type="number"
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    {...getProps("isBusiness")}
                    type="checkbox"
                    className="form-check-input"
                    id="businessCheck"
                  />
                  <label className="form-check-label" htmlFor="businessCheck">
                    Sign up as Business
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-danger me-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!form.isValid}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
