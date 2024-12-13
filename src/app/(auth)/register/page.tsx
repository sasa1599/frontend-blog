"use client";

import React, { useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
 // Atau gunakan fetch untuk request API
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Validation schema menggunakan Yup
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string()
    .oneOf(["User", "Admin"], "Role must be either 'User' or 'Admin'")
    .required("Role is required"),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "User" | "Admin";
}

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initial form values
  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("${process.env.NEXT_BASE_URL_BE}/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      // await axios.post("/api/auth/", user);
      alert("User successfully added!");
      router.push("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
      // alert(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-teal-700">
          Register Form
        </h1>
        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            handleAdd(values);
            actions.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form className="flex flex-col gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
                  >
                    Username:
                  </label>
                  <Field
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    placeholder="Username"
                  />
                  {touched.username && errors.username && (
                    <div className="text-red-500 text-xs">
                      {errors.username}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
                  >
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
                  >
                    Password:
                  </label>
                  <Field
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-xs">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
                  >
                    Confirm Password:
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    placeholder="Confirm Password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="text-red-500 text-xs">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
                  >
                    Role:
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Field>
                  {touched.role && errors.role && (
                    <div className="text-red-500 text-xs">{errors.role}</div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-5 py-3 text-center text-white bg-teal-700 hover:bg-teal-800 disabled:bg-teal-300 disabled:cursor-not-allowed rounded-lg text-sm sm:text-base font-medium transition duration-200 ease-in-out"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Register"
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
