import { useState } from "react";
import logo from "./../assets/images/logo.png";
import postLogin from "../api/services/Login";
import { redirect } from "react-router-dom";

const Home = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginUser = async () => {
        const data = { email, password };
        console.log(data);
        postLogin(data)
            .then((res) => {
                console.log(res);
                redirect("/")
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
        <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">FaceBlock</h1>
                <img
                    alt="Your Company"
                    src={logo}
                    className="w-32 h-32"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-colour sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-colour sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => loginUser()}
                            className="flex w-full justify-center rounded-md bg-theme-colour px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-theme-hover-colour focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-colour"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/register" className="font-semibold leading-6 text-theme-colour hover:text-theme-hover-colour">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
};

export default Home;
