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
import { fetchTestimonies } from "@/state-managment/slices/testimony-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state-managment/store";

export function TestimonyForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit() {
    console.log("is about to submit");
    if (!name || !description || !rate || !imageFile) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("rate", rate.toString());
      formData.append("image", imageFile);

      const response = await Axios.post(
        "https://house-rental-backend-tc9z.onrender.com/api/testimony",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      if (response.status === 201) {
        dispatch(fetchTestimonies());
        setName("");
        setDescription("");
        setRate(0);
        setImageFile(null);
        toast.success("Testimony created successfully");
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
        <label className="block text-sm font-medium text-secondary">Name</label>
        <Input
          className="text-secondary"
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary">
          Description
        </label>
        <Textarea
          name="description"
          placeholder="I had an amazing experience with this apartment..."
          className="min-h-[120px] text-secondary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary">
          Rating
        </label>
        <Select
          onValueChange={(value) => setRate(parseInt(value))}
          value={rate.toString()}
        >
          <SelectTrigger className="text-secondary">
            <SelectValue
              placeholder="Select rating"
              className="text-secondary"
            />
          </SelectTrigger>
          <SelectContent className="bg-white text-secondary">
            <SelectItem value="1">1 Star</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-secondary">Rate from 1 to 5 stars</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary">
          Image File
        </label>
        <Input
          type="file"
          name="imageFile"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="text-secondary"
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
