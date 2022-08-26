import { useEffect, useState } from "preact/hooks"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { App } from './app'
import { Callback } from './callback'
import { Home } from './home'

export function AppLoader() {
    const [loggedInUser, setLoggedInUser] = useState<any>();

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
                <Route path="/callback" element={<Callback />} />
                <Route path="*" element={null} />
            </Route>
        </Routes>
    </BrowserRouter>);
}
