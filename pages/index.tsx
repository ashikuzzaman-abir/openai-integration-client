import {
	ApiResult,
	useGenerateImagesMutation,
} from "@/store/services/generateImages.api";
import { Flex, Text, Stack, Input, Spinner, Button, Image } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export default function Home() {
	const [trigger, result] = useGenerateImagesMutation();
	const [prompt, setPrompt] = React.useState<string>("");

	const handlePromptSubmit = (e: any) => {
		e.preventDefault();
		console.log("sending prompt")
		trigger({ prompt: prompt });
	};

	React.useEffect(() => {
		if (result.isSuccess) {
			console.log(result.data);
		}
		console.log(result);
	}, [result]);

	return (
		<>
			<Head>
				<title>Openai Integration</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Stack as='form' onSubmit={handlePromptSubmit} px={6}>
				<Text fontSize='36px'>Enter a prompt to generate image!</Text>
				<Flex gap={4}>
					<Input
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder='cat with mouse'
						size='md'
						maxW='364px'
						gap={8}
					/>
					<Button size='md' type='submit' isLoading={result.isLoading} isDisabled={prompt === ""} colorScheme="green">
						Generate
					</Button>
				</Flex>
				{result.isLoading ? (
					<Spinner />
				) : result.isSuccess ? (
					<Image
						src={result?.data?.doc?.url}
						width={result?.data?.doc?.size}
						height={result?.data?.doc?.size}
						alt={prompt}
					></Image>
				) : (
					result.data && <Text>{result.data.error.message}</Text>
				)}
			</Stack>
		</>
	);
}