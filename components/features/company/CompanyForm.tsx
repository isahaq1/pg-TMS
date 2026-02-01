"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import {Upload01Icon,Delete03Icon} from "hugeicons-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";


// Zod validation schema
const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  officialEmail: z.string().min(1, "Official email is required").email("Invalid email address"),
  sector: z.string().min(1, "Sector is required"),
  administrator: z.string().optional(),
  companyAddress: z.string().optional(),
  websiteUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid URL format" }
    ),
  description: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

// Mock data for dropdowns
const sectors = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Real Estate",
  "Energy",
];

const administrators = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "David Wilson",
];

export  function CompanyForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      officialEmail: "",
      sector: "",
      administrator: "",
      companyAddress: "",
      websiteUrl: "",
      description: "",
    },
  });

  const sector = watch("sector");
  const administrator = watch("administrator");

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        console.log("File size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setLogoFile(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setLogoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: CompanyFormData) => {
    console.log("Form Data:", data);
    console.log("Logo File:", logoFile);
    console.log("Company created successfully!");
    
    // Reset form
    reset();
    handleRemoveLogo();
  };

  const handleCancel = () => {
    reset();
    handleRemoveLogo();
    console.log("Form cleared");
  };

  return (
    <div className="w-full  p-[12px]">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="font-sans
  font-semibold
  text-base
  leading-6
  tracking-normal
  align-middle
  color-[#242529]">
          Add New Company
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Logo Upload Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Profile Image */}
          <div className="relative w-[60px] h-[60px] shrink-0">
            <div className="w-[60px] h-[60px] rounded-full bg-white border border-black/40 flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-[34px] h-[34px] bg-[#f8f9fa] rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 2C10 2 10 2 10 2C10 2 10 2 10 2"
                      stroke="#e74c3c"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Upload/Remove Buttons */}
          <div className="flex-1 w-full sm:w-auto">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md flex items-center w-[133px]  h-[32px] gap-2 pt-1 pr-3 pb-1 pl-3 rounded-md bg-[#2783DE] opacity-100"
              >
                <Upload01Icon size={16} strokeWidth={1.5} className="font-sans  font-medium text-[14px]   text-center align-middle text-[#F3F9FD]"/>
                <span className="font-sans  font-medium text-[14px] leading-[20px] tracking-normal text-center align-middle text-[#F3F9FD]">Upload Logo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoPreview && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className=" border border-[#767676] text-[#2f3033] px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colorsflex items-center w-[133px]  h-[32px] gap-2 pt-1 pr-3 pb-1 pl-3 rounded-md bg-[#FFFFFF] opacity-100"
                >
                  <Delete03Icon size={16} strokeWidth={1.5} />
                  <span className="font-sans  font-medium text-[14px] leading-[20px] tracking-normal text-center align-middle text-[#2F3033]">Remove</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Company Name and Official Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="flex flex-col gap-1">
            <Label>
              Company Name *
            </Label>
            <Input
              {...register("name")}
              type="text"
              placeholder="Enter company name"
              className=""
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Official Email */}
          <div className="flex flex-col gap-1">
          <Label>
              Official Email*
            </Label>
            <Input
              {...register("officialEmail")}
              type="email"
              placeholder="Enter official email address"
              
            />
            {errors.officialEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.officialEmail.message}</p>
            )}
          </div>
        </div>

        {/* Select Sector and Administrator Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select Sector */}
          <div className="flex flex-col gap-1">
            <Label>
              Select Sector*
            </Label>
            <Controller
                name="sector"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={errors.sector ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select sector Sector" />
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
            {errors.sector && (
              <p className="text-red-500 text-xs mt-1">{errors.sector.message}</p>
            )}
          </div>

          {/* Administrator */}
          <div className="flex flex-col gap-1">
            <Label>
              Administrator
            </Label>
            <Controller
                name="administrator"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={errors.administrator ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select administrator" />
                    </SelectTrigger>
                    <SelectContent>
                    {administrators.map((admin) => (
                      <SelectItem key={admin}  value={admin}>{admin}</SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                )}
              />
            {errors.administrator && (
              <p className="text-red-500 text-xs mt-1">{errors.administrator.message}</p>
            )}
           
          </div>
        </div>

        {/* Company Address and Website URL Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Address */}
          <div className="flex flex-col gap-1">
            <Label>
              Company Address
            </Label>
            <Input
              {...register("companyAddress")}
              type="text"
              placeholder="Address"
              
            />
          </div>

          {/* Website URL */}
          <div className="flex flex-col gap-1">
            <Label >
              Website URL
            </Label>
            <Input
              {...register("websiteUrl")}
              type="text"
              placeholder="Add company website link"
            />
            {errors.websiteUrl && (
              <p className="text-red-500 text-xs mt-1">{errors.websiteUrl.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label>
            Description
          </Label>
          <div className="relative">
            <Textarea
              {...register("description")}
              placeholder="Add company description"
             
            />
  
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="submit"
            className="rounded-md flex items-center w-[149px]  h-[32px] gap-2 pt-1 pr-3 pb-1 pl-3 rounded-md bg-[#2783DE] opacity-100"
          >
             <span className="font-sans  font-medium text-[14px] leading-[20px] tracking-normal text-center align-middle text-[#F3F9FD]">Create Company</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-[#767676] text-[#2f3033] px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colorsflex items-center w-[71px]  h-[32px] gap-2 pt-1 pr-3 pb-1 pl-3 rounded-md bg-[#FFFFFF] opacity-100"
          >
            <span className="font-sans  font-medium text-[14px] leading-[20px] tracking-normal text-center align-middle text-[#2F3033]">Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
}