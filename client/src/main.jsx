import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ChatsProvider } from './context/ChatsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<ChatsProvider>
				<App />
			</ChatsProvider>
		</AuthProvider>
	</React.StrictMode>
)
