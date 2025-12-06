import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BlogPostService } from '../_services/blog-post-service';
import { BlogPostDto } from '../_models/blog-posts.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-post-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post-list.html',
  styleUrl: './blog-post-list.css',
})
export class BlogPostList {
  private readonly _blogPostsService = inject(BlogPostService);

  getAllBlogPostsRef = this._blogPostsService.getAllBlogPosts();
  blogPosts = this.getAllBlogPostsRef.value;
  loading = this.getAllBlogPostsRef.isLoading;
  error = this.getAllBlogPostsRef.error;

  onDelete(id: string) {
    this._blogPostsService.deleteBlogPost(id).subscribe({
      next: () => {
        this.getAllBlogPostsRef.reload();
      },
    });
  }
}
