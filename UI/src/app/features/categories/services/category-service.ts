import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, EditCategoryRequest } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly _http = inject(HttpClient);
  private readonly _apiBaseUrl = environment.apiBaseUrl;
  private readonly _categoriesApiUrl = `${this._apiBaseUrl}/api/categories`;

  addCategoryStatus = signal<'idle' | 'loading' | 'error' | 'success'>('idle');

  addCategory(category: AddCategoryRequest) {
    // this._http.post<void>(`${this.ApiBaseUrl}/categories`, category);
    this.addCategoryStatus.set('loading');
    this._http.post<void>(this._categoriesApiUrl, category).subscribe({
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
    return httpResource<Category[]>(() => this._categoriesApiUrl);
  }

  deleteCategory(id: string): Observable<void> {
    return this._http.delete<void>(`${this._categoriesApiUrl}/${id}`);
  }

  getCategoryById(id: string) {
    const path = `${this._categoriesApiUrl}/${id}`;
    return this._http.get<Category>(path);
  }

  updateCategory(category: EditCategoryRequest) {
    return this._http.put(`${this._categoriesApiUrl}/${category.id}`, category);
  }
}
