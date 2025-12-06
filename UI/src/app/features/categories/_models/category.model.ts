export interface AddCategoryRequest {
  name: string;
  urlHandle: string;
}

export interface EditCategoryRequest extends Category {}

export interface Category {
  id: string;
  name: string;
  urlHandle: string;
}
