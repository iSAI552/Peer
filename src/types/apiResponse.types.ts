import { Post } from "@/model/post.models";
import { Comment } from "@/model/comment.models";
import { Message } from "@/model/message.models";

export interface Data {
    posts?: Array<Post>,
    comments?: Array<Comment>,
    messages?: Array<Message>,
    data?: any,
}

export interface ApiResponseInterface {
    statusCode: number,
    success: boolean,
    message: string,
    data?: Data,
}

export interface ApiErrorInterface {
    statusCode: number,
    message: string,
    errors: any,
    stack?: any,
    data: any,
    success: boolean,
}