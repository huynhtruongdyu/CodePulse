import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UpsertBlogPostRequest } from '../_models/blog-posts.model';
import { Field, form, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { BlogPostService } from '../_services/blog-post-service';

@Component({
  selector: 'app-upsert-blog-post',
  imports: [Field],
  templateUrl: './upsert-blog-post.html',
  styleUrl: './upsert-blog-post.css',
})
export class UpsertBlogPost {
  private readonly router = inject(Router);
  private readonly _blogPostsService = inject(BlogPostService);

  id = input<string>();
  formType = computed<'add' | 'edit'>(() => (this.id() ? 'edit' : 'add'));
  isLoading = signal<boolean>(false);

  getBlogDetail = effect(() => {
    if (this.id()) {
      this.isLoading.set(true);
      this._blogPostsService.getBlogPostById(this.id()!).subscribe({
        next: (blogPost) => {
          this.upsertBlogPostModel.set({
            title: blogPost.title,
            author: blogPost.author,
            content: blogPost.content,
            isVisible: blogPost.isVisible,
            urlHandle: blogPost.urlHandle,
            publishedDate: new Date(blogPost.publishedDate),
            featureImageUrl: blogPost.featureImageUrl,
            shortDescription: blogPost.shortDescription,
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error(err);
        },
      });
    }
  });

  upsertBlogPostModel = signal<UpsertBlogPostRequest>({
    title: '',
    shortDescription: '',
    content: '',
    featureImageUrl: '',
    urlHandle: '',
    publishedDate: new Date(),
    author: '',
    isVisible: false,
  });

  upsertBlogPostForm = form(this.upsertBlogPostModel, (schemaPath) => {
    //title
    required(schemaPath.title, { message: 'Title is required.' });
    minLength(schemaPath.title, 10, { message: 'Title min lenght is 10' });
    maxLength(schemaPath.title, 100, { message: 'Title max lenght is 100' });

    //shortDescription
    required(schemaPath.shortDescription, { message: 'Short Descrition is required.' });
    minLength(schemaPath.shortDescription, 10, { message: 'Short Descrition min lenght is 10' });
    maxLength(schemaPath.shortDescription, 300, { message: 'Short Descrition max lenght is 300' });

    //content
    required(schemaPath.content, { message: 'Content is required.' });
    minLength(schemaPath.content, 10, { message: 'Content min lenght is 10' });

    //featureImageUrl
    required(schemaPath.featureImageUrl, { message: 'Feature Image URL is required.' });
    pattern(schemaPath.featureImageUrl, /^https?:\/\/.+$/, {
      message: 'Feature Image URL must start with http:// or https://',
    });

    //urlHandle
    required(schemaPath.urlHandle, { message: 'URL Handle is required.' });

    //publishedDate
    required(schemaPath.publishedDate, { message: 'Published Date is required.' });

    //author
    required(schemaPath.author, { message: 'Author is required.' });
  });

  shortDescriptionLenght = computed(() => this.upsertBlogPostModel().shortDescription.length);

  onBack() {
    this.router.navigate(['/admin/blog-posts']);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.upsertBlogPostForm().invalid()) {
      if (this.formType() == 'add') {
        this._blogPostsService.addBlogPost(this.upsertBlogPostModel()).subscribe({
          next: () => {
            this.router.navigate(['/admin/blog-posts']);
          },
          error(err) {
            console.error(err);
          },
        });
      } else {
        this._blogPostsService.udpateBlogPost(this.id()!, this.upsertBlogPostModel()).subscribe({
          next: () => {
            this.router.navigate(['/admin/blog-posts']);
          },
          error(err) {
            console.error(err);
          },
        });
      }
    }
  }
}
