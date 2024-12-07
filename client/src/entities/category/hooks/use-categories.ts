import { ICategory } from "../model";
import { categoryService } from "../api";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    categoryService
      .getEventCategories()
      .then(({ data }) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return { categories, isLoading, isError };
};
