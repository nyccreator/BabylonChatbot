import { useState, useEffect, useRef } from "react";
// import { getThread, createOpenAI, getAssistant } from '../utils.js'
import "../App.css";

export default function ChatInterface() {
	const [text, setText] = useState("");
	const [textArray, setTextArray] = useState([]);
	const [thread_id, setThreadID] = useState("");
	const [loading, setLoading] = useState(false);
	const [isListening, setIsListening] = useState(false);
	// const openai = createOpenAI()
	// const assistant = getAssistant()
	const bottomRef = useRef(null);

	const handleSpeechToText = () => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert("Speech recognition not supported in this browser.");
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = true;
		recognition.lang = "en-US";

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			setText(transcript);
		};

		recognition.start();

		recognition.onend = () => {
			setIsListening(false);
		};

		recognition.onerror = (event) => {
			console.error("Speech Recognition Error", event.error);
		};
	};

	useEffect(() => {
		const func = async () => {
			// const thread = await getThread(openai)
			// setThreadID(thread)
		};
		func();
	}, []);

	useEffect(() => {
		if (isListening) {
			handleSpeechToText();
		}
	}, [isListening]);

	const cycle = async (message, thread_id, assistant, openai) => {
		await openai.beta.threads.messages.create(thread_id, {
			role: "user",
			content: message,
		});
		const run = await openai.beta.threads.runs.create(thread_id, {
			assistant_id: assistant,
		});

		let timeElapsed = 0;
		while (timeElapsed < 1000) {
			const retreiveRun = await openai.beta.threads.runs.retrieve(
				thread_id,
				run.id
			);
			if (retreiveRun.status === "completed") {
				printMessages(thread_id, openai);
				document.getElementById("input").disabled = false;
				document.getElementById("button").disabled = false;
				document.getElementById("microphone").disabled = false;
				setLoading(false);
				return;
			}
			timeElapsed += 1;
		}
		console.log("failed to respond in time");
	};

	const printMessages = async (thread_id, openai) => {
		const threadMessages = await openai.beta.threads.messages.list(thread_id);
		let textArr = [];

		for (let i = threadMessages.data.length - 1; i >= 0; i--) {
			let annotations = threadMessages.data[i].content[0].text.annotations;

			for (let j = 0; j < annotations.length; j++) {
				threadMessages.data[i].content[0].text.value = threadMessages.data[
					i
				].content[0].text.value.replace(annotations[j].text, "");
			}

			textArr.push({
				role: threadMessages.data[i].role,
				message: threadMessages.data[i].content[0].text.value,
			});
		}

		setTextArray(textArr);
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [textArray]);

	return (
		<>
			<div className=" flex items-center justify-center text-base font-medium sm:text-lg md:text-xl lg:text-xl">
				<div className="space-y-5">
					<div className="h-[80vh] space-y-10 overflow-y-auto rounded-3xl p-5 sm:h-[80vh] md:h-[85vh] lg:h-[85vh] lg:w-[80vw] xl:h-[85vh] 2xl:h-[90vh]">
						<div>
							<a
								className="inline-block w-2/5 md:w-1/5 lg:w-1/5"
								href="https://babylonmicrofarms.com/"
								target="_blank"
							>
								<picture alt="logo">
									<source
										srcSet="/src/assets/Babylon-Logo-White.png"
										media="(prefers-color-scheme:dark)"
									/>
									<img src="/src/assets/Babylon-Logo-White.png" />
								</picture>
							</a>
							<h1 className="text-md sm:text-md font-sans font-semibold text-babylon-blue-dark dark:text-babylon-blue-light md:text-lg lg:text-2xl">
								MICRO - BOT
							</h1>
						</div>
						<div className="mr-[67.5px] flex items-start justify-start space-x-5">
							<img
								className="inline-block h-8 w-8 rounded-full ring-3 ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
								src="/src/assets/Babylon-Profile-Image.jpg"
								alt="logo"
							/>
							<p
								className={
									"w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg"
								}
							>
								Hi! 👋 How can I help you today?
							</p>
						</div>
						<div className="mr-[67.5px] flex items-start justify-start space-x-5">
							<img
								className="inline-block h-8 w-8 rounded-full ring-3 ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
								src="/src/assets/Babylon-Profile-Image.jpg"
								alt="logo"
							/>
							<p
								className={
									"w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg"
								}
							>
								Ask me anything about Babylon Micro-Farms.
							</p>
						</div>

						{textArray.map((element, index) =>
							element.role === "assistant" ? (
								<div
									key={index}
									className="mr-[67.5px] flex items-start justify-start space-x-5"
								>
									<img
										className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
										src="/src/assets/Babylon-Profile-Image.jpg"
										alt="logo"
									/>
									<p
										style={{ whiteSpace: "pre-line" }}
										className={
											"w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg"
										}
									>
										{element.message}
									</p>
								</div>
							) : (
								<div
									key={index}
									className="ml-[67.5px] flex items-start justify-end space-x-5"
								>
									<p
										className={
											"w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-md bg-babylon-blue-dark p-4 text-white drop-shadow-lg dark:bg-babylon-blue-light"
										}
									>
										{element.message}
									</p>
									<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babylon-blue-dark text-white ring ring-white dark:bg-babylon-blue-light sm:text-base md:h-12 md:w-12 md:text-lg lg:h-12 lg:w-12 lg:text-xl">
										<img
											className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
											src="/src/assets/user.png"
											alt="logo"
										/>
									</div>
								</div>
							)
						)}
						<div ref={bottomRef} />
						{loading && (
							<div className="message assistant-message">
								<div className="loading-spinner" role="status">
									<div className="flex items-end justify-start space-x-1.5 ease-in-out">
										<div className="h-4 w-4 animate-bounce rounded-full bg-gray-300 animation-delay-0 sm:h-5 sm:w-5"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-gray-200 animation-delay-75 sm:h-5 sm:w-5"></div>
										<div className="h-4 w-4 animate-bounce rounded-full bg-gray-100 animation-delay-150 sm:h-5 sm:w-5"></div>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="">
						<form
							autoComplete="off"
							onSubmit={(event) => {
								event.preventDefault();
								setTextArray((textArray) => [
									...textArray,
									{ role: "user", message: text },
								]);
								setText("");
								setLoading(true);
								cycle(text, thread_id, assistant, openai);
								document.getElementById("input").disabled = true;
								document.getElementById("button").disabled = true;
								document.getElementById("microphone").disabled = true;
							}}
						>
							<div className="relative flex flex-row items-end justify-center">
								<input
									className=" flex-auto rounded-3xl border-2 border-slate-300 bg-white p-3 text-black drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark dark:focus:border-babylon-blue-light dark:focus:ring-babylon-blue-light"
									type="text"
									id="input"
									placeholder="Message Micro-Bot..."
									value={text}
									onChange={(event) => setText(event.target.value)}
									required
								/>
								<input
									className=" absolute right-0 inline-block h-full rounded-r-3xl bg-babylon-blue-dark text-white dark:bg-babylon-blue-light"
									type="image"
									name="submit"
									src="/src/assets/next.png"
									alt="Submit"
								/>
								<button
									className="absolute right-12 inline-block aspect-square h-full bg-babylon-blue-dark p-3 dark:bg-babylon-blue-light"
									type="button"
									id="microphone"
									onClick={() => setIsListening(!isListening)}
								>
									<img
										className=""
										src={
											isListening
												? "/src/assets/Mic-Active.png"
												: "/src/assets/Mic.png"
										}
									></img>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
