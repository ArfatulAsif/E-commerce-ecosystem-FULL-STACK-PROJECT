const Navbar = () => {
        return (
                <div className="flex justify-between">
                        <div>
                                LOGO
                        </div>
                        <ul className="flex gap-3">
                                <li>Home</li>
                                <li>About</li>
                                <li>Login</li>
                        </ul>
                </div>
        );
};

export default Navbar;