import { Repeat } from "@styled-icons/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/user/signUp";
import { Bar } from "../components/Bar";
import { Input } from "../components/Input";
import { Splash } from "../components/Splash";

// branch rules test

export const Signup = () => {
  const goto = useNavigate();
  const [error, setError] = useState("");
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(
        values.password
      )
    ) {
      errors.email = "Password must contain a capital, number and symbol";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: ({ email, password }) => {
      signUp({ email, password }).catch((e) => setError(e.message));
    },
  });

  return (
    <Splash>
      <h1>Sign Up</h1>

      <form onSubmit={formik.handleSubmit}>
        <Bar>
          <Input
            type="email"
            label="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <Input
            type="password"
            label="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button className="bg-primary-1" type="submit">
            Submit
          </button>
          <button
            className="bg-primary-1"
            type="button"
            onClick={() => goto("/signin")}
          >
            {" "}
            <Repeat size={20} /> or sign in
          </button>
        </Bar>
      </form>
      {error}
      {formik.touched.email && formik.errors.email && (
        <span>
          {formik.errors.email} {formik.errors.password}
        </span>
      )}
    </Splash>
  );
};
