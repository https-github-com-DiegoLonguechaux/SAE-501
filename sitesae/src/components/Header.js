import Logo from "./Logo.js";

function Header() {
    return (
        <div>
            <div className="flex flex-col justify-between gap-10 pt-10 pb-10">
                <div className="flex justify-center">
                    <Logo/>
                </div>
            </div>
        </div>

    );
}

export default Header;