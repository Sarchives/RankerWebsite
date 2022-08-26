import { useState } from "preact/hooks";
import { Outlet, Link, NavLink } from "react-router-dom"

export function App(props: { loggedInUser: any }) {
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
            <NavLink to="/invite">Invite</NavLink>
          </li>
          <li class="avatarButton" onClick={() => {
            if(!props.loggedInUser) {
              location.href = "https://discord.com/api/oauth2/authorize?client_id=" + import.meta.env.VITE_CLIENT_ID + "&redirect_uri=" + encodeURIComponent(window.location.origin + "/") + "callback&response_type=code&scope=guilds%20identify";
            } else {
              setShowUserMenu(true);
            }
          }}>
            <img src={props.loggedInUser ? ("https://cdn.discordapp.com/avatars/" + props.loggedInUser.id + "/" + props.loggedInUser.avatar + ".png?size=32") : "https://cdn.discordapp.com/embed/avatars/1.png"}></img>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
