import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({creator: params.id}).populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch user's prompts!"), {
            status: 500,
        });
    }
};