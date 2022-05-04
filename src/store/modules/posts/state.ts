import { IPost, IAuthor } from "./interfaces"
export const state = {
    posts: [] as IPost[],
    authors: [] as IAuthor[],
    filters: { author: '' },
    isLoading: true
}

export type State = typeof state