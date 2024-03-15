import { Link } from "expo-router";
import { XStack, Checkbox, Label } from "tamagui";
import { eq } from "drizzle-orm";

import { tasks, type Task } from "@/lib/db/schemas/tasks";
import { Check } from "@tamagui/lucide-icons";
import { db } from "@/lib/db";

interface Props {
	element: Task;
}

const toggleTask = async (state: boolean | string, id: string) => {
	const completed = typeof state === "string" ? false : state;
	await db.update(tasks).set({ completed: completed }).where(eq(tasks.id, id));
};

const CheckboxElement: React.FC<Props> = ({ element }) => {
	return (
		<XStack alignItems="center" gap="$3">
			<Checkbox
				id={element.id}
				size="$3"
				checked={element.completed}
				onCheckedChange={(state) => toggleTask(state, element.id)}
			>
				<Checkbox.Indicator>
					<Check />
				</Checkbox.Indicator>
			</Checkbox>

			<Link href={`/(modals)/${element.id}`} asChild>
				<Label color="$gray1Light">{element.title}</Label>
			</Link>
		</XStack>
	);
};

export default CheckboxElement;
