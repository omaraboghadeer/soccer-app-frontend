import { Injectable } from "@angular/core";
import { ApiService } from "../../public-api";

import { ArticleDto  } from '@domain/article/article.dto';
import { map } from "rxjs";
import { mapArticle } from "./article.mapper";

@Injectable({ providedIn: 'root' })
export class ArticleApi extends ApiService{
    
    getAllPosts() {
        return this.http.get<ArticleDto[]>(this.baseUrl + '/posts')
        .pipe(
            map(response => response.map(mapArticle))
        );
    }

    getLatestUpdates() {
        return this.getAllPosts().pipe(
            map(response => response.slice(0, 5)),
        )
    }
}