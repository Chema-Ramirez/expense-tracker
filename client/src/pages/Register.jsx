import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            login(data.user, data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} />
            <input name="email" onChange={handleChange} />
            <input name="password" type="password" onChange={handleChange} />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
