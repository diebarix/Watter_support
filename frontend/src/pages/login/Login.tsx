import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

type Inputs = {
    email: string;
    pass: string;
}

const defaultValues = { email: "", pass: "" };

function Login() {
    const { register, handleSubmit, formState } = useForm<Inputs>({ defaultValues });

    const { errors } = formState;

    const onSubmit = (data: Inputs) => {
        console.log(data);
        //Here the data is send to the backend
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
                                "Email address shold be a valid address",
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
