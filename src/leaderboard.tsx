import { useEffect, useState } from "preact/hooks";
import { useParams } from "react-router-dom"
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GuildLeaderboard } from "./interfaces";

export function Leaderboard() {
    const [loaded, setLoaded] = useState(false);
    const [guild, setGuild] = useState<GuildLeaderboard>();
    let page = 0;
    let scrollDone = true;
    let params = useParams();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/levels/' + params.guildId + '?page=' + page, {
            headers: new Headers({
                "Code": localStorage.getItem("token") ?? ""
            })
        })
            .then(res => res.json())
            .then(json => {
                setGuild(json);
                page++;
                setLoaded(true);
            });

        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDone) {
                scrollDone = false
                fetch(import.meta.env.VITE_API_URL + '/levels/' + params.guildId + '?page=' + page, {
                    headers: new Headers({
                        "Code": localStorage.getItem("token") ?? ""
                    })
                })
                    .then(res => res.json())
                    .then(json => {
                        setGuild(oldGuild => {
                            let newGuild = Object.assign({}, oldGuild);
                            newGuild.players = newGuild.players.concat(json.players);
                            return newGuild;
                        })
                        page++;
                    });
                scrollDone = true
            }
        })
    }, []);

    return (
        loaded ? <>
            <div class="leaderboardBanner">
                <div>
                    <img src={"https://cdn.discordapp.com/icons/" + params.guildId + "/" + guild?.guild.icon + ".png?size=128"} />
                    <h2>{guild?.guild.name}</h2>
                    <h4><i>{guild?.guild.description ?? "No description"}</i></h4>
                    <div>
                        <button onClick={() => {
                            
                        }}>Customise your rank card</button>
                        {guild?.guild.is_joinable ? <button onClick={() => {
                            fetch(import.meta.env.VITE_API_URL + '/invite/' + params.guildId)
                                .then(res => res.json())
                                .then(result => {
                                    location.href = result.url;
                                });
                        }}>Join server</button> : null}
                    </div>
                </div>
            </div>
            <div class="leaderboardContainer">
                <div class="players">
                    {guild?.players.map((player, i) => {
                        const rank = i + 1;
                        return (<div>
                            <div class={"rankCircle " + (rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronce" : "normal")}>
                                <h4>{rank}</h4>
                            </div>
                            <img src={player.avatar} />
                            <h3>{player.username}<b>#{player.discriminator}</b></h3>
                            <div class="right">
                                <h5>{player.messages}<h5>MESSAGES</h5></h5>
                                <h5>{player.totalXp}<h5>XP</h5></h5>
                                <div class="levelProgress">
                                    <CircularProgressbarWithChildren value={player.xp / player.nextXp * 100} styles={{
                                        trail: {
                                            stroke: "#FFEDED"
                                        },
                                        path: {
                                            stroke: "#FFACAC"
                                        }
                                    }}>
                                        <h5>{player.level}</h5>
                                        <h5>LEVEL</h5>
                                    </CircularProgressbarWithChildren>
                                </div>
                            </div>
                        </div>);
                    })}
                </div>
                <div class="rightyContainer">
                    <div class="righty">
                        <h2>Role rewards</h2>
                        {guild?.roles.map(role => <h4>Level {role.level} - {role.roleName}</h4>)}
                    </div>
                    <div class="righty">
                        <h2>How do I get XP?</h2>
                        <p>Every minute, you get between {guild?.settings.minRange} and {(guild?.settings.maxRange ?? 26) - 1} XP.</p>
                    </div>
                </div>
            </div>
        </> : <h2>Please wait...</h2>
    )
}
