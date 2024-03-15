import { useState } from "react";
import { usePathname } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";
import { XStack, Button, Text } from "tamagui";
import CreateTask from "./sheets/CreateTask";

const Header: React.FC = () => {
	const pathname = usePathname();

	const [open, setOpen] = useState<boolean>(false);
	const title = pathname.substring(1, pathname.length - 1);

	return (
		<>
			<XStack
				w="100%"
				bg="blue"
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				px="$2"
			>
				<Text>Welcome back</Text>
				<Button
					icon={<Plus size="$2" />}
					chromeless
					circular
					onPress={() => setOpen(true)}
				/>
			</XStack>

			<CreateTask open={open} onOpen={setOpen} title={title} />
		</>
	);
};

export default Header;
