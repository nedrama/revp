import { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { GameInterface } from "../assets/interfaces";
import { Box, Grid, Paper, Typography } from '@mui/material';

function GameList() {
    const [Game, setGame] = useState<GameInterface[]>();

    useEffect(() => {
        populateGameData().catch((err) => {
            console.log(err)
        });
    }, []);

    const contents = Game === undefined
        ? <p><em>Loading...</em></p>
        :

        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {Game.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Link to={`/games/${item.id}`}>
                            <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                                <Typography variant="h6">{item.title}</Typography>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>


    return (
        <Box sx={{ width: '80%', margin: '0 auto' }} className="content">
            <h1 id="tableLabel">Games</h1>
            {contents}
            </Box>
    );

    async function populateGameData() {
        const response = await fetch('api/Game');
        const data = await response.json();
        setGame(data);
    }
}

export default GameList;