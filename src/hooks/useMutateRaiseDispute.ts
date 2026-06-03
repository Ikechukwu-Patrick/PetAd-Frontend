import { useApiMutation } from "./useApiMutation";
import { apiClient } from "../lib/api-client";
import toast from "react-hot-toast";

export interface RaiseDisputePayload {
  adoptionId: string;
  raisedBy: string;
  reason: string;
}

export function useMutateRaiseDispute() {
  return useApiMutation<{ adoptionId: string }, RaiseDisputePayload>(
    (payload) => apiClient.post("/disputes", payload),
    {
      invalidates: [["disputes"]],
      onSuccess: () => {
        toast.success("Dispute raised successfully");
      },
      onSettled: (_data, error) => {
        if (error) {
          toast.error(error.message || "Failed to raise dispute");
        }
      }
    }
  );
}