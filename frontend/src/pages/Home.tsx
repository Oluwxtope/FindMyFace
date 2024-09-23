import { useEffect, useState } from "react";
import { User } from "../types/User";
import currentUser from "../api/services/CurrentUser.ts";
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

    return (
        <>
            {user != null ? (<Profile user={user} />) :
                (<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} />)}
        </>
    )
}

export default Home;
