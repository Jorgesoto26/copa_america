import React, { useState, useRef } from 'react';
import '../App.css';
import { Button, Navbar, Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../assets/App-logo.png'

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <nav>
                    <ul>
                        <li>Inicio</li>
                        <li>Participar</li>
                        <li>Resultados</li>
                        <li>Contacto</li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="banner">
                    {/* <img src="/banner-copa-america.png" alt="Copa América 2024" style={{width: '20%'}} /> */}
                    <Image src={logo}
                      style={{ width: 280, height: 'auto', marginBottom: '0%', marginTop: '2%' }}
                  />
                    <h1>Participa en el Sorteo de la Copa América 2024</h1>
                    <button className="btn-primary">Participar Ahora</button>
                </section>
                <section className="participation-form">
                    <h2>Ingresa tu Código de Compra</h2>
                    <form>
                        <input type="text" placeholder="Código de Compra" />
                        <button type="submit" className="btn-submit">Enviar</button>
                    </form>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Centro Comercial Mall Plaza. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
};
export default Home;