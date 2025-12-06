import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AddBlogPostRequest,
  BlogPostDto,
  UpsertBlogPostRequest,
} from '../_models/blog-posts.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private readonly _http = inject(HttpClient);
  private readonly _apiBaseUrl = environment.apiBaseUrl;
  private readonly _blogPostsApiUrl = `${this._apiBaseUrl}/api/blog-posts`;

  getAllBlogPosts() {
    return httpResource<BlogPostDto[]>(() => this._blogPostsApiUrl);
  }

  addBlogPost(blogPost: AddBlogPostRequest) {
    return this._http.post(this._blogPostsApiUrl, blogPost);
  }

  deleteBlogPost(id: string) {
    return this._http.delete(this._blogPostsApiUrl + '/' + id);
  }

  getBlogPostById(id: string) {
    return this._http.get<BlogPostDto>(this._blogPostsApiUrl + '/' + id);
  }

  udpateBlogPost(id: string, blogPost: UpsertBlogPostRequest) {
    console.log(id);
    console.table(blogPost);
    return this._http.put(`${this._blogPostsApiUrl}/${id}`, blogPost);
  }
}
