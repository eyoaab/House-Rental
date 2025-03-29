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

export function ApartmentForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [noRoom, setNoRoom] = useState("");
  const [noBathRoom, setNoBathRoom] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState(0);
  const [availableFrom, setAvailableFrom] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [availableTo, setAvailableTo] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const [catagory, setCatagory] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFeature, setSelectedFeature] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(): Promise<void> {
    try {
      setLoading(true);
      const respose = await axios.post(
        "https://house-rental-backend-tc9z.onrender.com/api/apartments",
        {
          title,
          location,
          noRoom,
          noBathRoom,
          area,
          price,
          availableFrom,
          availableTo,
          imageUrl,
          status,
          catagory,
          averageRating,
          description,
          features: JSON.stringify(selectedFeature.join(",")),
        }
      );
      console.log(respose.data);
      if (respose.status === 201) {
        toast.success("Apartment created successfully");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error("Failed to create apartment");
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label>Title</label>
          <Input
            placeholder="Luxury Apartment"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Location</label>
          <Input
            placeholder="Downtown"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label>Number of Rooms</label>
          <Input placeholder="3" onChange={(e) => setNoRoom(e.target.value)} />
        </div>

        <div>
          <label>Number of Bathrooms</label>
          <Input
            placeholder="2"
            onChange={(e) => setNoBathRoom(e.target.value)}
          />
        </div>

        <div>
          <label>Area</label>
          <Input
            placeholder="1200 sqft"
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div>
          <label>Price</label>
          <Input
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
          <label>Image URL</label>
          <Input
            placeholder="https://example.com/image.jpg"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div>
          <label>Status</label>
          <Select onValueChange={(value) => setStatus(value)}>
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
          <Select onValueChange={(value) => setCatagory(value)}>
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
            type="number"
            min="0"
            max="5"
            step="0.1"
            onChange={(e) => setAverageRating(e.target.value)}
          />
          <small>Rating from 0 to 5</small>
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea
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
          {loading ? "Loading..." : "Create Apartment"}
        </Button>
      </div>
    </div>
  );
}
