import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { nanoid } from '@reduxjs/toolkit'

export interface Article {
    id: string
    name: string
    detail: string
}

type Articles = Article[]

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    tagTypes: ['Article'],
    endpoints: (builder) => ({
        getArticles: builder.query<Articles, void>({
            query: () => 'articles',
            providesTags: (res) =>
                res
                ? [
                    ...res.map(({ id }) => ({ type: 'Article' as const, id })),
                    { type: 'Article', id: 'LIST' }
                ]
                : [{ type: 'Article', id: 'LIST' }]
        }),
        getArticleById: builder.query<Article, string>({
            query: (id) => `articles/${id}`,
            providesTags: (res, err, id) => [{ type: 'Article', id }]
        }),
        addArticle: builder.mutation<Article, Partial<Article>>({
            query: (body) => ({
                url: 'articles',
                method: 'POST',
                body: {
                    id: nanoid(),
                    detail: 'xxx',
                    ...body
                }
            }),
            invalidatesTags: [{ type: 'Article', id: 'LIST' }]
        }),
        updateArticle: builder.mutation<Article, Pick<Article, 'id'> & Partial<Article>>({
            query: ({id, ...patch}) => ({
                url: `articles/${id}`,
                method: 'PATCH',
                body: patch
            }),
            invalidatesTags: (res, err, { id }) => [{ type: 'Article', id }]
        }),
        deleteArticle: builder.mutation<Article, string>({
            query: (id) => ({
                url: `articles/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Article', id: 'LIST' }]
        })
    })
})

export const {
    useGetArticlesQuery,
    useGetArticleByIdQuery,
    useAddArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation
} = articleApi
