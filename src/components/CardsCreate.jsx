import React from "react";
import PageHeader from "../common/pageHeader";
import "./styls/signUp.css";
import Input from "../common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import { useState } from "react";
import cardsService from "../services/cardsService";

import { useNavigate } from "react-router-dom";

const CardsCreate = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image_url: "",
      image_alt: "",
      state: "",
      city: "",
      street: "",
      country: "",
      houseNumber: "",
      zip: "",
    },
    validate: validateFormikUsingJoi({
      title: Joi.string().min(2).max(256).required(),
      subtitle: Joi.string().min(2).max(256).required(),
      description: Joi.string().min(2).max(1024).required(),
      email: Joi.string()
        .min(5)
        .required()
        .email({ tlds: { allow: false } }),
      web: Joi.string()
        .uri({ scheme: ["http", "https"] })
        .allow(""),

      phone: Joi.string()
        .min(9)
        .max(11)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),

      state: Joi.string().allow(""),
      city: Joi.string().required(),
      street: Joi.string().required(),
      country: Joi.string().required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().required(),
      image_url: Joi.string()
        .min(14)
        .regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/)
        .messages({ "string.pattern.base": "Invalid URL string." })
        .allow(""),
      image_alt: Joi.string().min(2).max(256).allow(""),
    }),

    async onSubmit(values) {
      const serverCardBody = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        web: values.web,
        email: values.email,
        phone: values.phone,
        address: {
          state: values.state,
          city: values.city,
          street: values.street,
          country: values.country,
          houseNumber: values.houseNumber,
          zip: values.zip,
        },
        image: {
          url: values.image_url,
          alt: values.image_alt,
        },
      };

      try {
        const { web, image_url, image_alt, ...body } = values;

        if (web) {
          body.web = web;
        }
        if (image_url || image_alt) {
          body.image = {
            url: image_url || "",
            alt: image_alt || "",
          };
        }

        await cardsService.createCard(serverCardBody);
        navigate("/my-cards");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        } else {
          console.error(err);
          setServerError("An  error :");
        }
      }
    },
  });

  const getProps = (name) => {
    return {
      ...form.getFieldProps(name),
      error: form.touched[name] && form.errors[name],
    };
  };

  return (
    <>
      <PageHeader title="Create card" description="Create  new card" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="border p-3 m-5">
              <div className="form-top">
                <div className="form-top-left">
                  <h3>
                    Create new card <i className="bi bi-pencil"></i>
                  </h3>
                  <p>Fill in the form below to Create card:</p>
                </div>
              </div>

              <form onSubmit={form.handleSubmit}>
                {serverError && (
                  <div className="alert alert-danger">{serverError}</div>
                )}
                <div className="row">
                  <Input
                    {...getProps("title")}
                    label="title"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("subtitle")}
                    label="subtitle"
                    type="text"
                    required
                  />
                  <Input
                    {...getProps("description")}
                    label="description"
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
                  <Input {...getProps("web")} label="web" type="text" />
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
                    {...getProps("houseNumber")}
                    label="house number"
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

                <button
                  onClick={() => navigate("/my-cards")}
                  type="submit"
                  className="btn btn-danger me-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!form.isValid}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsCreate;
