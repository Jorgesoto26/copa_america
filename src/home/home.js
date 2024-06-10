import React, { useState, useRef } from 'react';
import '../App.css';
import { Button, Navbar, Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../assets/App-logo.png';

const Home = () => {
    const [groups, setGroups] = useState([]);
    const [matches, setMatches] = useState([]);

    const enviar = async (event) => {
        event.preventDefault(); // Esto previene que el formulario se envíe por defecto
        console.log("enviar...");

        // URL para obtener los fixtures (partidos) de la Copa América 2024
        const fixturesUrl = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=9&season=2024';
        // URL para obtener las standings (clasificaciones/grupos) de la Copa América 2024
        const standingsUrl = 'https://api-football-v1.p.rapidapi.com/v3/standings?league=9&season=2024';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '8ad1e05f1bmsh59cfb3876f81052p1d6686jsndcadb822a240', // Reemplaza con tu clave API válida
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        };

        try {
            // Obtener los partidos
            const fixturesResponse = await fetch(fixturesUrl, options);
            if (fixturesResponse.ok) {
                const fixturesResult = await fixturesResponse.json();
                console.log('Fixtures Result:', fixturesResult); // Añadir esta línea para depuración
                
                // Organizar los partidos por fechas
                const matchesByDate = fixturesResult.response.reduce((acc, match) => {
                    const date = new Date(match.fixture.date).toLocaleDateString();
                    const matchInfo = {
                        team1: match.teams.home.name,
                        photoTeam1: match.teams.home.logo,
                        team2: match.teams.away.name,
                        photoTeam2: match.teams.away.logo,
                        fechaPartido: new Date(match.fixture.date).toLocaleString(),
                        golesTeam1: match.goals.home,
                        golesTeam2: match.goals.away,
                        fullTime: match.fixture.status.short == "FT" ? true : false
                    };

                    if (!acc[date]) {
                        acc[date] = [];
                    }

                    acc[date].push(matchInfo);
                    return acc;
                }, {});
                console.log("matchesByDate",matchesByDate);
                setMatches(matchesByDate); // Almacenar partidos en el estado
            } else {
                console.error('Error fetching fixtures:', fixturesResponse.status, fixturesResponse.statusText);
            }

            // Obtener los grupos/clasificaciones
            const standingsResponse = await fetch(standingsUrl, options);
            if (standingsResponse.ok) {
                const standingsResult = await standingsResponse.json();
                console.log('Standings Result:', standingsResult); // Añadir esta línea para depuración

                if (standingsResult.response && standingsResult.response.length > 0) {
                    const league = standingsResult.response[0].league;
                    if (league && league.standings && league.standings.length > 0) {
                        // Organizar los equipos por grupos
                        const groupsByTeam = league.standings.reduce((acc, groupArray) => {
                            groupArray.forEach(teamStanding => {
                                const group = teamStanding.group || 'Unknown Group';
                                const teamInfo = {
                                    equipo: teamStanding.team.name,
                                    fotoEquipo: teamStanding.team.logo
                                };

                                if (!acc[group]) {
                                    acc[group] = [];
                                }

                                acc[group].push(teamInfo);
                            });
                            return acc;
                        }, {});
                        console.log("groupsByTeam",groupsByTeam);
                        setGroups(groupsByTeam); // Almacenar grupos en el estado
                    } else {
                        console.error('League standings are undefined or empty');
                    }
                } else {
                    console.error('Standings response is undefined or empty');
                }
            } else {
                console.error('Error fetching standings:', standingsResponse.status, standingsResponse.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    }


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
                    <Image src={logo} style={{ width: 280, height: 'auto', marginBottom: '0%', marginTop: '2%' }} />
                    <h1>Participa en el Sorteo de la Copa América 2024</h1>
                    <button className="btn-primary">Participar Ahora</button>
                </section>
                <section className="participation-form">
                    <h2>Ingresa tu Código de Compra</h2>
                    <form onSubmit={enviar}> {/* Usamos onSubmit en el formulario */}
                        <input type="text" placeholder="Código de Compra" />
                        <button type="submit" className="btn-submit">Enviar</button> {/* Quitamos el onClick del botón */}
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
