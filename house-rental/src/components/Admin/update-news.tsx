import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import type { News } from "@/types/news-type";

interface UpdateNewsProps {
  news: News;
}
export function UpdateNews({ news }: UpdateNewsProps) {
  const [title, setTitle] = useState(news.title);
  const [description, setDescription] = useState(news.description);
  const [imageUrl, setImageUrl] = useState<string>(
    news.imageUrl?.toString() || ""
  );
  const [date, setDate] = useState(news.date);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    try {
      const response = await Axios.put(
        "https://house-rental-backend-tc9z.onrender.com/api/blogs/" + news.id,
        {
          title,
          description,
          imageUrl,
          date,
          category: "",
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("News Updated successfully");
        // Optionally reset the form fields
        setTitle("");
        setDescription("");
        setImageUrl("");
        setDate("");
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
        <label className="block text-sm font-medium" htmlFor="imageUrl">
          Image URL
        </label>
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="input"
          type="url"
          aria-describedby="imageUrlHelp"
        />
        <p id="imageUrlHelp" className="text-xs text-gray-500">
          Enter a valid URL for the image (e.g., https://example.com/image.jpg).
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
