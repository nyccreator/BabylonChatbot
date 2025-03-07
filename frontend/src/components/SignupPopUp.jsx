import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopUp from "./PopUp";

export default function SignupPopUp({ isOpen, setIsOpen, setLoginPopup }) {
	const queryClient = useQueryClient();

	const signup = async (signupRequest) => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL}/auth/register`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(signupRequest),
			}
		);
		return response.json();
	};

	const signupMutation = useMutation({
		mutationFn: signup,
		onSuccess: () => {
			queryClient.invalidateQueries("user");
		},
	});

	const login = async (loginRequest) => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL}/auth/login`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginRequest),
			}
		);
		return response.json();
	};

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: () => {
			setIsOpen(false);
			queryClient.invalidateQueries("user");
		},
	});

	const handleSignup = (event) => {
		event.preventDefault();
		signupMutation.mutate({
			name: event.target.name.value,
			username: event.target.username.value,
			password: event.target.password.value,
		});
		loginMutation.mutate({
			username: event.target.username.value,
			password: event.target.password.value,
		});
	};

	if (signupMutation.isError) {
		console.error(signupMutation.error);
	}

	if (loginMutation.isError) {
		console.error(loginMutation.error);
	}

	return (
		<PopUp
			trigger={isOpen}
			onClose={() => setIsOpen(false)}
			closeOnClickOff={false}
		>
			<form autoComplete="off" onSubmit={handleSignup}>
				<div className="relative flex flex-col items-center justify-center gap-10 pt-10">
					<input
						className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
						type="text"
						name="name"
						placeholder="Full name"
						required
					/>
					<input
						className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
						type="text"
						name="username"
						placeholder="Username"
						required
					/>
					<input
						className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
						type="password"
						name="password"
						placeholder="Password"
						required
					/>
					<input
						type="submit"
						value="Sign up"
						className=" rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black cursor-pointer hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
					/>
				</div>
			</form>
			<div className="flex justify-center pt-4">
				<p>
					Already have an account?{" "}
					<a
						onClick={() => {
							setIsOpen(false);
							setLoginPopup(true);
						}}
						className="hover:underline text-babylon-blue-dark cursor-pointer font-semibold"
					>
						{" "}
						Log in
					</a>
					.
				</p>
			</div>
		</PopUp>
	);
}
