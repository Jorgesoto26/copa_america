import React, { useState } from "react";
import "../App.css";
import "./login.css";
import Img from "../assets/App-logo2.png";
import { Image } from "react-bootstrap";

const Login = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [cedula, setCedula] = useState("");

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCedulaChange = (e) => {
    setCedula(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (password === confirmPassword) {
      // Las contraseñas coinciden, puedes continuar con el registro
      console.log("Contraseñas coinciden. Puedes continuar con el registro.");
      console.log("Cédula:", cedula);
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error
      console.log("Las contraseñas no coinciden. Por favor, intenta de nuevo.");
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="App">
      <main>
        <section className="banner"></section>
        <div className="wrapper">
          {!showRegisterForm ? (
            <div className="login-wrapper">
              {" "}
              {/* Wrapper para iniciar sesión */}
              <form action="#">
                <Image src={Img} />
                <h2>Iniciar sesión</h2>
                <div className="input-field">
                  <input type="text" required />
                  <label>Ingrese su correo</label>
                </div>
                <div className="input-field">
                  <input type="password" required />
                  <label>Ingrese la contraseña</label>
                </div>
                <button type="submit">Iniciar sesión</button>
                <div className="register">
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <a href="#" onClick={handleRegisterClick}>
                      Registrarse
                    </a>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="register-wrapper">
              {" "}
              {/* Wrapper para registro */}
              <Image src={Img} style={{ width: "108%" }} />
              <form onSubmit={handleSubmit}>
                <h2 style={{ position: "absolute", left: "38%", top: "33%" }}>
                  Registrarse
                </h2>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="column">
                    <div className="input-field">
                      <input type="text" required />
                      <label>Ingrese su nombre</label>
                    </div>
                    <div className="input-field">
                      <input type="email" required />
                      <label>Ingrese su correo</label>
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        required
                        value={cedula}
                        onChange={handleCedulaChange}
                      />
                      <label>Ingrese su cédula</label>
                    </div>
                  </div>
                  <div className="column">
                    <div className="input-field">
                      <input type="text" required />
                      <label>Ingrese ciudad</label>
                    </div>
                    <div className="input-field">
                      <input type="text" required />
                      <label>Ingrese dirección</label>
                    </div>
                    <div className="input-field">
                      <input type="text" required />
                      <label>Ingrese su número de celular</label>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="column">
    <div className="input-field">
      <input
        type="password"
        required
        value={password}
        onChange={handlePasswordChange}
      />
      <label>Ingrese la contraseña</label>
    </div>
  </div>
  <div className="column">
    <div className="input-field">
      <input
        type="password"
        required
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <label>Confirmar contraseña</label>
      {!passwordsMatch && (
        <p className="error-message">
          Las contraseñas no coinciden.
        </p>
      )}
    </div>
  </div>
</div>

                <button type="submit">Registrarse</button>
              </form>
            </div>
          )}
        </div>
      </main>
      <footer>
        <p>
          &copy; 2024 Centro Comercial Mall Plaza. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default Login;
