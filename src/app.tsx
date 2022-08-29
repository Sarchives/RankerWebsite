import { useState } from "preact/hooks";
import { Outlet, Link, NavLink } from "react-router-dom"
import { User } from "./interfaces";

export function App(props: { loggedInUser: User | undefined }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav>
        <Link to="/">
          <h2>Ranker</h2>
        </Link>
        <ul>
          <li>
            <NavLink to="/" style={({ isActive }: { isActive: boolean }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none'
              };
            }}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/servers" style={({ isActive }: { isActive: boolean }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none'
              };
            }}>Servers</NavLink>
          </li>
          <li>
            <a href={"https://discord.com/api/oauth2/authorize?client_id=" + import.meta.env.VITE_CLIENT_ID + "&permissions=268445697&scope=bot%20applications.commands"} target="_blank">Invite</a>
          </li>
          <li class="avatarButton" onClick={() => {
            if(!props.loggedInUser) {
              location.href = "https://discord.com/api/oauth2/authorize?client_id=" + import.meta.env.VITE_CLIENT_ID + "&redirect_uri=" + encodeURIComponent(window.location.origin + "/") + "callback&response_type=code&scope=guilds%20identify";
            } else {
              setShowUserMenu(!showUserMenu);
            }
          }}>
            <img src={props.loggedInUser ? props.loggedInUser?.avatar ? ("https://cdn.discordapp.com/avatars/" + props.loggedInUser?.id + "/" + props.loggedInUser?.avatar + ".png?size=32") : "https://cdn.discordapp.com/embed/avatars/5.png" : "https://cdn.discordapp.com/embed/avatars/1.png"}></img>
            {showUserMenu ? <ul class="userMenu">
              <li>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                }}>Sign out</button>
              </li>
            </ul> : null}
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
