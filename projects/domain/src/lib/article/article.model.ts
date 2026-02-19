// article.model.ts
export type ArticleCategory =
    | 'news'
    | 'event'
    | 'announcement'
    | 'update';

export interface ArticleModel {
    id: string;
    userId: string;
    title: string;
    body: string;
    imageUrl: string;
    publishedAt: string; // ISO string (domain-friendly)
    category: ArticleCategory;
}