import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({}).populate("creator");

        const response = new Response(JSON.stringify(prompts), {
            status: 200,
        });

        /*
            This implementation adds a unique identifier to the URL of the API route to force a cache-busting reload. The Cache-Control, Pragma, and Expires headers are also added to the response to disable caching for dynamic content.

            By adding a unique identifier to the URL, you can ensure that the URL is unique and not cached by the CDN or any intermediary caches. In this implementation, the current timestamp is used as the unique identifier.

            You can add this code to the existing code in the app/api/prompt/route.js file to fix the issue with the API route returning a cached prompts array.
        */
       
        // Add a unique identifier to the URL to force a cache-busting reload
        const url = new URL(request.url);
        url.searchParams.set("t", Date.now());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());

        return response;
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch all prompts!"), {
            status: 500,
        });
    }
};