import Prompt from '@/models/prompt';
import { connectDB } from '@/utils/db';

// GET(read)
export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const prompts = await Prompt.findById(params.id).populate('creator');

		if (!prompts) return new Response('Prompt not found ', { status: 404 });

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all prompts', { status: 500 });
	}
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
	const { prompt, tag } = await request.json();

	try {
		await connectDB();

		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt)
			return new Response('Not found Prompt', { status: 404 });

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response('Successfully updated the Prompts', {
			status: 200,
		});
	} catch (error) {
		return new Response('Error Updating Prompt', { status: 500 });
	}
};

// DELETE
export const DELETE = async (request, { params }) => {
	try {
		await connectDB();

		// Find the prompt by ID and remove it
		await Prompt.findByIdAndRemove(params.id);

		return new Response('Prompt deleted successfully', { status: 200 });
	} catch (error) {
		return new Response('Error deleting prompt', { status: 500 });
	}
};
