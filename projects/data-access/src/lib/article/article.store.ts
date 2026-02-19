import { inject, Injectable, signal } from "@angular/core";
import { ArticleApi } from "./article.api";
import { ArticleModel } from "@domain/article/article.model";

@Injectable({ providedIn: 'root' })
export class ArticleStore {
    private api = inject(ArticleApi);

    articles = signal<ArticleModel[]>([]);
    loading = signal(false);

    load() {
        this.loading.set(true);
        this.api.getAllPosts().subscribe(res => {
            this.articles.set(res);
            this.loading.set(false);
        });
    }
}
