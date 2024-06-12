import React, { useState, useEffect } from 'react';
import '../home/home.css';
import { Button, Image } from 'react-bootstrap';
import Img from "../assets/copa-america.png";
import Img2 from "../assets/App-logo1.png";

const Home = () => {
    const [groups, setGroups] = useState({});
    const [matches, setMatches] = useState({});
    const [isCodeCorrect, setIsCodeCorrect] = useState(false);
    const [inputCode, setInputCode] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const fixturesUrl = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=9&season=2024';
            const standingsUrl = 'https://api-football-v1.p.rapidapi.com/v3/standings?league=9&season=2024';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '8ad1e05f1bmsh59cfb3876f81052p1d6686jsndcadb822a240',
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                }
            };

            try {
                const [fixturesResponse, standingsResponse] = await Promise.all([
                    fetch(fixturesUrl, options),
                    fetch(standingsUrl, options)
                ]);

                if (fixturesResponse.ok) {
                    const fixturesResult = await fixturesResponse.json();
                    const matchesByDate = fixturesResult.response.reduce((acc, match) => {
                        const date = new Date(match.fixture.date).toLocaleDateString();
                        const matchInfo = {
                            id: match.fixture.id,
                            team1: match.teams.home.name,
                            photoTeam1: match.teams.home.logo,
                            team2: match.teams.away.name,
                            photoTeam2: match.teams.away.logo,
                            fechaPartido: new Date(match.fixture.date).toLocaleString(),
                            golesTeam1: match.goals.home,
                            golesTeam2: match.goals.away,
                            fullTime: match.fixture.status.short === "FT"
                        };

                        if (!acc[date]) {
                            acc[date] = [];
                        }

                        acc[date].push(matchInfo);
                        return acc;
                    }, {});
                    setMatches(matchesByDate);
                } else {
                    console.error('Error fetching fixtures:', fixturesResponse.status, fixturesResponse.statusText);
                }

                if (standingsResponse.ok) {
                    const standingsResult = await standingsResponse.json();
                    if (standingsResult.response && standingsResult.response.length > 0) {
                        const league = standingsResult.response[0].league;
                        if (league && league.standings && league.standings.length > 0) {
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
                            setGroups(groupsByTeam);
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
        };

        fetchData();
    }, []);

    const checkCode = () => {
        const correctCode = '1234'; // Código correcto
        if (inputCode === correctCode) {
            setIsCodeCorrect(true);
        } else {
            alert('Código incorrecto, por favor intente nuevamente.');
        }
    };

    const handleInputChange = (matchId, team, e) => {
        const { value } = e.target;
        const updatedMatches = { ...matches };
        const matchToUpdate = updatedMatches[team].find(match => match.id === matchId);
        if (matchToUpdate) {
            matchToUpdate.result = value;
            setMatches(updatedMatches);
        }
    };

    return (
        <div className="App">
            {!isCodeCorrect && (
                <div className="overlay">
                    <div className="overlay-content">
                        <Image src={Img2} style={{ width: "50%" }} />
                        <h2 style={{ color: "black" }}>Ingrese el código</h2>
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                        <Button style={{ marginTop: "5%" }} onClick={checkCode}>Registrar código</Button>
                    </div>
                </div>
            )}
            <main className="content">
                <Image src={Img} className="background-image" />
                <Button onClick={() => window.location.reload()}>Cargar Datos</Button>
                <div className="grid">
                    {Object.keys(matches).map(date => (
                        <div key={date}>
                            <h3>{date}</h3>
                            <div className="grid-container">
                                {matches[date].map(match => (
                                    <div key={match.id} className="match">
                                        <div className="fecha">
                                            {match.fechaPartido}
                                        </div>
                                        <div className="team">
                                            <Image src={match.photoTeam1} alt={match.team1} />
                                            <span>{match.team1}</span>
                                            <input
                                                type="text"
                                                placeholder="Resultado"
                                                value={match.result || ''}
                                                onChange={(e) => handleInputChange(match.id, 'matches', e)}
                                            />
                                        </div>
                                        <div className="vs">VS</div>
                                        <div className="team">
                                            <Image src={match.photoTeam2} alt={match.team2} />
                                            <span>{match.team2}</span>
                                            <input
                                                type="text"
                                                placeholder="Resultado"
                                                value={match.result || ''}
                                                onChange={(e) => handleInputChange(match.id, 'matches', e)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="center-column">
                    <h2>Grupos</h2>
                    {Object.keys(groups).map(group => (
                        <div key={group}>
                            <h3>{group}</h3>
                            {groups[group].map((team, index) => (
                                <div key={index} className="team">
                                    <Image src={team.fotoEquipo} alt={team.equipo} />
                                    <span>{team.equipo}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Centro Comercial Mall Plaza. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
