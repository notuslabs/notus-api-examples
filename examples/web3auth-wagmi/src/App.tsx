import { useWeb3AuthConnect } from "@web3auth/modal/react";
import "./App.css";
import { useAccount } from "wagmi";

function App() {
	const { connect, error, isConnected } = useWeb3AuthConnect();
	const { address } = useAccount();

	return (
		<div>
			<button type="button" onClick={() => connect()}>
				Connect
			</button>
			{error && <div>{error.message}</div>}
			{isConnected && <div>{address}</div>}
		</div>
	);
}

export default App;
