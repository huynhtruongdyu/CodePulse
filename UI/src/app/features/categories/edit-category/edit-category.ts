import { Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category, EditCategoryRequest } from '../_models/category.model';
import { form, required, Field, disabled } from '@angular/forms/signals';
import { CategoryService } from '../_services/category-service';
import { HttpResourceRef } from '@angular/common/http';

@Component({
  selector: 'app-edit-category',
  imports: [RouterLink, Field],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  private readonly router = inject(Router);
  private readonly _categoryService = inject(CategoryService);

  id = input<string>();
  isCategoryLoaded = signal(false);

  categoryModel = signal<EditCategoryRequest>({
    id: '',
    name: '',
    urlHandle: '',
  });

  editCategoryForm = form(this.categoryModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required.' });
    required(schemaPath.urlHandle, { message: 'URL is required.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.editCategoryForm().invalid()) {
      this._categoryService.updateCategory(this.categoryModel()).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  categoryFetchEffect = effect(() => {
    const categoryId = this.id();
    this.isCategoryLoaded.set(false);

    if (categoryId) {
      this._categoryService.getCategoryById(categoryId).subscribe({
        next: (response: Category) => {
          this.categoryModel.set({
            id: response.id,
            name: response.name,
            urlHandle: response.urlHandle,
          });
          this.isCategoryLoaded.set(true);
        },
        error: (err) => {
          console.error('Failed to fetch category:', err);
          this.isCategoryLoaded.set(true);
        },
      });
    } else {
      this.isCategoryLoaded.set(true);
    }
  });
}
