import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

// User inputs in the form.
type Inputs = {
    email: string;
    pass: string;
}

// Object for processing backend response.
type Response = {
    status: number;
    message: string;
    token: string;
}

// Definition of props passed to the Login component
interface Props {
    setToken: Function;
}

const defaultValues = { email: "", pass: "" };

// Sends POST request to backend with user email and password
// for validating these inputs.
// If they are correct, receives status code 200 and a JSON
// with status code, message and access token.
// If they are not correct, receives status code 400 and a JSON
// with message.
// Returns promise with object which has status, message and token if existent.
async function validateUser(userInput: Inputs): Promise<Response> {
    var status = 500;
    const data = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
    })
    .then(response => {
        status = response.status;
        return response.json();
    })
    .catch(err => {});

    console.log(data.message);
    console.log(data?.token);

    return {
        status: status,
        message: data.message,
        token: data?.token === undefined ? "" : data.token
    };
}

// The props parameter is the useToken hook for redender when
// a valid token is set.
function Login(props: Props) {
    const { register, handleSubmit, formState } = useForm<Inputs>({ defaultValues });
    const { errors } = formState;
    const [validationErr, setValErr] = useState("");

    // Validates inputs and sets the token in sessionStorage if existent.
    // If not: shows error message on the form with setValErr.
    const onSubmit = (data: Inputs) => {
        console.log(data);
        validateUser(data)
        .then(response => {
            if (response.status == 400) {
                setValErr(response.message);
            }
            else {
                setValErr("");
                props.setToken(response.token);
            }
        })
        .catch(err => {});
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email", {
                        required: "Email is required",
                        validate: {
                            maxLength: (v) =>
                                v.length <= 50 || "The email should have at most 50 characters",
                            matchPattern: (v) =>
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                                "Email address should be a valid address",
                    }})}
                    placeholder="Enter your email"
                    className={styles.input}
                />
                <p className={styles.error}>{errors.email?.message}</p>
                <input
                    {...register("pass", {
                        required: "Password is required",
                        validate: {
                            maxLength: (v) =>
                                v.length <= 50 || "The password should have at most 50 characters"
                    }})}
                    type="password"
                    placeholder="Enter your password"
                    className={styles.input}
                />
                <p className={styles.error}>{errors.pass?.message}</p>
                <p className={styles.error}>{validationErr}</p>
                <button type="submit" className={styles.button}>
                    Login
                </button>
                <div>
                    Don't have an account?
                    <Link to="/register">
                        <button type="button" className={styles.register}>
                            Register Here.
                        </button>
                    </Link>
                </div>
            </form>
        </div>
   )
}

export { Login };
