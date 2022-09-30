import { useEffect, useState } from 'preact/hooks';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { User } from './interfaces';

export function App(props: { loggedInUser: User | undefined }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if(showMobileMenu) {
      setShowUserMenu(false);
    }
  }, [showMobileMenu]);

  useEffect(() => {
    if(showUserMenu) {
      setShowMobileMenu(false);
    }
  }, [showUserMenu]);

  return (
    <>
      <nav>
        <button class={'menuButton ' + showMobileMenu} onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Link to="/">
          <h2>Ranker</h2>
        </Link>
        <ul>
          <li class="normalMenuItems">
            <NavLink to="/" style={({ isActive }: { isActive: boolean }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none'
              };
            }}>Home</NavLink>
          </li>
          <li class="normalMenuItems">
            <NavLink to="/servers" style={({ isActive }: { isActive: boolean }) => {
              return {
                textDecoration: isActive ? 'underline' : 'none'
              };
            }}>Servers</NavLink>
          </li>
          <li class="normalMenuItems">
            <a href={'https://discord.com/api/oauth2/authorize?client_id=' + import.meta.env.VITE_CLIENT_ID + '&permissions=268445697&scope=bot%20applications.commands'} target="_blank">Invite</a>
          </li>
          <li class="userContainer">
            <button class={'darko ' + showUserMenu} onClick={() => {
              if (props.loggedInUser) {
                setShowUserMenu(!showUserMenu);
              } else {
                location.href = 'https://discord.com/api/oauth2/authorize?client_id=' + import.meta.env.VITE_CLIENT_ID + '&redirect_uri=' + encodeURIComponent(window.location.origin + '/') + 'callback&response_type=code&scope=guilds%20identify';
              }
            }}>
              <img src={props.loggedInUser ? props.loggedInUser?.avatar ? ('https://cdn.discordapp.com/avatars/' + props.loggedInUser?.id + '/' + props.loggedInUser?.avatar + '.png?size=32') : 'https://cdn.discordapp.com/embed/avatars/5.png' : 'https://cdn.discordapp.com/embed/avatars/1.png'}></img>
              <h3>{props.loggedInUser ? props.loggedInUser?.username + '#' + props.loggedInUser?.discriminator : 'Sign in'}</h3>
            </button>
            {showUserMenu ? <ul class="userMenu">
              <li>
                <button class="darko" onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}>Sign out</button>
              </li>
            </ul> : null}
          </li>
        </ul>

        {showMobileMenu ? <ul class="mobileMenu">
          <li onClick={() => setShowMobileMenu(false)}>
            <NavLink className="fakeButton darko" to="/" style={({ isActive }: { isActive: boolean }) => {
              return {
                backgroundColor: isActive ? '#FFACAC' : ''
              };
            }}>Home</NavLink>
          </li>
          <li onClick={() => setShowMobileMenu(false)}>
            <NavLink className="fakeButton darko" to="/servers" style={({ isActive }: { isActive: boolean }) => {
              return {
                backgroundColor: isActive ? '#FFACAC' : ''
              };
            }}>Servers</NavLink>
          </li>
          <li onClick={() => setShowMobileMenu(false)}>
            <a class="fakeButton darko" href={'https://discord.com/api/oauth2/authorize?client_id=' + import.meta.env.VITE_CLIENT_ID + '&permissions=268445697&scope=bot%20applications.commands'} target="_blank">Invite</a>
          </li>
        </ul> : null}

        {showUserMenu ? <ul class="mobileMenu">
          <li>
            <button class="darko" onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}>Sign out</button>
          </li>
        </ul> : null}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
