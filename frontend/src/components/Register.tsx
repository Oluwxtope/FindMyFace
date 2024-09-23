import { useState } from "react"
import logo from "./../assets/images/logo.png"
import postRegisterUser from "../api/services/RegisterUser"

const Register = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [verifyPassword, setVerifyPassword] = useState<string>("")
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleRegister = () => {
        if (password === verifyPassword) {
            postRegisterUser(email, password)
                .then((res) => {
                    console.log(res.data.error)
                    if (res.status == 200) {
                        setError(false)
                        window.location.href = '/'
                    } else {
                        setError(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    if (err.response.data.error == "User already exists") {
                        setErrorMessage(`${email} already exists`)
                    }
                    setError(true)
                })
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-screen bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h1 className="text-5xl font-extrabold text-secondary mb-8">FindMyFace</h1>
                <img
                    alt="FindMyFace Logo"
                    src={logo}
                    className="w-36 h-36 mx-auto mb-8"
                />
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6"
                            />
                        </div>

                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Verify Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                name="verify_password"
                                type="password"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6"
                            />
                        </div>

                    </div>


                    {password != verifyPassword ? (
                        <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold"></strong>
                            <span className="block sm:inline">Passwords must match</span>
                        </div>
                    ) : (
                        <></>
                    )}

                    {error ? (
                        <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold"></strong>
                            <span className="block sm:inline">Something went wrong. Please try again.</span>
                        </div>
                    ) : (
                        <></>
                    )}

                    {errorMessage ? (
                        <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold"></strong>
                            <span className="block sm:inline">{errorMessage}</span>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div>
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="flex w-full justify-center rounded-md bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-tertiary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Are you a member?{' '}
                    <a href="/" className="font-semibold leading-6 text-tertiary hover:text-tertiary/80">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
