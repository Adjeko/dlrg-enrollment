import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const Register = () => {

	const router = useRouter()
	const registerUser = trpc.auth.register.useMutation()

	async function onSubmit(e: any) {
		e.preventDefault();
		let email = e.target[0].value as string
		let password = e.target[1].value as string
		let confirmPassword = e.target[2].value as string
		let firstName = e.target[3].value as string
		let lastName = e.target[4].value as string
		let acceptAgbs = e.target[5].checked as boolean

		registerUser.mutate({ email: email, password: password, name: `${firstName} ${lastName}` })
		
		// router.push("/onboarding");
	}

	return (
		<>
			<div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<img
						className="w-auto h-12 mx-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Register a new account</h2>
					<p className="mt-2 text-sm text-center text-gray-600">
						Or{' '}
						<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
							start your 14-day free trial
						</a>
					</p>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" method="POST" onSubmit={onSubmit}>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email Addresse
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Passwort
								</label>
								<div className="mt-1">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Passwort bestätigen
								</label>
								<div className="mt-1">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							{/* Divider */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center" aria-hidden="true">
									<div className="w-full border-t border-gray-300" />
								</div>
								<div className="relative flex justify-center">
									<span className="bg-white px-2 text-sm text-gray-500">Profil</span>
								</div>
							</div>

							<div>
								<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
									Vorname
								</label>
								<div className="mt-1">
									<input
										id="firstName"
										name="firstName"
										type="text"
										required
										className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
									Nachname
								</label>
								<div className="mt-1">
									<input
										id="lastName"
										name="lastName"
										type="text"
										required
										className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
									/>
									<label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
										Ich akzeptiere die AGBs
									</label>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Registrieren
								</button>
							</div>
						</form>

					</div>
				</div>
			</div>
		</>
	)
}

export default Register