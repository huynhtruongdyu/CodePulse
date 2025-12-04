import { Component, effect, inject, signal } from '@angular/core';
import { form, Field, required, minLength } from '@angular/forms/signals';
import { CategoryService } from '../services/category-service';
import { AddCategoryRequest } from '../models/category.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [Field, RouterLink],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private readonly _categoryService = inject(CategoryService);
  private readonly _router = inject(Router);

  constructor() {
    effect(() => {
      if (this._categoryService.addCategoryStatus() === 'success') {
        this._categoryService.addCategoryStatus.set('idle');
        this._router.navigate(['/admin/categories']);
      }

      if (this._categoryService.addCategoryStatus() === 'error') {
        this._categoryService.addCategoryStatus.set('idle');
        console.error('Add Category Request Failed');
      }
    });
  }

  categoryModel = signal<AddCategoryRequest>({
    name: '',
    urlHandle: '',
  });

  newCategoryForm = form(this.categoryModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required.' });
    required(schemaPath.urlHandle, { message: 'URL is required.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.newCategoryForm().invalid()) {
      const newCat = this.categoryModel();
      this._categoryService.addCategory(newCat);
    }
  }
}
