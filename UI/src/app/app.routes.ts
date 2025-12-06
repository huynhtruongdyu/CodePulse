import { Routes } from '@angular/router';
import { CategoryList } from './features/categories/category-list/category-list';
import { AddCategory } from './features/categories/add-category/add-category';
import { EditCategory } from './features/categories/edit-category/edit-category';
import { BlogPostList } from './features/blog-posts/blog-post-list/blog-post-list';
import { UpsertBlogPost } from './features/blog-posts/upsert-blog-post/upsert-blog-post';

export const routes: Routes = [
  {
    path: 'admin/categories',
    component: CategoryList,
  },
  {
    path: 'admin/categories/add',
    component: AddCategory,
  },
  {
    path: 'admin/categories/edit/:id',
    component: EditCategory,
  },
  {
    path: 'admin/blog-posts',
    component: BlogPostList,
  },
  {
    path: 'admin/blog-posts/upsert',
    component: UpsertBlogPost,
  },
  {
    path: 'admin/blog-posts/upsert/:id',
    component: UpsertBlogPost,
  },
];
