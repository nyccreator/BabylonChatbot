export default function PopUp({
	trigger,
	onClose,
	closeOnClickOff = true,
	children,
}) {
	return (
		trigger && (
			<div className="fixed inset-0 bg-black/20">
				<div
					className="absolute inset-0"
					onClick={closeOnClickOff ? onClose : () => {}}
				/>
				<div className="left-1/6 fixed top-1/4 h-fit w-fit rounded-3xl border-2 border-gray-200 bg-babylon-green p-5 shadow-lg dark:to-babylon-blue-light sm:left-7/20 sm:w-2/6 md:p-10 lg:p-10">
					{children}
				</div>
			</div>
		)
	);
}
