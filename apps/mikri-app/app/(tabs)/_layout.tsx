import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Brain, Home, ListTodo, User2 } from "@tamagui/lucide-icons";
import { View } from "tamagui";
import Header from "@/components/Header";

export default function TabLayout() {
	const { top } = useSafeAreaInsets();

	return (
		<View flex={1} w="100%" pt={top}>
			<Header />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
				}}
				initialRouteName="tasks"
			>
				<Tabs.Screen
					name="ideas"
					options={{
						tabBarIcon: ({ color, size }) => (
							<Brain size={size} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="tasks"
					options={{
						tabBarIcon: ({ color, size }) => (
							<ListTodo size={size} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="me"
					options={{
						tabBarIcon: ({ color, size }) => (
							<User2 size={size} color={color} />
						),
					}}
				/>
			</Tabs>
		</View>
	);
}
