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
import { Testimony } from "@/types/testimony-type";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { fetchTestimonies } from "@/state-managment/slices/testimony-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state-managment/store";

interface UpdateTestimonyProps {
  testimony: Testimony;
  closeTestimonyPopup: () => void;
}

export function UpdateTestimony({
  testimony,
  closeTestimonyPopup,
}: UpdateTestimonyProps) {
  const [name, setName] = useState(testimony.name || "");
  const [description, setDescription] = useState(testimony.description || "");
  const [rate, setRate] = useState(testimony.rate || 0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit() {
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

      const response = await Axios.put(
        "https://house-rental-backend-tc9z.onrender.com/api/testimony/" +
          testimony.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      if (response.status === 200) {
        dispatch(fetchTestimonies());
        toast.success("Testimony Updated successfully");
        closeTestimonyPopup();
      }
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
        <label className="block text-sm font-medium">Image File</label>
        <Input
          type="file"
          name="imageFile"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <div className="flex justify-end gap-4 text-white">
        <Button onClick={handleSubmit}>
          {loading ? "Loading..." : "Update Testimony"}
        </Button>
      </div>
    </div>
  );
}
