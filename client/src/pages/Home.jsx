import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Controla tus gastos como un banco 💳</h1>
            <p>
                Visualiza tus gastos, analiza tus hábitos y toma decisiones
                financieras con datos claros.
            </p>

            <div className="home-actions">
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/register">Crear cuenta</Link>
            </div>
        </div>
    );
};

export default Home;
