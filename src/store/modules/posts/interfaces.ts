/* ----- API Response type to posts ----- */
type PostMetadata = {
    publishedAt: number,
    authorId: number,
}
export type IPost = {
    title: string;
    body: string,
    metadata: PostMetadata
}

export interface IPostWithAuthorName extends IPost {
    author_name?: string;
}

/* ----- API Response type to authors ----- */

export interface IAuthor {
    name: string;
    id: number;
}