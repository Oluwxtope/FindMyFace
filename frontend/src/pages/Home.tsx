import { useEffect, useState } from "react";
import { User } from "../types/User";
import currentUser from "../api/services/CurrentUser";
import postLogin from "../api/services/Login";
import Login from "../components/Login";
import Profile from "../components/Profile";

const Home = () => {
    const [user, setUser] = useState<User | null>(null)

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        const getCurrentUser = () => {
            currentUser()
                .then((res) => {
                    setUser(res.data);
                    console.log("user set");
                })
                .catch((err) => {
                    console.log("Not authenticated");
                    console.log(err)
                })
        }
        getCurrentUser();
    }, [])

    // const handleLogin = () => {
    //     navigate('/login');
    // }

    // const handleRegister = () => {
    //     navigate('/register');
    // }

    const handleLogin = () => {
        const data = { email, password };
        console.log(data);
        postLogin(data)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    console.log("Logged in")
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert("Invalid credentials")
                } else {
                    console.log(err);
                }
            })
    }

    return (
        <>
            {user != null ? (<Profile user={user} />) :
                (<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} loginUser={handleLogin} />)}
        </>
    )
}

export default Home;
