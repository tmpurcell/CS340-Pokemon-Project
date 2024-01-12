import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements"

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/pokemon">pokemon</NavLink>
                    <NavLink to="/trainers">trainers</NavLink>
                    <NavLink to="/battles">battles</NavLink>
                    <NavLink to="/stats">stats</NavLink>
                    <NavLink to="/trainertopokemon">Trainer-to-Pokemon</NavLink>
                    <NavLink to="/types">types</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar