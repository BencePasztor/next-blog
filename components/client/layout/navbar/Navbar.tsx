import ClientBrand from "./ClientBrand"
import NavList from "./NavList"
import NavLink from "./NavLink"

const Navbar = () => {

    return (
        <nav className="container mx-auto p-4 flex justify-between items-center">
            <ClientBrand />
            <NavList>
                <NavLink href="/about">About</NavLink>
            </NavList>
        </nav>
    )
}

export default Navbar