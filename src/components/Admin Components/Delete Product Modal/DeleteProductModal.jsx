"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
import { memo } from "react";

function DeleteModal({
  id,
  isDeleteOpen,
  onDeleteClose,
  isOrderDelete = false,
  isUserDelete = false,
}) {
  // console.log(id);
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      if (isOrderDelete) {
        const res = await axios.delete(`/api/order/delete/${id}`);
        // console.log(res);
        return;
      } else if (isUserDelete) {
        const res = await axios.delete(`/api/users/delete/${id}`);
        // console.log(res);
        toast({
          title: "User Deleted",
          description: "User has been deleted successfully",
        });
        return;
      }
      const res = await axios.delete(`/api/product/delete/${id}`);
      // console.log(res);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteClose}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            {isOrderDelete ? " order" : isUserDelete ? " user" : " product"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDeleteClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-rose-500 text-white hover:bg-rose-600"}
            onClick={handleDelete}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default memo(DeleteModal);
