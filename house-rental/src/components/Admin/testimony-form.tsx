import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
export function TestimonyForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit() {
    console.log("is about to submit");
    if (!name || !description || !rate || !imageUrl) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios.post(
        "https://house-rental-backend-tc9z.onrender.com/api/testimony",
        {
          name,
          description,
          rate,
          imageUrl,
        }
      );
      setLoading(false);
      if (response.status === 201) {
        toast.success("Testimony created successfully");
        setName("");
        setDescription("");
        setRate(0);
        setImageUrl("");
      }
      console.log(response);
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <Input
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <Textarea
          name="description"
          placeholder="I had an amazing experience with this apartment..."
          className="min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Rating</label>
        <Select
          onValueChange={(value) => setRate(parseInt(value))}
          value={rate.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent className="bg-white text-secondary">
            <SelectItem value="1">1 Star</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500">Rate from 1 to 5 stars</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <Input
          name="imageUrl"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-4 text-white">
        <Button onClick={handleSubmit}>
          {loading ? "Loading..." : "Create Testimony"}
        </Button>
      </div>
    </div>
  );
}
