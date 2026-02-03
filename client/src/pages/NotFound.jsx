import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Page Not Found</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/">Volver al Inicio</Link>
        </div>
    );
};

export default NotFound;
