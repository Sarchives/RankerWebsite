import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GuildLeaderboard } from './interfaces';

export function Leaderboard() {
    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [style, setStyle] = useState('');
    const [newStyle, setNewStyle] = useState('');
    const [guild, setGuild] = useState<GuildLeaderboard>();
    const [showCustomizeRank, setShowCustomizeRank] = useState(false);
    let page = 0;
    let scrollDone = true;
    let params = useParams();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetch(import.meta.env.VITE_API_URL + '/style/' + params.guildId, {
                headers: new Headers({
                    'Code': localStorage.getItem('token') ?? ''
                })
            })
                .then(res => res.json())
                .then(result => {
                    setLoggedIn(true);
                    setStyle(result.style ?? 'zeealeid');
                }
                )
        }

        fetch(import.meta.env.VITE_API_URL + '/levels/' + params.guildId + '?page=' + page, {
            headers: new Headers({
                'Code': localStorage.getItem('token') ?? ''
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
                        'Code': localStorage.getItem('token') ?? ''
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

    useEffect(() => {
        if (showCustomizeRank) {
            document.body.className = 'opacitied';
        } else {
            document.body.className = '';
        }
    }, [showCustomizeRank]);

    return (<>
        {showCustomizeRank ? <div class="dialog">
            <h2>Customise your rank card</h2>
            <h4>Which style would you like to use?</h4>
            <div class="radio">
                <input type="radio" id="zeealeid" name="style" value="zeealeid" checked={style === 'zeealeid' || newStyle === 'zeealeid'} onChange={() => setNewStyle('zeealeid')} />
                <label for="zeealeid">Zeealeid (default)</label><br />
                <input type="radio" id="fleuron" name="style" value="fleuron" checked={style === 'fleuron' || newStyle === 'fleuron'} onChange={() => setNewStyle('fleuron')} />
                <label for="fleuron">Fleuron</label><br />
                <input type="radio" id="custom" name="style" value="custom" checked={style === 'custom' || newStyle === 'custom'} onChange={() => setNewStyle('custom')} />
                <label for="custom">Custom (HTML/CSS)</label>
            </div>
            <div class="buttons">
                <button class="darko" onClick={() => {
                    fetch(import.meta.env.VITE_API_URL + '/style/' + params.guildId, {
                        method: 'POST',
                        headers: new Headers({
                            'Code': localStorage.getItem('token') ?? '',
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({ style: newStyle })
                    })
                        .then(res => res.json())
                        .then(result => {
                            setShowCustomizeRank(false);
                            setStyle(result.style);
                            setNewStyle('');
                        })
                }}>Save</button>
                <button class="darko" onClick={() => {
                    setShowCustomizeRank(false);
                    setNewStyle('');
                }}>Cancel</button>
            </div>
        </div> : null}
        {loaded ? <>
            <div class="leaderboardBanner">
                <div>
                    <img src={'https://cdn.discordapp.com/icons/' + params.guildId + '/' + guild?.guild.icon + '.png?size=128'} />
                    <h2>{guild?.guild.name}</h2>
                    <h4><i>{guild?.guild.description ?? 'No description'}</i></h4>
                    <div>
                        {loggedIn ? <button onClick={() => setShowCustomizeRank(true)}>Customise your rank card</button> : null}
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
                            <div class={'rankCircle ' + (rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronce' : 'normal')}>
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
                                            stroke: '#FFEDED'
                                        },
                                        path: {
                                            stroke: '#FFACAC'
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
                    {(guild?.roles.length ?? 0) > 0 ? <div class="righty">
                        <h2>Role rewards</h2>
                        {guild?.roles.map(role => <h4>Level {role.level} - {role.roleName}</h4>)}
                    </div> : null}
                    <div class="righty">
                        <h2>How do I get XP?</h2>
                        <p>Every minute, you get between {guild?.settings.minRange} and {(guild?.settings.maxRange ?? 26) - 1} XP.</p>
                    </div>
                </div>
            </div>
        </> : <h2>Please wait...</h2>}
    </>
    )
}
