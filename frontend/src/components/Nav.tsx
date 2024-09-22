import postLogout from "../api/services/Logout";
import { User } from "../types/User";
import logo from "./../assets/images/logo.png"

type NavProps = {
    user: User
}

const handleLogout = () => {
    postLogout()
        .then((res) => {
            console.log(res)
            window.location.href = "/"
        })
        .catch((err) => {
            console.log(err)
        })
};

const Nav = ({user}: NavProps) => {

    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between w-full max-w-7xl mx-auto p-4 bg-gray-50 z-10">
                <div className="flex items-center">
                    <img src={logo} alt="FindMyFace Logo" className="w-10 h-10 mr-2" />
                    <span className="text-2xl font-bold text-secondary">FindMyFace</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-4 text-lg font-medium text-gray-700">{user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Logout
                    </button>
                </div>
            </nav>
    )
};

export default Nav;
