import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import type { News } from "@/types/news-type";
import { fetchNews } from "@/state-managment/slices/news-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state-managment/store";

interface UpdateNewsProps {
  news: News;
  closeNewsPopup: () => void;
}
export function UpdateNews({ news, closeNewsPopup }: UpdateNewsProps) {
  const [title, setTitle] = useState(news.title);
  const [description, setDescription] = useState(news.description);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [date, setDate] = useState(
    news.date
      ? new Date(news.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("category", "");

      const response = await Axios.put(
        "https://house-rental-backend-tc9z.onrender.com/api/blogs/" + news.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        dispatch(fetchNews());
        toast.success("News Updated successfully");
        closeNewsPopup();
      } else {
        toast.error("Unexpected response from the server");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create news";
      toast.error(errorMessage);
      console.error("Error creating news:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Property Development"
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="We're excited to announce our new property development..."
          className="textarea min-h-[120px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="imageFile">
          Image
        </label>
        <Input
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="input"
          type="file"
          aria-describedby="imageFileHelp"
        />
        <p id="imageFileHelp" className="text-xs text-gray-500">
          Select an image file to upload.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="input"
        />
      </div>

      <div className="flex justify-end gap-4 text-white">
        <Button type="submit">{loading ? "Loading..." : "Update News"}</Button>
      </div>
    </form>
  );
}
