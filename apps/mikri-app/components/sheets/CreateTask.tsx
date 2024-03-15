import { useState } from "react";
import { Plus } from "@tamagui/lucide-icons";
import { Button, Form, H4, Input, Sheet, TextArea } from "tamagui";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schemas/tasks";

interface Props {
	title: string;
	open: boolean;
	onOpen: (open: boolean) => void;
}

const CreateTask: React.FC<Props> = ({ title, open, onOpen }) => {
	const [task, setTask] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const submit = async () => {
		// TODO validate task and description

		// Store in database
		await db.insert(tasks).values({ title: task, description: description });
		setTask("");
		setDescription("");
	};

	return (
		<Sheet open={open} onOpenChange={onOpen} snapPoints={[50]}>
			<Sheet.Overlay />
			<Sheet.Handle />
			<Sheet.Frame p="$4" gap="$4">
				<H4>{`New ${title}`}</H4>
				<Form onSubmit={submit} flex={1} gap="$2">
					<Input placeholder="Task" onChangeText={setTask} value={task} />
					<TextArea
						placeholder="Description"
						onChangeText={setDescription}
						value={description}
					/>
					<Form.Trigger asChild>
						<Button icon={Plus} alignSelf="flex-end" size="$4">
							Add task
						</Button>
					</Form.Trigger>
				</Form>
			</Sheet.Frame>
		</Sheet>
	);
};

export default CreateTask;
