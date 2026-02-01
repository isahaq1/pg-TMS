"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";

interface AddSectorFormProps {
  onSubmit?: (data: SectorFormData) => void;
  onCancel?: () => void;
}

export interface SectorFormData {
  title: string;
  group: string;
  details: string;
}

// Zod schema for form validation
const sectorFormSchema = z.object({
  title: z
    .string()
    .min(4, "Sector title must be at least 4 characters")
    .max(200, "Sector title must not exceed 200 characters"),
  group: z
    .string()
    .optional(),
  details: z
    .string()
    .max(500, "details must not exceed 500 characters")
    .optional(),
});

type SectorFormValues = z.infer<typeof sectorFormSchema>;

export function AddSectorForm({ onSubmit, onCancel }: AddSectorFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SectorFormValues>({
    resolver: zodResolver(sectorFormSchema),
    defaultValues: {
      title: "",
      group: "",
      details: "",
    },
  });

  const onSubmitForm = (data: SectorFormValues) => {
    onSubmit?.(data as SectorFormData);
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <div className="w-full  p-[12px]">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="h-10 flex items-center">
          <h1 className="font-sans
  font-semibold
  text-base
  leading-6
  tracking-normal
  align-middle
  color-[#242529]">Add New Sector</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
          {/* First Row: Sector Name and Category */}
          <div className="flex gap-[16px] w-full">
            {/* Sector Name */}
            <div className="flex-1 flex flex-col gap-[4px]">
              <Label htmlFor="title" className="text-[#242529] font-[var(--font-1)] font-medium text-[14px] leading-[14px] tracking-[-0.28px]">
                Sector Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter Sector Title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Sector Group */}
            <div className="flex-1 flex flex-col gap-[4px]">
              <Label htmlFor="group" className="text-[#242529] font-[var(--font-1)] font-medium text-[14px] leading-[14px] tracking-[-0.28px]">
                Sector Group
              </Label>
              <Controller
                name="group"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={errors.group ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select sector Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feed">Feed</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="fish">Fish</SelectItem>
                      <SelectItem value="cattle">Cattle</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.group && (
                <p className="text-red-500 text-sm mt-1">{errors.group.message}</p>
              )}
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="details" className="text-[#242529] font-[var(--font-1)] font-medium text-[14px] leading-[14px] tracking-[-0.28px]">
              Description
            </Label>
            <Textarea
              id="details"
              placeholder="Add sector details"
              {...register("details")}
              className={`font-inter font-normal text-base leading-6 tracking-normal text-[#00000066] ${errors.details ? "border-red-500" : ""}`}
            />
            {errors.details && (
              <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              type="submit"
              className="w-[117px] h-[32px] py-[4px] px-[12px] rounded-[6px] bg-[#2783DE] opacity-100"
            >
              Create Sector
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-[71px] h-[32px] px-[12px] rounded-[6px] border border-[#767676] bg-[#FFFFFF] opacity-100"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}