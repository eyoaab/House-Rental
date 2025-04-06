import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Apartment } from "@/types/apartment-type";
import { fetchApartments } from "../../state-managment/slices/apartments-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state-managment/store";

const features = [
  { id: "pool", label: "Pool" },
  { id: "gym", label: "Gym" },
  { id: "parking", label: "Parking" },
  { id: "furnished", label: "Furnished" },
  { id: "utilities", label: "Utilities Included" },
  { id: "balcony", label: "Balcony" },
  { id: "security", label: "Security" },
  { id: "wifi", label: "WiFi" },
];

interface UpdateApartmentProps {
  apartment: Apartment;
  closeEditingPopUp: () => void;
}
export function UpdateApartment({
  apartment,
  closeEditingPopUp,
}: UpdateApartmentProps) {
  const [title, setTitle] = useState(apartment.title);
  const [location, setLocation] = useState(apartment.location);
  const [noRoom, setNoRoom] = useState(apartment.noRoom);
  const [noBathRoom, setNoBathRoom] = useState(apartment.noBathRoom);
  const [area, setArea] = useState(apartment.area);
  const [price, setPrice] = useState(apartment.price);
  const [availableFrom, setAvailableFrom] = useState<string>(
    apartment.availableFrom
      ? new Date(apartment.availableFrom).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [availableTo, setAvailableTo] = useState(
    apartment.availableTo || new Date().toISOString().split("T")[0]
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState(apartment.status);
  const [catagory, setCatagory] = useState(apartment.catagory);
  const [averageRating, setAverageRating] = useState(apartment.averageRating);
  const [description, setDescription] = useState(apartment.description);
  const [selectedFeature, setSelectedFeature] = useState<string[]>(
    apartment.features
  );
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(): Promise<void> {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("noRoom", noRoom);
    formData.append("noBathRoom", noBathRoom);
    formData.append("area", area);
    formData.append("price", price.toString());
    formData.append("availableFrom", availableFrom);
    formData.append("availableTo", availableTo);
    formData.append("status", status);
    formData.append("catagory", catagory);
    formData.append("averageRating", averageRating.toString());
    formData.append("description", description);
    formData.append("features", JSON.stringify(selectedFeature.join(",")));

    if (imageFile) {
      formData.append("image", imageFile); // Append the selected image file
    }

    try {
      setLoading(true);
      const response = await axios.put(
        "https://house-rental-backend-tc9z.onrender.com/api/apartments/" +
          apartment.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status === 201 || response.status === 200) {
        dispatch(fetchApartments());
        toast.success("Apartment Updated successfully");
        closeEditingPopUp();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update apartment");
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label>Title</label>
          <Input
            value={title}
            placeholder="Luxury Apartment"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Location</label>
          <Input
            value={location}
            placeholder="Downtown"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label>Number of Rooms</label>
          <Input
            value={noRoom}
            placeholder="3"
            onChange={(e) => setNoRoom(e.target.value)}
          />
        </div>

        <div>
          <label>Number of Bathrooms</label>
          <Input
            value={noBathRoom}
            placeholder="2"
            onChange={(e) => setNoBathRoom(e.target.value)}
          />
        </div>

        <div>
          <label>Area</label>
          <Input
            value={area}
            placeholder="1200 sqft"
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div>
          <label>Price</label>
          <Input
            value={price}
            type="number"
            placeholder="2500"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Available From</label>
          <Input
            className="bg-whie text-secondary"
            type="date"
            value={availableFrom}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value)
                .toISOString()
                .split("T")[0];
              setAvailableFrom(selectedDate);
              console.log("Selected Available From date:", selectedDate);
            }}
          />
        </div>

        <div>
          <label>Available To</label>
          <Input
            type="date"
            value={availableTo}
            onChange={(e) =>
              setAvailableTo(
                new Date(e.target.value).toISOString().split("T")[0]
              )
            }
          />
        </div>

        <div>
          <label>Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
              }
            }}
          />
        </div>

        <div>
          <label>Status</label>
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="w-40 bg-white text-secondary">
              <SelectItem value="sell">Sell</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>Category</label>
          <Select
            value={catagory}
            onValueChange={(value) => setCatagory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="w-40 bg-white text-secondary">
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="penthouse">enthouse</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="Penthouse">Penthouse</SelectItem>
              <SelectItem value="office">Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>Average Rating</label>
          <Input
            value={averageRating}
            type="number"
            min="0"
            max="5"
            step="0.1"
            onChange={(e) => setAverageRating(Number(e.target.value))}
          />
          <small>Rating from 0 to 5</small>
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          placeholder="A beautiful luxury apartment in the heart of the city"
          className="min-h-[120px] w-full border border-secondary rounded-md p-2"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Features</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-3 p-2 ">
              <Checkbox
                checked={selectedFeature.includes(feature.label)}
                onCheckedChange={(checked) => {
                  setSelectedFeature((prev) =>
                    checked
                      ? [...prev, feature.label]
                      : prev.filter((f) => f !== feature.label)
                  );
                }}
                className="h-5 w-5"
              />
              <label className="text-sm font-medium">{feature.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 text-white">
        <Button onClick={handleSubmit}>
          {loading ? "Loading..." : "Update Apartment"}
        </Button>
      </div>
    </div>
  );
}
