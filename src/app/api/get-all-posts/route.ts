import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import ApiResponse from "@/helpers/apiResponse";
import PostModel, { Post } from "@/model/post.models";
import { ApiError } from "@/helpers/apiError";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request:Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        return Response.json(new ApiResponse(401, "Not Authenticated"), {status: 401});
    }

    try {
        
        const { searchParams } = new URL(request.url)
        const queryParams = {
            groupName: searchParams.get("groupName"),
        };

        const {groupName} = queryParams

        if(!groupName) {
            return Response.json(new ApiResponse(400, "Invalid group Name"), {status: 400});
        }

        const allPosts = PostModel.find({groupNames: [groupName]}) // have to find a way to check if this groupname is the array of groupNames

        if(!allPosts){
            return Response.json(new ApiResponse(404, "No posts found"), {status: 404});
        }

        return Response.json(new ApiResponse(200, "All posts fetched successfully", {posts: allPosts}))

    } catch (error: any) {
        console.error("Error while fetching all posts", error);
        return Response.json(new ApiError(500, "Error while fetching all posts", error), {status: 500});
    }

}