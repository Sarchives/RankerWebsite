import { useState, useEffect } from "preact/hooks";
import { Link, Outlet } from "react-router-dom";
import { Guild } from "./interfaces";

export function Servers() {
    const [loaded, setLoaded] = useState(false);
    const [guilds, setGuilds] = useState<Guild[]>([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/commons", {
            headers: new Headers({
                "Code": localStorage.getItem("token") ?? ""
            })
        })
            .then(res => res.json())
            .then(json => {
                if (Array.isArray(json)) {
                    setGuilds(json);
                } else {
                    setGuilds([json]);
                }
                setLoaded(true);
            });
    }, []);

    return (
        <>
            {loaded ? <div class="guildsList">
                {guilds.map(guild => <Link to={"/leaderboard/" + guild.id}>
                <div>
                    <img src={"https://cdn.discordapp.com/icons/" + guild.id + "/" + guild.icon + ".png?size=64"} alt={guild.name} />
                    {guild.name}
                </div>
                </Link>)}
            </div> : <h2>Please wait...</h2>}
            <Outlet />
        </>
    )
}
