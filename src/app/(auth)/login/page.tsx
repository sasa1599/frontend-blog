"use client";

import React, { useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSession from "@/hooks/useSession";
// import useSession from "@/hooks/useSession";

const LoginSchema = Yup.object().shape({
  data: Yup.string().required("Username or Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});

interface FormValues {
  data: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setIsAuth, setUser } = useSession();

  // const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: FormValues) => {
    try {
      const res = await fetch("${process.env.NEXT_BASE_URL_BE}/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setIsAuth(true);
      setUser(result.user);

      toast.success(result.message);
      router.push("/");
      setIsAuth(true);
      setUser(null);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-teal-700">
            Login
          </h1>
          <Formik
            initialValues={{ data: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              handleLogin(values);
              actions.resetForm();
            }}
          >
            {(props: FormikProps<FormValues>) => {
              const { handleChange, values, touched, errors } = props;
              return (
                <Form className="flex flex-col gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="data"
                      className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
                    >
                      Username or Email:
                    </label>
                    <Field
                      type="text"
                      name="data"
                      onChange={handleChange}
                      value={values.data}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                      placeholder="Enter your username or email"
                    />
                    {touched.data && errors.data && (
                      <div className="text-red-500 text-xs">{errors.data}</div>
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
                      placeholder="Enter your password"
                    />
                    {touched.password && errors.password && (
                      <div className="text-red-500 text-xs">
                        {errors.password}
                      </div>
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
                      "Login"
                    )}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
