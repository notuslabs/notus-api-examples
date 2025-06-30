import { Liveness } from "@notus-api/expo-sdk";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Index() {
	const [showLiveness, setShowLiveness] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [sessionId, setSessionId] = useState<string | undefined>(undefined);

	return showLiveness && sessionId ? (
		<Liveness
			sessionId={sessionId}
			onSuccess={() => {
				setShowLiveness(false);
				setMessage("Liveness completed successfully");
			}}
			onError={(error) => {
				setMessage(error.message);
			}}
		/>
	) : (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				gap: 10,
				padding: 10,
			}}
		>
			<View
				style={{
					flexDirection: "column",
					gap: 10,
					width: "100%",
				}}
			>
				<Text>Input your KYC session ID:</Text>
				<TextInput
					placeholder="Session ID"
					value={sessionId}
					onChangeText={setSessionId}
					style={{
						borderWidth: 1,
						borderColor: "black",
						backgroundColor: "white",
						padding: 10,
					}}
				/>
			</View>
			<Pressable
				onPress={() => {
					setShowLiveness(true);
				}}
				style={{
					backgroundColor: "white",
					padding: 10,
					borderRadius: 5,
				}}
			>
				<Text>Start Liveness</Text>
			</Pressable>
			{message && <Text>{message}</Text>}
		</View>
	);
}
