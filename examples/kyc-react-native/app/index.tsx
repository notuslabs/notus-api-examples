import { Pressable, Text, View } from "react-native";
import {} from "@notus-api/react-native-sdk";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Pressable style={{ backgroundColor: "red" }} onPress={() => {}}>
				<Text>Hello</Text>
			</Pressable>
		</View>
	);
}
