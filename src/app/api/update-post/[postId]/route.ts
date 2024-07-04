import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import ApiResponse from "@/helpers/apiResponse";
import PostModel from "@/model/post.models";
import { ApiError } from "@/helpers/apiError";

export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return Response.json(new ApiResponse(401, "Not Authenticated"), {
      status: 401,
    });
  }

  try {
    const postId = params.postId;

    const { title, content, groupNames, instituteOnly, tags } =
      await request.json(); // check how to handel images and use cloudinary helper function.

    const post = await PostModel.findById(postId);

    if (!post) {
      return Response.json(new ApiResponse(404, "Post of not found"), {
        status: 404,
      });
    }

    if (user._id !== post?.userId.toString()) {
      return Response.json(
        new ApiResponse(401, "User Not Authorized to update this post"),
        { status: 401 }
      );
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.groupNames = groupNames || post.groupNames;
    post.instituteOnly = instituteOnly || post.instituteOnly;
    post.tags = tags || post.tags;

    await post.save();

    return Response.json(new ApiResponse(201, "Post updated successfully"), {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error while updating the post", error);
    return Response.json(
      new ApiError(500, "Error while updating the post", error),
      { status: 500 }
    );
  }
}
