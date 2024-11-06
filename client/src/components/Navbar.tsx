import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <div>
                <NavLink to="/">Playlist Persona</NavLink>
                <button>
                    ☰
                </button>
                <div>
                    <ul>
                        <li>
                            <NavLink to="/" >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/currentPlaylist">
                                Current Playlist
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;