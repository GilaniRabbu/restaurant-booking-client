/* eslint-disable */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateMealMutation } from "@/redux/api/mealApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Props = {
  onSuccess?: () => void;
};

export default function MealsForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [createMeal, { isLoading }] = useCreateMealMutation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onSubmit = async (formDataRaw: any) => {
    const formData = new FormData();

    // Append text fields
    formData.append("name", formDataRaw.name);
    formData.append("description", formDataRaw.description);
    formData.append("type", formDataRaw.type);
    formData.append("price", formDataRaw.price);
    formData.append("categories", formDataRaw.categories);

    // Append files
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      await createMeal(formData).unwrap();
      toast.success("Meal created successfully!");
      reset();
      setSelectedFiles([]);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create meal");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Meal Name</Label>
          <Input
            id="name"
            placeholder="Enter Meal Name"
            {...register("name")}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter Meal Description"
            {...register("description")}
            required
          />
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            {...register("type")}
            placeholder="e.g. DINNER"
            required
          />
        </div>

        <div>
          <Label htmlFor="categories">Categories (comma separated)</Label>
          <Input
            id="categories"
            placeholder="e.g. CHICKEN, DINNER"
            {...register("categories")}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price")}
            required
            step="0.01"
            placeholder="Enter Meal Price"
          />
        </div>

        <div>
          <Label htmlFor="images">Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setSelectedFiles(Array.from(files));
              }
            }}
          />
        </div>

        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isSubmitting || isLoading}
        >
          {isLoading || isSubmitting ? "Submitting..." : "Create Meal"}
        </Button>
      </form>
    </>
  );
}
