import { DeleteCommentEP } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Review = ({
  reviewer,
  rating,
  comment,
  createdAt,
  id,
}: {
  reviewer: { name: string; id: string };
  rating: number;
  comment: string;
  createdAt: string;
  id: string;
}) => {
  const queryClient = useQueryClient();
  const user = useSelector((state: any) => state.auth);
  const { mutateAsync: deleteCommentAsync } = useMutation({
    mutationFn: (id: string) => DeleteCommentEP(id),
    onSuccess: () => {
      toast.success("Your comment has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // delete comment
  const deleteComment = async (id: string) => {
    await deleteCommentAsync(id);
  };

  return (
    <div className="border p-4 rounded-lg fcb shadow-sm space-y-2 mb-2">
      <div className="flex items-center justify-between ">
        <h3 className="font-semibold">{reviewer.name}</h3>
        <span className="text-yellow-500">
          {"★".repeat(rating)} <span className="text-gray-400">{"★".repeat(5 - rating)}</span>
        </span>
      </div>
      <div className="flex justify-between items-center ">
        <div className="">
          <p className="text-gray-600 ">{comment}</p>
          <p className="text-gray-400 ">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        {reviewer.id === user.id && (
          <Trash2
            width={16}
            height={16}
            className=" text-destructive cursor-pointer "
            onClick={() => deleteComment(id)}
          />
        )}
      </div>
    </div>
  );
};
