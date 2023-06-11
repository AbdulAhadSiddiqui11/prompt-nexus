import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if(!prompt) {
            return new Response(JSON.stringify("Prompt not found!"), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch the prompt!"), {
            status: 500,
        });
    }
};

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDatabase();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) {
            return new Response(JSON.stringify("Prompt not found!"), {
                status: 404,
            });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to update the prompt!"), {
            status: 500,
        });
    }
};

export const DELETE = async (request, { params }) => {
    console.log("Server : ", params);
    try {
        await connectToDatabase();
        
        await Prompt.findByIdAndRemove(params.id);

        return new Response(JSON.stringify("Prompt deleted successfully!"), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to delete the prompt!"), {
            status: 500,
        });
    }
};