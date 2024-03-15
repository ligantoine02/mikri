import { createTokens } from "tamagui";

const size = {
	small: 20,
	medium: 30,
	true: 30,
	large: 40,
};

const space = {
	small: 10,
	medium: 20,
	true: 20,
	large: 30,
};

export const tokens = createTokens({
	size,
	space,
});
