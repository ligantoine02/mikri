import { useState } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, XStack, YStack, H3 } from "tamagui";

import { db } from "@/lib/db";
import { Task } from "@/lib/db/schemas/tasks";
import CheckboxElement from "@/components/CheckboxElement";

const Page: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useFocusEffect(() => {
		const loadTasks = async () => {
			const tasksFromDB = await db.query.tasks.findMany();
			setTasks(tasksFromDB);
		};

		loadTasks();
	});

	return (
		<View flex={1} p="$4">
			<YStack gap="$4">
				<YStack gap="$2">
					<H3 color="$blue8Dark">Today</H3>
					{tasks.map((task) => (
						<CheckboxElement key={task.id} element={task} />
					))}
				</YStack>
			</YStack>
		</View>
	);
};

export default Page;
