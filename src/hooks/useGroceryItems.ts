import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groceryItemsApi } from "../services/api";
import type { CreateGroceryItemRequest, UpdateGroceryItemRequest } from "../types/grocery";

export const useGroceryItems = (listId: number) => {
  return useQuery({
    queryKey: ["groceryItems", listId],
    queryFn: () => groceryItemsApi.getAll(listId),
    enabled: !!listId,
  });
};

export const useCreateGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listId,
      data,
    }: {
      listId: number;
      data: CreateGroceryItemRequest;
    }) => groceryItemsApi.create(listId, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific grocery items query for this list
      queryClient.invalidateQueries({
        queryKey: ["groceryItems", variables.listId],
      });
    },
  });
};

export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listId,
      itemId,
      data,
    }: {
      listId: number;
      itemId: number;
      data: UpdateGroceryItemRequest;
    }) => groceryItemsApi.update(listId, itemId, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific grocery items query for this list
      queryClient.invalidateQueries({
        queryKey: ["groceryItems", variables.listId],
      });
    },
  });
};

export const useDeleteGroceryItem = (listId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => groceryItemsApi.delete(itemId),
    onSuccess: () => {
      // Invalidate the specific grocery items query for this list
      queryClient.invalidateQueries({ queryKey: ["groceryItems", listId] });
    },
  });
};

export const useTogglePurchaseItem = (listId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, isPurchased }: { itemId: number; isPurchased: boolean }) => {
      return isPurchased 
        ? groceryItemsApi.unpurchaseItem(itemId)
        : groceryItemsApi.purchaseItem(itemId);
    },
    onSuccess: () => {
      // Invalidate the specific grocery items query for this list
      queryClient.invalidateQueries({ queryKey: ["groceryItems", listId] });
    },
  });
};
