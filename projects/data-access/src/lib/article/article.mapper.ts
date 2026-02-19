import { ArticleDto } from "@domain/article/article.dto";
import { ArticleCategory, ArticleModel } from "@domain/article/article.model";

export function mapArticle(dto: ArticleDto): ArticleModel {
    return {
        id: dto.id,
        userId: dto.userId,
        title: dto.title,
        body: dto.body || "No description available. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: getRandomCategory(),
        imageUrl: "images/default-images.png",
        publishedAt: getRandomDate().toISOString(),
    };
}


function getRandomCategory(): ArticleCategory {
    const types: ArticleCategory[] = ["news", "event", "update", "announcement"];
    return types[Math.floor(Math.random() * types.length)];
}

function getRandomDate(): Date {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}