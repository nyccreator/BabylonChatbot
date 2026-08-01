import './App.css'
import { ChatInterface } from './components/ChatInterface'
import { PopUp } from './components/PopUp.jsx'
import { StarRating } from './components/StarRating.jsx'
import { useState, useEffect, useRef } from 'react'

export default function App() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [savedUsername, setSavedUsername] = useState('')
	const [savedPassword, setSavedPassword] = useState('')
	const [ratingPopup, setRatingPopup] = useState(false)
	const [profilePopup, setProfilePopup] = useState(false)
	const [faqPopup, setFaqPopup] = useState(false)
	const [isProfileSet, setIsProfileSet] = useState(false)
	const [colorScheme, setColorScheme] = useState('')

	let popUpRef = useRef()

	useEffect(() => {
		let handler = (e) => {
			if (!popUpRef.current.contains(e.target)) {
				/* empty */
			}
		}
		document.addEventListener('mousedown', handler)
		return () => {
			document.removeEventListener('mousedown', handler)
		}
	})

	return (
		<div className={colorScheme}>
			<div className="flex h-dvh w-dvw gap-0 bg-babylon-blue-light dark:bg-babylon-blue-dark">
				<div
					className="z-40 hidden w-1/16 min-w-18 content-center gap-10 bg-babylon-blue-dark p-5 pt-10 dark:bg-babylon-blue-light sm:flex sm:flex-col"
					ref={popUpRef}
				>
					<button className="hover:animate-vote" onClick={() => setProfilePopup(!profilePopup)}>
						<img className="" src="/src/assets/Profile-Icon.png" alt="logo" />
					</button>

					<button className="hover:animate-vote">
						<img className="" src="/src/assets/layout.png" alt="logo" />
					</button>

					<button className="hover:animate-vote" onClick={() => setRatingPopup(!ratingPopup)}>
						<img className="" src="/src/assets/Star-Icon.png" alt="logo" />
					</button>

					<button
						className="hover:animate-vote"
						onClick={() => setColorScheme(colorScheme === 'dark' ? '' : 'dark')}
					>
						{colorScheme === 'dark' ? (
							<img className="" src="/src/assets/moon.png" alt="logo" />
						) : (
							<img className="" src="/src/assets/sun.png" alt="logo" />
						)}
					</button>

					<button className="hover:animate-vote" onClick={() => setFaqPopup(!faqPopup)}>
						<img className="" src="/src/assets/faq.png" alt="logo" />
					</button>

					<PopUp trigger={ratingPopup} onClose={() => setRatingPopup(false)}>
						<h3 className="flex justify-center pt-10 text-2xl font-medium text-babylon-blue-dark">
							Rate Micro-Bot!
						</h3>
						<StarRating />
					</PopUp>

					<PopUp trigger={profilePopup} onClose={() => setProfilePopup(false)}>
						{isProfileSet ? (
							<div className="relative flex flex-col items-center justify-center gap-10 pt-6 text-2xl">
								<div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-babylon-blue-dark text-white ring ring-white dark:bg-babylon-blue-light sm:text-base md:h-16 md:w-16 md:text-lg lg:h-16 lg:w-16 lg:text-xl">
									<img
										className="inline-block h-12 w-12 rounded-full ring ring-white md:h-16 md:w-16 lg:h-16 lg:w-16"
										src="/src/assets/user.png"
										alt="logo"
									/>
								</div>
								<p className="flex font-medium text-babylon-blue-dark">{savedUsername}</p>
								<form
									onSubmit={(event) => {
										event.preventDefault()
										setIsProfileSet(false)
									}}
								>
									<input
										type="submit"
										id="button"
										value="Log out"
										className=" rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
									/>
								</form>
							</div>
						) : (
							<form
								autoComplete="off"
								onSubmit={(event) => {
									event.preventDefault()
									setIsProfileSet(true)
									setUsername('')
									setPassword('')
								}}
							>
								<div className="relative flex flex-col items-center justify-center gap-10 pt-10">
									<input
										className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
										type="text"
										id="username"
										placeholder="Username"
										value={username}
										onChange={(event) => {
											setUsername(event.target.value)
											setSavedUsername(event.target.value)
										}}
										required
									/>
									<input
										className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
										type="text"
										id="password"
										placeholder="Password"
										value={password}
										onChange={(event) => {
											setPassword(event.target.value)
											setSavedPassword(event.target.value)
										}}
										required
									/>
									<input
										type="submit"
										id="button"
										value="Log in"
										className=" rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
									/>
								</div>
							</form>
						)}
					</PopUp>

					<PopUp trigger={faqPopup} onClose={() => setFaqPopup(false)}>
						<div className="flex h-full flex-col gap-5 overflow-y-auto text-pretty text-babylon-blue-dark">
							<div>
								<p className="text-2xl font-bold">What is hydroponics?</p>
								<p className="text-lg font-medium">
									Hydroponics is the growing of plants without soil, whereby nutrients are delivered
									to plants via water.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">Why hydroponics?</p>
								<p className="text-lg font-medium">
									Because it is better for the planet! Hydroponically grown greens use 90% less
									water than traditional methods, all without the use of harmful pesticides. Plus
									the greens are better for you.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">How do the Micro-Farms work?</p>
								<p className="text-lg font-medium">
									Each Micro-Farm features sophisticated software and sensors that work together to
									ensure crops get just the right amount of light, water and nutrients. And
									Babylon’s mobile app helps you keep tabs on your crops and get notified when
									they’re ready for harvest.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">How much does one cost?</p>
								<p className="text-lg font-medium">
									There are several different pricing options. Please contact us to learn more.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">How much work is involved in growing?</p>
								<p className="text-lg font-medium">
									Our technology and mobile app make it simple to operate. Farming typically takes
									an hour or so per week. We also have partners in select cities who can handle farm
									operation for you, if you’re interested.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">Why is the company called Babylon?</p>
								<p className="text-lg font-medium">
									Our founders Alexander and Graham drew inspiration from the proto-hydroponics of
									the hanging gardens of Babylon, one of the original seven wonders of the ancient
									world.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">Do you offer a farm for personal use?</p>
								<p className="text-lg font-medium">Not at this time.</p>
							</div>
							<div>
								<p className="text-2xl font-bold">Do your farms grow marijuana?</p>
								<p className="text-lg font-medium">
									No. Our customers use their Micro-Farms to grow leafy greens, herbs, edible
									flowers, and microgreens.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">Do you ship outside the US?</p>
								<p className="text-lg font-medium">
									Yes. We currently have a number of clients outside the US.
								</p>
							</div>
							<div>
								<p className="text-2xl font-bold">Are you hiring?</p>
								<p className="text-lg font-medium">Please visit our careers page.</p>
							</div>
						</div>
					</PopUp>
				</div>

				<div
					className="z-0 basis-full bg-25% bg-center bg-no-repeat p-5"
					style={{ backgroundImage: 'url(src/assets/Babylon_Leaf.png)' }}
				>
					<ChatInterface />

					<div
						className=" h-1/26 z-40 m-5 mt-4 flex flex-row content-center gap-8 sm:hidden"
						ref={popUpRef}
					>
						<button
							className=" grow-0 hover:animate-vote"
							onClick={() => setProfilePopup(!profilePopup)}
						>
							<img className="" src="/src/assets/Profile-Icon.png" alt="logo" />
						</button>

						<button className="hover:animate-vote">
							<img className="" src="/src/assets/layout.png" alt="logo" />
						</button>

						<button className="hover:animate-vote" onClick={() => setRatingPopup(!ratingPopup)}>
							<img className="" src="/src/assets/Star-Icon.png" alt="logo" />
						</button>

						<button
							className="hover:animate-vote"
							onClick={() => setColorScheme(colorScheme === 'dark' ? '' : 'dark')}
						>
							{colorScheme === 'dark' ? (
								<img className="" src="/src/assets/moon.png" alt="logo" />
							) : (
								<img className="" src="/src/assets/sun.png" alt="logo" />
							)}
						</button>

						<button className="hover:animate-vote" onClick={() => setFaqPopup(!faqPopup)}>
							<img className="" src="/src/assets/faq.png" alt="logo" />
						</button>

						<PopUp trigger={ratingPopup} onClose={() => setRatingPopup(false)}>
							<h3 className="flex justify-center pt-20 text-2xl font-medium text-babylon-blue-dark">
								Rate Micro-Bot!
							</h3>
							<StarRating />
						</PopUp>

						<PopUp trigger={profilePopup} onClose={() => setProfilePopup(false)}>
							{isProfileSet ? (
								<div className="relative flex flex-col items-center justify-center gap-10 pt-16 text-2xl">
									<div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-babylon-blue-dark text-white ring ring-white dark:bg-babylon-blue-light sm:text-base md:h-16 md:w-16 md:text-lg lg:h-16 lg:w-16 lg:text-xl">
										<img
											className="inline-block h-12 w-12 rounded-full ring ring-white md:h-16 md:w-16 lg:h-16 lg:w-16"
											src="/src/assets/user.png"
											alt="logo"
										/>
									</div>
									<p className="flex font-medium text-babylon-blue-dark">{savedUsername}</p>
									<form
										onSubmit={(event) => {
											event.preventDefault()
											setIsProfileSet(false)
										}}
									>
										<input
											type="submit"
											id="button"
											value="Log out"
											className=" rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
										/>
									</form>
								</div>
							) : (
								<form
									autoComplete="off"
									onSubmit={(event) => {
										event.preventDefault()
										setIsProfileSet(true)
										setUsername('')
										setPassword('')
									}}
								>
									<div className="relative flex flex-col items-center justify-center gap-10 pt-16">
										<input
											className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
											type="text"
											id="username"
											placeholder="Username"
											value={username}
											onChange={(event) => {
												setUsername(event.target.value)
												setSavedUsername(event.target.value)
											}}
											required
										/>
										<input
											className="block w-full rounded-3xl border border-slate-300 bg-white py-2 pl-9 pr-3 font-medium drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark sm:text-base"
											type="text"
											id="password"
											placeholder="Password"
											value={password}
											onChange={(event) => {
												setPassword(event.target.value)
												setSavedPassword(event.target.value)
											}}
											required
										/>
										<input
											type="submit"
											id="button"
											value="Log in"
											className=" rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
										/>
									</div>
								</form>
							)}
						</PopUp>

						<PopUp className="" trigger={faqPopup} onClose={() => setFaqPopup(false)}>
							<div className="flex h-full flex-col gap-5 overflow-y-auto text-pretty text-babylon-blue-dark">
								<div>
									<p className="text-xl font-bold">What is hydroponics?</p>
									<p className="text-lg font-medium">
										Hydroponics is the growing of plants without soil, whereby nutrients are
										delivered to plants via water.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">Why hydroponics?</p>
									<p className="text-lg font-medium">
										Because it is better for the planet! Hydroponically grown greens use 90% less
										water than traditional methods, all without the use of harmful pesticides. Plus
										the greens are better for you.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">How do the Micro-Farms work?</p>
									<p className="text-lg font-medium">
										Each Micro-Farm features sophisticated software and sensors that work together
										to ensure crops get just the right amount of light, water and nutrients. And
										Babylon’s mobile app helps you keep tabs on your crops and get notified when
										they’re ready for harvest.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">How much does one cost?</p>
									<p className="text-lg font-medium">
										There are several different pricing options. Please contact us to learn more.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">How much work is involved in growing?</p>
									<p className="text-lg font-medium">
										Our technology and mobile app make it simple to operate. Farming typically takes
										an hour or so per week. We also have partners in select cities who can handle
										farm operation for you, if you’re interested.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">Why is the company called Babylon?</p>
									<p className="text-lg font-medium">
										Our founders Alexander and Graham drew inspiration from the proto-hydroponics of
										the hanging gardens of Babylon, one of the original seven wonders of the ancient
										world.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">Do you offer a farm for personal use?</p>
									<p className="text-lg font-medium">Not at this time.</p>
								</div>
								<div>
									<p className="text-xl font-bold">Do your farms grow marijuana?</p>
									<p className="text-lg font-medium">
										No. Our customers use their Micro-Farms to grow leafy greens, herbs, edible
										flowers, and microgreens.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">Do you ship outside the US?</p>
									<p className="text-lg font-medium">
										Yes. We currently have a number of clients outside the US.
									</p>
								</div>
								<div>
									<p className="text-xl font-bold">Are you hiring?</p>
									<p className="text-lg font-medium">Please visit our careers page.</p>
								</div>
							</div>
						</PopUp>
					</div>
				</div>
			</div>
		</div>
	)
}
