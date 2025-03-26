import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Apartment } from "@/types/apartment-type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  noRoom: z.string().min(1, {
    message: "Number of rooms is required.",
  }),
  noBathRoom: z.string().min(1, {
    message: "Number of bathrooms is required.",
  }),
  area: z.string().min(1, {
    message: "Area is required.",
  }),
  features: z.array(z.string()).min(1, {
    message: "Select at least one feature.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  availableFrom: z.string().min(1, {
    message: "Available from date is required.",
  }),
  availableTo: z.string().min(1, {
    message: "Available to date is required.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
  catagory: z.string().min(1, {
    message: "Category is required.",
  }),
  averageRating: z.coerce.number().min(0).max(5, {
    message: "Rating must be between 0 and 5.",
  }),
});

interface ApartmentFormProps {
  apartment?: Apartment;
  onSubmit: (data: any) => void;
}

export function ApartmentForm({ apartment, onSubmit }: ApartmentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: apartment
      ? {
          ...apartment,
          features: apartment.features || [],
        }
      : {
          title: "",
          description: "",
          location: "",
          noRoom: "",
          noBathRoom: "",
          area: "",
          features: [],
          price: 0,
          availableFrom: "",
          availableTo: "",
          imageUrl: "",
          status: "Available",
          catagory: "",
          averageRating: 0,
        },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(apartment ? { ...values, id: apartment.id } : values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Luxury Apartment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Downtown" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Rooms</FormLabel>
                <FormControl>
                  <Input placeholder="3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noBathRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Bathrooms</FormLabel>
                <FormControl>
                  <Input placeholder="2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="1200 sqft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available From</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available To</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-secondary">
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="catagory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-secondary">
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Budget">Budget</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="averageRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Rating</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="5" step="0.1" {...field} />
                </FormControl>
                <FormDescription>Rating from 0 to 5</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A beautiful luxury apartment in the heart of the city"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Features</FormLabel>
                <FormDescription>
                  Select the features available in this apartment.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature) => (
                  <FormField
                    key={feature.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={feature.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      feature.label,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== feature.label
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {feature.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">
            {apartment ? "Update" : "Create"} Apartment
          </Button>
        </div>
      </form>
    </Form>
  );
}
