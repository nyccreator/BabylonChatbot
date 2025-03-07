import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopUp from "./PopUp";

export default function LoginPopUp({ isOpen, setIsOpen, setSignupPopup }) {
	const queryClient = useQueryClient();

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

	const { mutate, isError, error } = useMutation({
		mutationFn: login,
		onSuccess: () => {
			setIsOpen(false);
			queryClient.invalidateQueries("user");
		},
	});

	const handleLogin = (event) => {
		event.preventDefault();
		mutate({
			username: event.target.username.value,
			password: event.target.password.value,
		});
	};

	if (isError) {
		console.error(error);
	}

	return (
		<PopUp
			trigger={isOpen}
			onClose={() => setIsOpen(false)}
			closeOnClickOff={false}
		>
			<form autoComplete="off" onSubmit={handleLogin}>
				<div className="relative flex flex-col items-center justify-center gap-10 pt-10">
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
						value="Log in"
						className=" rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black cursor-pointer hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
					/>
				</div>
			</form>
			<div className="flex justify-center pt-4 text-center">
				<p>
					Don't have an account?{" "}
					<a
						onClick={() => {
							setIsOpen(false);
							setSignupPopup(true);
						}}
						className="hover:underline text-babylon-blue-dark cursor-pointer font-semibold"
					>
						{" "}
						Sign up
					</a>
					.
				</p>
			</div>
		</PopUp>
	);
}
