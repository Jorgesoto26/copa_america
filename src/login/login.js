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
    setShowRegisterForm(!showRegisterForm);
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
    if (password === confirmPassword) {
      console.log("Contraseñas coinciden. Puedes continuar con el registro.");
      console.log("Cédula:", cedula);
    } else {
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
              <form action="#">
                <Image src={Img} className="Image"/>
                <h2>Iniciar sesión</h2>
                <div className="input-field">
                  <input type="text" required />
                  <label>Ingrese su correo</label>
                </div>
                <div className="input-field">
                  <input type="password" required />
                  <label>Ingrese la contraseña</label>
                </div>
                <div class="button-container">
                <button class="register-button" type="submit">Iniciar sesión</button>
                </div>
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
              <Image src={Img} style={{ width: "108%" }} />
              <form onSubmit={handleSubmit}>
                <h2>
                  Registrarse
                </h2>
                <div className="form-container">
                  <div className="column">
                    <div className="input-field">
                      <input type="text" required />
                      <label>Nombre</label>
                    </div>
                    <div className="input-field">
                      <input type="email" required />
                      <label>Correo</label>
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        required
                        value={cedula}
                        onChange={handleCedulaChange}
                      />
                      <label>Cédula</label>
                    </div>
                  </div>
                  <div className="column">
                    <div className="input-field">
                      <input type="text" required />
                      <label>Ciudad</label>
                    </div>
                    <div className="input-field">
                      <input type="text" required />
                      <label>Dirección</label>
                    </div>
                    <div className="input-field">
                      <input type="text" required />
                      <label>Número de celular</label>
                    </div>
                  </div>
                </div>
                <div className="form-container">
                  <div className="column">
                    <div className="input-field">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <label>Contraseña</label>
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
                <div class="button-container">
                  <button class="register-button" type="submit">Registrarse</button>
                  <a class="login-link" href="#" onClick={handleRegisterClick}>
                    Iniciar Sesión
                  </a>
                </div>

              </form>
            </div>
          )}
        </div>
      </main>
      <footer>
        <p>
          &copy; 2024 Centro Comercial MallPlaza. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default Login;
