import postLogout from "../api/services/Logout";
import { User } from "../types/User";
import logo from "./../assets/images/logo.png"

type ProfileProps = {
    user: User
}

const Profile = ({ user }: ProfileProps) => {

    const logoutUser = () => {
        postLogout()
            .then((res) => {
                console.log(res)
                window.location.href = "/"
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <div className="w-full bg-gray-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img src={logo} alt="FaceBlock Logo" className="w-8 h-8 mr-2" />
                        <span className="text-xl font-bold text-secondary">FaceBlock</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-4 text-sm font-medium text-gray-700">Welcome, {user.email}</span>
                        <button
                            type="button"
                            className="py-2 px-4 rounded-md text-white bg-tertiary hover:bg-tertiary-dark focus:ring-4 focus:ring-tertiary-light focus:ring-opacity-50 focus:outline-none text-sm font-semibold"
                            onClick={logoutUser}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
