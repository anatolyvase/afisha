import { ICategory } from "../model";
import { api } from "@/shared/api";

class CategoryService {
  async getEventCategories() {
    return api.get<ICategory[]>("/event-categories");
  }
}

export const categoryService = new CategoryService();
