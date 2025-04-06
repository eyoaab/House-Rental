import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export function NewsForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("category", ""); // Assuming category is not used
      if (imageFile) {
        formData.append("image", imageFile); // Append the image file
      }

      const response = await Axios.post(
        "https://house-rental-backend-tc9z.onrender.com/api/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("News created successfully");
        // Optionally reset the form fields
        setTitle("");
        setDescription("");
        setImageFile(null);
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
      <div className="text-secondary">
        <label className="block text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Property Development"
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="We're excited to announce our new property development..."
          className="textarea min-h-[120px] text-secondary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary">
          Image File
        </label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="text-secondary input"
        />
      </div>

      <div>
        <label className="text-secondary block text-sm font-medium">Date</label>
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="input text-secondary"
        />
      </div>

      <div className="flex justify-end gap-4 text-white">
        <Button type="submit">{loading ? "Loading..." : "Create News"}</Button>
      </div>
    </form>
  );
}
