import React, { useEffect } from "react";
import { fetchNews } from "@/state-managment/slices/news-slice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/state-managment/store";
import { NewsTable } from "@/components/Admin/news-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { NewsForm } from "@/components/Admin/news-form";
import { UpdateNews } from "@/components/Admin/update-news";
import axios from "axios";
import { toast } from "react-toastify";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import type { News } from "@/types/news-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { newses, loading } = useSelector((state: RootState) => state.news);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  useEffect(() => {
    dispatch(setSelectedIndex(5)); // Update to the correct index for admin
    if (newses.length === 0 && !loading) {
      dispatch(fetchNews());
    }
  }, [dispatch, newses.length, loading]);

  async function deleteNews(id: number): Promise<void> {
    try {
      const response = await axios.delete(
        "https://house-rental-backend-tc9z.onrender.com/api/blogs/" + id
      );
      if (response.status === 200) {
        dispatch(fetchNews()); // Refresh the blogs list after deletion
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete blog");
        console.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("Error deleting blog");
      console.error("Error deleting blog:", error);
    }
  }

  return (
    <div className="p-6 w-full">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Blogs Management
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage your blog posts
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAddNewsOpen(true)}
            className="bg-primary text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Blog
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <NewsTable
              news={newses}
              onEdit={setEditingNews}
              onDelete={(id) => deleteNews(Number(id))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add News Dialog */}
      <Dialog open={isAddNewsOpen} onOpenChange={setIsAddNewsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogDescription>Create a new blog post.</DialogDescription>
          </DialogHeader>
          <NewsForm />
        </DialogContent>
      </Dialog>

      {/* Edit News Dialog */}
      {editingNews && (
        <Dialog
          open={!!editingNews}
          onOpenChange={(open) => {
            if (!open) setEditingNews(null);
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-secondary">
            <DialogHeader>
              <DialogTitle>Edit Blog</DialogTitle>
              <DialogDescription>
                Update the blog post details.
              </DialogDescription>
            </DialogHeader>
            <UpdateNews news={editingNews} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
