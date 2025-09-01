import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groceryListsApi } from "../services/api";

export const useGroceryLists = () => {
  return useQuery({
    queryKey: ["groceryLists"],
    queryFn: groceryListsApi.getAll,
  });
};

export const useCreateGroceryList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groceryListsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });
};

export const useDeleteGroceryList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groceryListsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });
};

export const useUpdateGroceryList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string } }) =>
      groceryListsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryLists"] });
    },
  });
};
