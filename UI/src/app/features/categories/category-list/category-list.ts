import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private readonly _categoryService = inject(CategoryService);
  private readonly getAllCategoriesRef = this._categoryService.getAllCategories();

  isLoading = this.getAllCategoriesRef.isLoading;
  isError = this.getAllCategoriesRef.error;
  categories = this.getAllCategoriesRef.value;

  onDelete(id: string) {
    if (!id) return;
    this._categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.getAllCategoriesRef.reload();
      },
      error: () => {},
    });
  }

  onEdit(id: string) {
    alert('Edit');
  }
}
