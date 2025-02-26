"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";
import {
  createProduct,
  getActiveAlternative,
  getActiveCategory,
  getUsers,
} from "@/lib/server-actions";
import { Alternative, Category, User } from "@/services/types";
import {
  ArrowRight,
  Save,
  Check,
  Search,
  Upload,
  Link as LinkIcon,
  Info,
  ChevronDown,
  X,
} from "lucide-react";

// Define Types
interface ProductFormData {
  name: string;
  slug: string;
  tagline: string;
  tags: string[];
  primaryCategory: string;
  subcategory: string;
  alternatives: string[];
  shortDescription: string;
  websiteUrl: string;
  socialLinks: { twitter?: string; linkedin?: string };
  logo: File | string | null;
  headerImage: File | string | null;
  productImages: (File | string)[];
  videoUrl: string;
  workedOnProduct: boolean;
  makers: string[];
  pricing: string;
  pricingDetails: { amount: number; currency: string; interval?: string };
  launchDate: Date | null;
  launchNotes: string;
  submissionTier: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Inline Sidebar Component
const Sidebar: React.FC<{
  currentStep: number;
  steps: Step[];
  onStepClick: (step: number) => void;
}> = ({ currentStep, steps, onStepClick }) => (
  <div className="w-80 bg-white border-r border-gray-200 p-6 h-screen fixed left-0 top-0">
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#AF583B] rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold">P</span>
        </div>
        <h1 className="text-xl font-semibold text-[#1F1F1F]">Product Launch</h1>
      </div>
      <div className="space-y-6">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? "bg-[#AF583B]/10" : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? "bg-[#198E49]"
                    : isActive
                    ? "bg-[#AF583B]"
                    : "bg-gray-200"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-sm text-white">{step.id}</span>
                )}
              </div>
              <div className="text-left">
                <p
                  className={`text-sm font-medium ${
                    isActive ? "text-[#AF583B]" : "text-[#1F1F1F]"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// Inline ProgressBar Component
const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#AF583B] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Inline FormField Component
const FormField: React.FC<{
  label: string;
  tooltip?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, tooltip, error, children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <div className="flex items-center space-x-2">
      <label className="block text-sm font-medium text-[#1F1F1F]">
        {label}
      </label>
      {tooltip && (
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-400" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-900 text-white text-xs rounded-lg z-50">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Inline MultiSelect Component
const MultiSelect: React.FC<{
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  className?: string;
}> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
  maxItems,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else if (!maxItems || value.length < maxItems) {
      onChange([...value, option]);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="block truncate">
            {value.length > 0 ? value.join(", ") : placeholder}
          </span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between ${
                value.includes(option) ? "bg-gray-50" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              <span>{option}</span>
              {value.includes(option) && (
                <Check className="w-4 h-4 text-[#AF583B]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Inline FileUpload Component
const FileUpload: React.FC<{
  onFileSelect: (file: File | string) => void;
  accept?: string;
  multiple?: boolean;
  preview?: string | null;
  className?: string;
  value?: File | string | null;
}> = ({
  onFileSelect,
  accept = "image/*",
  multiple = false,
  className = "",
  value,
}) => {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileSelect(files[0]);
        setPreviewUrl(URL.createObjectURL(files[0]));
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onFileSelect(url);
      setPreviewUrl(url);
    }
  };

  const toggleMode = () => {
    setIsUrlMode(!isUrlMode);
    setUrl("");
    setPreviewUrl(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={toggleMode}
          className="text-sm text-gray-600 hover:text-[#AF583B] flex items-center space-x-1"
        >
          <LinkIcon className="w-4 h-4" />
          <span>{isUrlMode ? "Upload File" : "Paste URL"}</span>
        </button>
      </div>
      {isUrlMode ? (
        <form onSubmit={handleUrlSubmit} className="space-y-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Add URL
          </button>
        </form>
      ) : (
        <div
          className={`relative border-2 border-dashed border-gray-300 rounded-lg hover:border-[#AF583B] transition-colors ${
            previewUrl ? "p-0" : "p-6"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
          />
          {previewUrl ? (
            <div className="relative group">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <span className="text-white text-sm">
                  Click or drag to change
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop your file here, or click to select
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Inline PricingSection Component
const PricingSection: React.FC<{
  selectedTier: string;
  onTierSelect: (tier: string) => void;
}> = ({ selectedTier, onTierSelect }) => {
  interface PricingFeature {
    text: string;
    included: boolean;
    highlight?: boolean;
    info?: string;
  }

  interface PricingTier {
    name: string;
    description: string;
    price: number;
    period?: string;
    features: PricingFeature[];
    cta: { text: string; action: () => void };
  }

  const pricingTiers: PricingTier[] = [
    {
      name: "Regular Launch",
      description: "Free listing with a wait time and limited spots.",
      price: 0,
      features: [
        { text: "1+ months of processing time", included: true },
        { text: "Unverified launch", included: true },
        { text: "Regular Reach", included: true },
        { text: "No-follow backlinks", included: true },
        { text: "No featured spot", included: true },
        { text: "No prominent placement", included: true },
      ],
      cta: {
        text: "Select Regular Launch",
        action: () => onTierSelect("regular"),
      },
    },
    {
      name: "Pro Launch",
      description: "Get more exposure and flexibility for your launch.",
      price: 25,
      features: [
        { text: "24-hour processing time", included: true },
        { text: "Verified launch", included: true },
        { text: "10x brand visibility", included: true },
        { text: "Do-follow link to your website", included: true },
        { text: "Featured spot on homepage", included: true },
        { text: "No prominent placement", included: true },
      ],
      cta: { text: "Select Pro Launch", action: () => onTierSelect("pro") },
    },
    {
      name: "Featured Launch",
      description: "All Pro Launch + prominent placement.",
      price: 150,
      features: [
        { text: "12-hour processing time", included: true },
        { text: "Submit to top 50 directories", included: true },
        { text: "SEO Audit ($50 Value)", included: true },
        { text: "1x Guest Post Included", included: true },
        { text: "30 Days SEO Content Plan", included: true },
        { text: "All prominent placement", included: true },
      ],
      cta: {
        text: "Select Featured Launch",
        action: () => onTierSelect("featured"),
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-[#1F1F1F]">
          Spotlight Your Product
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Get More Traffic, leads, and sales from day one. Select a package that
          suits your goals - from free listing to featured launch.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-lg border p-6 space-y-6 transition-all ${
              selectedTier === tier.name.toLowerCase().replace(" ", "-")
                ? "border-[#AF583B] shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1F1F1F]">
                {tier.name}
              </h3>
              <p className="text-gray-600 text-sm">{tier.description}</p>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-[#1F1F1F]">
                {tier.price === 0 ? "Free" : `$${tier.price}`}
              </span>
            </div>
            <div className="space-y-4">
              {tier.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-[#1F1F1F]">{feature.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={tier.cta.action}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                selectedTier === tier.name.toLowerCase().replace(" ", "-")
                  ? "bg-[#1F1F1F] text-white hover:bg-[#1F1F1F]/90"
                  : "bg-white text-[#1F1F1F] border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span>{tier.cta.text}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define Steps
const STEPS: Step[] = [
  {
    id: 1,
    title: "Product Details",
    description: "Basic information about your product",
    icon: "info",
  },
  {
    id: 2,
    title: "Media",
    description: "Images and videos of your product",
    icon: "image",
  },
  {
    id: 3,
    title: "Makers & Pricing",
    description: "Team and pricing information",
    icon: "users",
  },
  {
    id: 4,
    title: "Launch Date",
    description: "When you want to launch",
    icon: "calendar",
  },
  {
    id: 5,
    title: "Review",
    description: "Final check before submission",
    icon: "check",
  },
];

// Initial Form Data
const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  tagline: "",
  tags: [],
  primaryCategory: "",
  subcategory: "",
  alternatives: [],
  shortDescription: "",
  websiteUrl: "",
  socialLinks: { twitter: "", linkedin: "" },
  logo: null,
  headerImage: null,
  productImages: [],
  videoUrl: "",
  workedOnProduct: true,
  makers: [],
  pricing: "free",
  pricingDetails: { amount: 0, currency: "USD" },
  launchDate: new Date(),
  launchNotes: "",
  submissionTier: "regular",
};

// Main Component
const NewProduct: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);
  const [alternativeIds, setAlternativeIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchSubQuery, setSearchSubQuery] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string>("");
  const [searchAlternativeQuery, setAlternativeSearchQuery] =
    useState<string>("");

  const [promoOffer, setPromoOffer] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoExpireDate, setPromoExpireDate] = useState<Date | undefined>(
    new Date()
  );

  // Fetch Data
  useEffect(() => {
    getActiveCategory().then((data) => setCategories(data));
    getUsers().then((data) => setUsers(data as any));
    getActiveAlternative().then((data) => setAlternatives(data));
  }, []);

  // Generate Slug from Name
  useEffect(() => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")
        .slice(0, 30);
      handleInputChange("slug", slug);
    }
  }, [formData.name]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const headlineText = e.target.value.slice(0, 70);
    handleInputChange("tagline", headlineText);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(
      "tags",
      e.target.value.split(",").map((tag) => tag.trim())
    );
  };

  const handleWebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("websiteUrl", e.target.value);
  };

  const handleSuggestUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Not in formData, could extend if needed
  };

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoOffer(e.target.value);
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("videoUrl", e.target.value);
  };

  const handlePriceOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange("pricing", e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("pricingDetails", {
      ...formData.pricingDetails,
      amount: parseFloat(e.target.value) || 0,
    });
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("websiteUrl", e.target.value);
  };

  const handleLinkedin = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("socialLinks", {
      ...formData.socialLinks,
      linkedin: e.target.value,
    });
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange("socialLinks", {
      ...formData.socialLinks,
      twitter: e.target.value,
    });
  };

  const handleShortDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange("shortDescription", e.target.value.slice(0, 300));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);
    handleInputChange("name", truncatedName);
  };

  const handleLogoUpload = useCallback((file: File | string) => {
    handleInputChange("logo", file);
  }, []);

  const handleProductImagesUpload = useCallback((files: (File | string)[]) => {
    handleInputChange("productImages", files);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep === 1 && formData.name.length < 4) {
      toast.error("Please enter at least 4 characters for the product name.");
      return;
    }
    if (currentStep === 1 && formData.tagline.length < 10) {
      toast.error("Please enter at least 10 characters for the tagline.");
      return;
    }
    if (currentStep === 1 && !formData.primaryCategory) {
      toast.error("Please select at least 1 category for the product.");
      return;
    }
    if (currentStep === 1 && formData.shortDescription.length < 20) {
      toast.error(
        "Please enter at least 20 characters for the short description."
      );
      return;
    }
    if (currentStep === 1 && !formData.launchDate) {
      toast.error("Please select a release date.");
      return;
    }
    if (
      currentStep === 1 &&
      !formData.websiteUrl &&
      !formData.socialLinks.twitter &&
      !formData.socialLinks.linkedin
    ) {
      toast.error("Please enter at least one link for the product.");
      return;
    }
    if (currentStep === 2 && !formData.logo) {
      toast.error("Please upload a logo for the product.");
      return;
    }
    if (currentStep === 2 && formData.productImages.length < 1) {
      toast.error("Upload at least 1 image for the product.");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  }, [currentStep, formData]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const handleSaveAsDraft = () => {
    console.log("Saved as draft:", formData);
    toast.success("Product saved as draft!");
  };

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedDate = formData.launchDate
      ? format(formData.launchDate, "MM/dd/yyyy")
      : "";
    const formattedExpireDate = promoExpireDate
      ? format(promoExpireDate, "MM/dd/yyyy")
      : "";

    try {
      let logoUrl = "";
      if (formData.logo instanceof File) {
        const logoData = new FormData();
        logoData.append("file", formData.logo);
        logoData.append("upload_preset", "upload");
        const logoRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
          logoData
        );
        logoUrl = logoRes.data.secure_url;
      } else if (typeof formData.logo === "string") {
        logoUrl = formData.logo;
      }

      const imageList = await Promise.all(
        formData.productImages.map(async (file) => {
          if (file instanceof File) {
            const imageData = new FormData();
            imageData.append("file", file);
            imageData.append("upload_preset", "upload");
            const imageRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
              imageData
            );
            return imageRes.data.secure_url;
          }
          return file;
        })
      );

      await createProduct({
        name: formData.name,
        tags: formData.tags.join(","),

        //@ts-ignore
        linekdin: formData.socialLinks.linkedin,
        weburl: formData.websiteUrl,
        suggestUrl: "",
        promoOffer,
        promoCode,
        videoLink: formData.videoUrl,
        priceOption: formData.pricing,
        price: formData.pricingDetails.amount.toString(),
        slug: formData.slug,
        headline: formData.tagline,
        website: formData.websiteUrl,
        //@ts-ignore
        twitter: formData.socialLinks.twitter,
        discord: "",
        isMaker: formData.workedOnProduct,
        makers: formData.makers,
        images: imageList,
        description: formData.shortDescription,
        logo: logoUrl,
        releaseDate: formattedDate,
        promoExpire: formattedExpireDate,
        photos: imageList,
        categoryId: categoryId || "",
        alternativeIds,
        subcategoryId: subCategoryId || "",
      });

      toast.success("Product submitted successfully!");
      setFormData(initialFormData);
      setPromoOffer("");
      setPromoCode("");
      setPromoExpireDate(new Date());
      setCurrentStep(1);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit product.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Tell Us About Your Product
        </h2>
        <p className="text-gray-600">
          We&apos;ll need its name, tagline, launch tags, and description.
        </p>

        <FormField
          label="Product Name"
          tooltip="This will be the official name of your product."
        >
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            maxLength={30}
            placeholder="Enter your product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
          <span className="text-sm text-gray-500">
            {formData.name.length} / 30
          </span>
        </FormField>

        <FormField
          label="Slug (URL)"
          tooltip="This unique URL helps users find your product (e.g., www.launchpap.com/product-name)."
        >
          <input
            type="text"
            value={formData.slug}
            readOnly
            placeholder="your-product-name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </FormField>

        <FormField
          label="Tagline"
          tooltip="Write a compelling one-liner that highlights your product's key value."
        >
          <input
            type="text"
            value={formData.tagline}
            onChange={handleHeadlineChange}
            maxLength={70}
            placeholder="A short, catchy tagline for your product"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
          <span className="text-sm text-gray-500">
            {formData.tagline.length} / 70
          </span>
        </FormField>

        <FormField
          label="Launch Tags"
          tooltip="Add relevant tags to help people discover your product."
        >
          <MultiSelect
            options={categories.map((cat) => cat.name)}
            value={formData.tags}
            onChange={(value) => handleInputChange("tags", value)}
            placeholder="e.g., SaaS, AI, Productivity"
            maxItems={3}
          />
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Categorize Your Product
        </h2>

        <FormField
          label="Primary Category"
          tooltip="Choose the category that best fits your product."
        >
          <Autocomplete
            options={categories.map((category) => ({
              label: category.name,
              id: category.id,
            }))}
            value={
              formData.primaryCategory
                ? { label: formData.primaryCategory, id: categoryId || "" }
                : null
            }
            onChange={(event, newValue) => {
              if (newValue && typeof newValue === "object") {
                handleInputChange("primaryCategory", newValue.label);
                setCategoryId(newValue.id || null);
              } else {
                handleInputChange("primaryCategory", "");
                setCategoryId(null);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search Categories"
                fullWidth
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          />
        </FormField>

        <FormField
          label="Subcategory"
          tooltip="Narrow down your product classification."
        >
          <Autocomplete
            options={
              categories
                .find((cat) => cat.id === categoryId)
                ?.subcategories?.map((sub) => ({
                  label: sub.name,
                  id: sub.id,
                })) || []
            }
            value={
              formData.subcategory
                ? { label: formData.subcategory, id: subCategoryId || "" }
                : null
            }
            onChange={(event, newValue) => {
              if (newValue && typeof newValue === "object") {
                handleInputChange("subcategory", newValue.label);
                setSubCategoryId(newValue.id || null);
              } else {
                handleInputChange("subcategory", "");
                setSubCategoryId(null);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search Subcategories"
                fullWidth
                onChange={(e) => setSearchSubQuery(e.target.value)}
              />
            )}
            disabled={!categoryId}
          />
        </FormField>

        <FormField
          label="Suggest an Alternative"
          tooltip="Search and select an alternative that best matches your product."
        >
          <MultiSelect
            options={alternatives.map((alt) => alt.name)}
            value={formData.alternatives}
            onChange={(value) => {
              handleInputChange("alternatives", value);
              setAlternativeIds(
                alternatives
                  .filter((alt) => value.includes(alt.name))
                  .map((alt) => alt.id)
                  .filter((id) => id !== undefined) as string[]
              );
            }}
            placeholder="Which well-known tool is this an alternative to?"
          />
        </FormField>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Describe Your Product
        </h2>

        <FormField
          label="Short Description"
          tooltip="Keep it simple and clear to help users understand your product quickly."
        >
          <textarea
            value={formData.shortDescription}
            onChange={handleShortDescriptionChange}
            maxLength={300}
            placeholder="Briefly describe what your product does and why it's valuable."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent h-32"
          />
          <span className="text-sm text-gray-500">
            {formData.shortDescription.length} / 300
          </span>
        </FormField>

        <FormField
          label="Website URL"
          tooltip="Provide the main website where users can learn more about your product."
        >
          <input
            type="url"
            value={formData.websiteUrl}
            onChange={handleWebsiteChange}
            placeholder="https://yourdomain.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Twitter URL"
            tooltip="Share your product's official Twitter handle."
          >
            <input
              type="url"
              value={formData.socialLinks.twitter || ""}
              onChange={handleTwitterChange}
              placeholder="https://twitter.com/yourproduct"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </FormField>

          <FormField
            label="LinkedIn URL"
            tooltip="Share your product's official LinkedIn page."
          >
            <input
              type="url"
              value={formData.socialLinks.linkedin || ""}
              onChange={handleLinkedin}
              placeholder="https://linkedin.com/company/yourproduct"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </FormField>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Showcase Your Product
        </h2>
        <p className="text-gray-600 mt-2">
          Upload images and videos to give users a clear view of your product.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FormField
          label="Logo Upload"
          tooltip="Upload a high-quality logo (Recommended: 240x240px, JPG/PNG/GIF, Max: 2MB)."
        >
          <FileUpload
            onFileSelect={handleLogoUpload}
            value={formData.logo}
            className="h-48"
          />
          {formData.logo && typeof formData.logo === "object" && (
            <Image
              src={URL.createObjectURL(formData.logo)}
              alt="Uploaded Logo"
              width={100}
              height={100}
              className="mt-2 rounded-md"
            />
          )}
        </FormField>

        <FormField
          label="Header Image"
          tooltip="Recommended: 1200x630px, JPG/PNG/GIF, Max: 2MB."
        >
          <FileUpload
            onFileSelect={(file) => handleInputChange("headerImage", file)}
            value={formData.headerImage}
            className="h-48"
          />
          {formData.headerImage && typeof formData.headerImage === "object" && (
            <Image
              src={URL.createObjectURL(formData.headerImage)}
              alt="Uploaded Header"
              width={100}
              height={100}
              className="mt-2 rounded-md"
            />
          )}
        </FormField>
      </div>

      <FormField
        label="Product Images"
        tooltip="The first image will be used as the social preview. Upload at least 1 image."
      >
        <div className="grid grid-cols-3 gap-4">
          <FileUpload
            onFileSelect={(file) => handleProductImagesUpload([file])}
            value={formData.productImages[0]}
            className="h-48"
          />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-4">
          {formData.productImages.map(
            (file, index) =>
              typeof file === "object" && (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Product Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              )
          )}
        </div>
      </FormField>

      <FormField
        label="Video / Loom Link"
        tooltip="A video demo can help users understand your product better."
      >
        <input
          type="url"
          value={formData.videoUrl}
          onChange={handleVideoLinkChange}
          placeholder="https://www.youtube.com/watch?v=xxxxxx"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
        />
      </FormField>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Did you work on this product?
        </h2>
        <p className="text-gray-600">
          It&apos;s fine either way. Just need to know.
        </p>

        <div className="space-y-4">
          <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="workedOnProduct"
              checked={formData.workedOnProduct === true}
              onChange={() => handleInputChange("workedOnProduct", true)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-[#1F1F1F]">
                I worked on this product
              </p>
              <p className="text-sm text-blue-600">
                I'll be listed as both Hunter and Maker of this product
              </p>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="workedOnProduct"
              checked={formData.workedOnProduct === false}
              onChange={() => handleInputChange("workedOnProduct", false)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-[#1F1F1F]">
                I didn&apos;t work on this product
              </p>
              <p className="text-sm text-blue-600">
                I&apos;ll be listed as Hunter of this product
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Who worked on this product?
        </h2>
        <p className="text-gray-600">
          You&apos;re free to add anyone who worked on this product.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Autocomplete
              multiple
              options={users.map((user) => ({
                label: user.name,
                id: user.id,
              }))}
              value={formData.makers.map((userId) => {
                const user = users.find((u) => u.id === userId);
                return user ? { label: user.name, id: user.id } : null;
              })}
              onChange={(event, newValue) => {
                if (Array.isArray(newValue)) {
                  handleInputChange(
                    "makers",
                    newValue.map((item) => item!.id)
                  );
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Search Makers"
                  fullWidth
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="pl-10"
                />
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-[#1F1F1F] mb-6">
          Select Price & Promotions
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <FormField label="Pricing Model" tooltip="Select your pricing model">
            <select
              value={formData.pricing}
              onChange={handlePriceOptionChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            >
              <option value="free">Free</option>
              <option value="paid">Paid (Subscription)</option>
              <option value="lifetime">Lifetime Deal</option>
              <option value="one-time">One-time Payment</option>
            </select>
          </FormField>

          {formData.pricing !== "free" && (
            <FormField label="Price Amount" tooltip="Enter the price amount">
              <div className="flex">
                <select
                  value={formData.pricingDetails?.currency}
                  onChange={(e) =>
                    handleInputChange("pricingDetails", {
                      ...formData.pricingDetails,
                      currency: e.target.value,
                    })
                  }
                  className="w-24 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricingDetails?.amount}
                  onChange={handlePriceChange}
                  className="flex-1 px-4 py-2 border-y border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </FormField>
          )}

          <FormField
            label="Promo Name"
            tooltip="Enter a promotional offer name"
          >
            <input
              type="text"
              value={promoOffer}
              onChange={handlePromoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
              placeholder="Enter a promo name"
            />
          </FormField>

          <FormField label="Promo Code" tooltip="Enter a promotional code">
            <input
              type="text"
              value={promoCode}
              onChange={handlePromoCodeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
              placeholder="Enter a promo code"
            />
          </FormField>

          <FormField
            label="Promo Expire Date"
            tooltip="Select promo expiration date"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[300px] pl-3 text-left font-normal",
                    !promoExpireDate && "text-muted-foreground"
                  )}
                >
                  {promoExpireDate ? (
                    format(promoExpireDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <Check className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={promoExpireDate}
                  onSelect={(date) => setPromoExpireDate(date)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </FormField>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">
          Set Your Launch Date
        </h2>
        <p className="text-gray-600 mt-2">
          Choose when your product will be available to the public.
        </p>
      </div>

      <FormField
        label="Launch Date"
        tooltip="Choose when your product will be available to the public."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[300px] pl-3 text-left font-normal",
                !formData.launchDate && "text-muted-foreground"
              )}
            >
              {formData.launchDate ? (
                format(formData.launchDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <Check className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.launchDate || undefined}
              onSelect={(date) => handleInputChange("launchDate", date)}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </FormField>

      <FormField
        label="Launch Notes"
        tooltip="Add any special notes or announcements for your launch."
      >
        <textarea
          value={formData.launchNotes}
          onChange={(e) => handleInputChange("launchNotes", e.target.value)}
          placeholder="Share any special launch details, promotions, or announcements..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF583B] focus:border-transparent h-32"
        />
      </FormField>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-semibold text-[#1F1F1F]">Final Review</h2>
        <p className="text-gray-600 mt-2">
          Double-check everything before submitting.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1F1F1F] mb-4">
            Product Details
          </h3>
          <dl className="space-y-4">
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Name:</dt>
              <dd className="w-2/3 font-medium">{formData.name || "—"}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Tagline:</dt>
              <dd className="w-2/3">{formData.tagline || "—"}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Category:</dt>
              <dd className="w-2/3">
                {`${formData.primaryCategory}${
                  formData.subcategory ? ` › ${formData.subcategory}` : ""
                }`}
              </dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Tags:</dt>
              <dd className="w-2/3">{formData.tags.join(", ") || "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1F1F1F] mb-4">Media</h3>
          <dl className="space-y-4">
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Logo:</dt>
              <dd className="w-2/3">{formData.logo ? "✓ Uploaded" : "—"}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Header Image:</dt>
              <dd className="w-2/3">
                {formData.headerImage ? "✓ Uploaded" : "—"}
              </dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Product Images:</dt>
              <dd className="w-2/3">{`${formData.productImages.length} uploaded`}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1F1F1F] mb-4">
            Pricing & Launch
          </h3>
          <dl className="space-y-4">
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Pricing Model:</dt>
              <dd className="w-2/3 capitalize">{formData.pricing}</dd>
            </div>
            {formData.pricing !== "free" && (
              <div className="flex">
                <dt className="w-1/3 text-gray-500">Price:</dt>
                <dd className="w-2/3">{`${formData.pricingDetails.currency} ${formData.pricingDetails.amount}`}</dd>
              </div>
            )}
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Launch Date:</dt>
              <dd className="w-2/3">
                {formData.launchDate ? format(formData.launchDate, "PPP") : "—"}
              </dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Promo Offer:</dt>
              <dd className="w-2/3">{promoOffer || "—"}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Promo Code:</dt>
              <dd className="w-2/3">{promoCode || "—"}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3 text-gray-500">Promo Expire:</dt>
              <dd className="w-2/3">
                {promoExpireDate ? format(promoExpireDate, "PPP") : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12 pt-12 border-t">
        <PricingSection
          selectedTier={formData.submissionTier}
          onTierSelect={(tier) => handleInputChange("submissionTier", tier)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        currentStep={currentStep}
        steps={STEPS}
        onStepClick={handleStepChange}
      />
      <main className="ml-80 p-8">
        <div className="max-w-3xl mx-auto">
          <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
          <form onSubmit={submitProduct} className="mt-8 space-y-8 pb-24">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </form>

          <div className="fixed bottom-0 left-80 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
              <button
                type="button"
                onClick={handleSaveAsDraft}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Save className="w-4 h-4" />
                <span>Save as Draft</span>
              </button>

              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Previous
                  </button>
                )}
                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-2 bg-[#AF583B] text-white rounded-lg hover:bg-[#AF583B]/90"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#198E49] text-white rounded-lg hover:bg-[#198E49]/90 disabled:bg-gray-400"
                  >
                    {loading ? "Submitting..." : "Submit Product"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewProduct;
