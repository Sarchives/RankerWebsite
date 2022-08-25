import { Outlet, Link, NavLink } from "react-router-dom"

export function App() {
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
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
