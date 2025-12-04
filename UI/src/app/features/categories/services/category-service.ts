import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _http = inject(HttpClient);
  private readonly _apiBaseUrl = environment.apiBaseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  addCategory(category: AddCategoryRequest) {
    // this._http.post<void>(`${this.ApiBaseUrl}/categories`, category);
    this.addCategoryStatus.set('loading');
    this._http.post<void>(`${this._apiBaseUrl}/api/categories`, category).subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: (err) => {
        console.error(err);
        this.addCategoryStatus.set('error');
      },
    });
  }

  getAllCategories() {
    return httpResource<Category[]>(() => `${this._apiBaseUrl}/api/categories`);
  }
}
