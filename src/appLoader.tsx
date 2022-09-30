import { useEffect, useState } from 'preact/hooks';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { App } from './app';
import { Callback } from './callback';
import { Home } from './home';
import { Servers } from './servers';
import { Leaderboard } from './leaderboard';
import { User } from './interfaces';

export function AppLoader() {
    const [loggedInUser, setLoggedInUser] = useState<User>();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch('https://discord.com/api/v9/users/@me', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(result => {
                    setLoggedInUser(result);
                });
        }
    }, [])

    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<App loggedInUser={loggedInUser} />}>
                <Route path="/" element={<Home />} />
                <Route path="servers" element={<Servers />} />
                <Route path="leaderboard/:guildId" element={<Leaderboard />} />
                <Route path="callback" element={<Callback />} />
                <Route path="*" element={<>
                    <h2>Page not found</h2>
                    <p>You seem lost, would you like to go back <Link to="/">home?</Link></p>
                </>} />
            </Route>
        </Routes>
    </BrowserRouter>);
}
