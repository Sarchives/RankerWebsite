import { useEffect, useState } from "preact/hooks";
import { useParams } from "react-router-dom"
import { GuildLeaderboard } from "./interfaces";

export function Leaderboard() {
    const [loaded, setLoaded] = useState(false);
    const [guild, setGuild] = useState<GuildLeaderboard>();
    let params = useParams();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/levels/' + params.guildId + '?page=' + 0, {
            headers: new Headers({
                "Code": localStorage.getItem("token") ?? ""
            })
          })
            .then(res => res.json())
            .then(json => {
              setGuild(json)
              setLoaded(true)
            });
    }, []);

  return (
      loaded ? <>
        <div class="leaderboardBanner">
            <div>
                <img src={"https://cdn.discordapp.com/icons/" + params.guildId + "/" + guild?.guild.icon + ".png?size=128"} />
                <h2>{guild?.guild.name}</h2>
                <h4><i>{guild?.guild.description ?? "No description"}</i></h4>
                {guild?.guild.is_joinable ? <button onClick={() => {
                    fetch(import.meta.env.VITE_API_URL + '/invite/' + params.guildId)
                    .then(res => res.json())
                    .then(result => {
                        location.href = result.url;
                    });
                }}>Join server</button> : null}
            </div>
        </div>
        <div class="players">
            {guild?.players.map((player, i) => {
                const rank = i + 1;
                return (<div>
                    <img src={player.avatar} />
                </div>);
            })}
        </div>
      </> : <h2>Please wait...</h2>
  )
}
