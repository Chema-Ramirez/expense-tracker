// Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(form);
            login(res.user, res.token);
            navigate("/dashboard");
        } catch (err) {
            console.error("Login fallido:", err.message);
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
