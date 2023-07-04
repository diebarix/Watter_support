import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(email);
        console.log(pass);
        //Here is going to be the verification
        //of email and password for an existing user
    }

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={pass}
                    placeholder="Enter your password"
                    onChange={e => setPass(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Login</button>
                <div>Don't have an account?
                    <Link to="/register">
                        <button type="button" className={styles.register}>
                            Register Here.
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export { Login };
