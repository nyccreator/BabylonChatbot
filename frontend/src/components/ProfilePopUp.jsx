import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PopUp from "./PopUp";

export default function ProfilePopUp({
	name,
	isOpen,
	setIsOpen,
	setLoginPopup,
}) {
	const queryClient = useQueryClient();

	const logout = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_URL}/auth/logout`,
			{
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.json();
	};

	const { mutate, isError, error } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			setIsOpen(false);
			setLoginPopup(true);
			queryClient.invalidateQueries("user");
			queryClient.setQueryData("user", null);
		},
	});

	const handleLogout = (event) => {
		event.preventDefault();
		mutate();
	};

	if (isError) {
		console.error(error.message);
	}

	return (
		<PopUp trigger={isOpen} onClose={() => setIsOpen(false)}>
			<div className="relative flex flex-col items-center justify-center gap-10 pt-6 text-2xl">
				<div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-babylon-blue-dark text-white ring ring-white dark:bg-babylon-blue-light sm:text-base md:h-16 md:w-16 md:text-lg lg:h-16 lg:w-16 lg:text-xl">
					<img
						className="inline-block h-12 w-12 rounded-full ring ring-white md:h-16 md:w-16 lg:h-16 lg:w-16"
						src="/src/assets/user.png"
						alt="logo"
					/>
				</div>
				<p className="flex font-medium text-babylon-blue-dark">{name}</p>
				<form onSubmit={handleLogout}>
					<input
						type="submit"
						value="Log out"
						className="rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black cursor-pointer hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
					/>
				</form>
			</div>
		</PopUp>
	);
}
