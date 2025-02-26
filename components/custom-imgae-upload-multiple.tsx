"use client";

import axios from "axios";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import LogoUploader from "@/components/custom-image-upload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  createProduct,
  getActiveAlternative,
  getActiveCategory,
  getUsers,
} from "@/lib/server-actions";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import {
  PiPackage,
  PiNotepad,
  PiLink,
  PiEye,
  PiLinkedinLogo,
  PiListBullets,
  PiCalendar,
  PiPlanet,
  PiTwitterLogoFill,
  PiXCircleFill,
} from "react-icons/pi";
import { toast } from "sonner";
import ImagesUploader from "@/components/custom-imgae-upload-multiple";
import { Alternative, Category, User } from "@/services/types";

const steps = [
  {
    id: 1,
    label: "Product Main Info",
    icon: PiPackage,
    color: "#F44336",
    lightColor: "#FFECEC",
  },
  {
    id: 2,
    label: "Media",
    icon: PiLink,
    color: "#3F51B5",
    lightColor: "#EDEFFF",
  },
  {
    id: 3,
    label: "Makers",
    icon: PiListBullets,
    color: "#9E9E9E",
    lightColor: "#FAFAFA",
  },
  {
    id: 4,
    label: "Pricing & Promo",
    icon: PiNotepad,
    color: "#4CAF50",
    lightColor: "#E8F5E9",
  },
  {
    id: 5,
    label: "Checklist",
    icon: PiEye,
    color: "#FF9800",
    lightColor: "#FFF3E0",
  },
];

const NewProduct: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [weburl, setWeburl] = useState("");
  const [suggestUrl, setSuggestUrl] = useState("");
  const [promoOffer, setPromoOffer] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [price, setPrice] = useState("");
  const [slug, setSlug] = useState("");
  const [headline, setHeadline] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [priceOption, setPriceOption] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [promoExpireDate, setPromoExpireDate] = useState<Date | undefined>(
    new Date()
  );
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [selectedAlternatives, setSelectedAlternatives] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);
  const [alternativeIds, setAlternativeIds] = useState<string[]>([]);
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );
  const [isMaker, setIsMaker] = useState<boolean>(true);

  useEffect(() => {
    getActiveCategory().then((data) => setCategories(data));
    getUsers().then((data) => setUsers(data));
    getActiveAlternative().then((data) => setAlternatives(data));
  }, []);

  const findMatchCategory = categories.find(
    (category: Category) => category.id === categoryId
  );

  const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const headlineText = e.target.value.slice(0, 70);
    setHeadline(headlineText);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  const handleWebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeburl(e.target.value);
  };

  const handleSuggestUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuggestUrl(e.target.value);
  };

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoOffer(e.target.value);
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(e.target.value);
  };

  const handlePriceOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceOption(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  const handleLinkedin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedin(e.target.value);
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitter(e.target.value);
  };

  const handleShortDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setShortDescription(e.target.value.slice(0, 300));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);
    setName(truncatedName);
    const slugValue = truncatedName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "-");
    setSlug(slugValue);
  };

  const handleLogoUpload = useCallback((url: string) => {
    setUploadedLogoUrl(url);
  }, []);

  const handleProductImagesUpload = useCallback((urls: string[]) => {
    setUploadedProductImages(urls);
  }, []);

  const nextStep = useCallback(() => {
    if (step === 1 && name.length < 4) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please enter at least 4 characters for the product name.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 1 && headline.length < 10) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please enter at least 10 characters for the headline.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 1 && selectedCategory === null) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please select at least 1 category for the product.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 1 && shortDescription.length < 20) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please enter at least 20 characters for the short description.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 1 && !date) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please select a release date or choose the Coming soon option.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 1 && !website && !twitter && !discord) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please enter at least one link for the product.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 2 && !uploadedLogoUrl) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Please upload a logo for the product.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }
    if (step === 2 && uploadedProductImages.length < 1) {
      toast(
        <div className="flex items-center gap-4 mx-auto">
          <PiXCircleFill className="text-red-500 text-3xl" />
          <div className="text-md font-semibold">
            Upload at least 1 image for the product.
          </div>
        </div>,
        { position: "top-center" }
      );
      return;
    }

    setStep(step + 1);
  }, [
    step,
    name,
    selectedCategory,
    headline,
    shortDescription,
    uploadedLogoUrl,
    uploadedProductImages,
    date,
    website,
    twitter,
    discord,
  ]);

  const prevStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleGoToProducts = () => {
    window.location.href = "/my-products";
  };

  const submitAnotherProduct = () => {
    setStep(1);
    setName("");
    setTags("");
    setLinkedin("");
    setWeburl("");
    setSuggestUrl("");
    setPromoOffer("");
    setPromoCode("");
    setVideoLink("");
    setPrice("");
    setSlug("");
    setPriceOption("");
    setHeadline("");
    setShortDescription("");
    setDate(new Date());
    setPromoExpireDate(new Date());
    setWebsite("");
    setTwitter("");
    setDiscord("");
    setSelectedCategory(null);
    setUploadedProductImages([]);
    setUploadedLogoUrl("");
  };

  const submitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formattedDate = date ? format(date, "MM/dd/yyyy") : "";
    const formattedExpireDate = promoExpireDate
      ? format(promoExpireDate, "MM/dd/yyyy")
      : "";

    try {
      const logoFile = formData.get("logo") as File;
      let secureUrl = uploadedLogoUrl;
      if (logoFile && logoFile.size > 0) {
        const logoData = new FormData();
        logoData.append("file", logoFile);
        logoData.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
          logoData
        );
        secureUrl = uploadRes.data.secure_url;
      }

      const imageFiles = formData.getAll("photos") as File[];
      const imageList = await Promise.all(
        imageFiles.map(async (file) => {
          if (file.size > 0) {
            const imageData = new FormData();
            imageData.append("file", file);
            imageData.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
              imageData
            );
            return uploadRes.data.secure_url;
          }
          return null;
        })
      ).then((urls) => urls.filter((url): url is string => url !== null));

      await createProduct({
        name: formData.get("name") as string,
        tags: formData.get("tags") as string,
        linekdin: formData.get("linkedin") as string,
        weburl: formData.get("weburl") as string,
        suggestUrl: formData.get("suggestUrl") as string,
        promoOffer: formData.get("promoOffer") as string,
        promoCode: formData.get("promoCode") as string,
        videoLink: formData.get("videoLink") as string,
        priceOption: formData.get("priceOption") as string,
        price: formData.get("price") as string,
        slug: formData.get("slug") as string,
        headline: formData.get("headline") as string,
        website: formData.get("website") as string,
        twitter: formData.get("twitter") as string,
        discord: formData.get("discord") as string,
        isMaker: formData.get("isMaker") === "true",
        makers: selectedUsers,
        images: imageList,
        description: formData.get("description") as string,
        logo: secureUrl,
        releaseDate: formattedDate,
        promoExpire: formattedExpireDate,
        photos: imageList,
        categoryId: categoryId || "",
        alternativeIds,
        subcategoryId: subCategoryId || "",
      });

      setStep(6);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to submit product.");
    }
  };

  const handleStepClick = (stepId: number) => {
    setStep(stepId);
  };

  return (
    <div className="py-8 md:py-20">
      <div className="hidden md:block md:p-0 ms-2 mb-16">
        <Box sx={{ width: "100%", mb: 4 }}>
          <Stepper activeStep={step - 1} alternativeLabel>
            {steps.map((stepItem, index) => {
              const isActive = step === stepItem.id;
              return (
                <Step key={stepItem.id}>
                  <StepLabel
                    onClick={() => handleStepClick(stepItem.id)}
                    style={{ cursor: "pointer" }}
                    icon={
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: `2px solid ${
                            isActive ? "#A96E60" : "#CFD0D1"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "transparent",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: isActive
                              ? "#AE583C"
                              : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isActive ? "#FFFFFF" : "#000000",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>
                    }
                  >
                    <div
                      style={{
                        marginTop: "8px",
                        color: isActive ? "#A96E60" : "#000000",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    >
                      {stepItem.label}
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </div>

      <div className="bg-[#F5F5F5] p-10">
        <form onSubmit={submitProduct}>
          {step === 1 && (
            <>
              <h1 className="text-4xl font-semibold">New product</h1>
              <p className="text-xl font-light mt-4 leading-8">
                Ready to showcase your product to the world? You came to the
                right place. Follow the steps below to get started.
              </p>

              <div className="mt-10">
                <h2 className="font-medium">Name of the product</h2>
                <input
                  type="text"
                  name="name"
                  value={name}
                  maxLength={30}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handleNameChange}
                  placeholder="Simply the name of the product"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {name.length} / 30
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Slug (URL)</h2>
                <input
                  type="text"
                  name="slug"
                  value={slug}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  readOnly
                  placeholder="Simply the name of the product"
                />
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Headline</h2>
                <input
                  type="text"
                  name="headline"
                  value={headline}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handleHeadlineChange}
                  placeholder="Headline of the product"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {headline.length} / 70
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Tags</h2>
                <input
                  type="text"
                  name="tags"
                  value={tags}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handleTagsChange}
                  placeholder="Tags of the product"
                />
              </div>

              <h1 className="text-4xl font-semibold mt-10">
                What category does your product belong to?
              </h1>
              <p className="text-xl font-light mt-4 leading-8">
                Choose at least 1 category that best fits your product. This
                will help people discover your product.
              </p>

              <div className="mt-10">
                <h2 className="font-medium">Select Category</h2>
                <div className="pt-4">
                  <Autocomplete
                    options={categories.map((category) => ({
                      label: category.name,
                      id: category.id,
                    }))}
                    value={
                      selectedCategory
                        ? { label: selectedCategory, id: categoryId || "" }
                        : null
                    }
                    onChange={(event, newValue) => {
                      if (newValue && typeof newValue === "object") {
                        setSelectedCategory(newValue.label);
                        setCategoryId(newValue.id);
                      } else {
                        setSelectedCategory(null);
                        setCategoryId(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="category"
                        variant="outlined"
                        label="Search Categories"
                        fullWidth
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Select Sub Category</h2>
                <div className="pt-4">
                  <Autocomplete
                    options={
                      findMatchCategory?.subcategories?.map((category) => ({
                        label: category.name,
                        id: category.id,
                      })) || []
                    }
                    value={
                      selectedSubCategory
                        ? {
                            label: selectedSubCategory,
                            id: subCategoryId || "",
                          }
                        : null
                    }
                    onChange={(event, newValue) => {
                      if (newValue && typeof newValue === "object") {
                        setSelectedSubCategory(newValue.label);
                        setSubCategoryId(newValue.id);
                      } else {
                        setSelectedSubCategory(null);
                        setSubCategoryId(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="subcategory"
                        variant="outlined"
                        label="Search Subcategories"
                        fullWidth
                        onChange={(e) => setSearchSubQuery(e.target.value)}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Select Alternative</h2>
                <div className="pt-4">
                  <Autocomplete
                    multiple
                    options={alternatives.map((alt) => ({
                      label: alt.name,
                      id: alt.id,
                    }))}
                    value={selectedAlternatives}
                    onChange={(event, newValue) => {
                      setSelectedAlternatives(newValue);
                      setAlternativeIds(newValue.map((item) => item.id));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="alternatives"
                        variant="outlined"
                        label="Search Alternatives"
                        fullWidth
                        onChange={(e) =>
                          setAlternativeSearchQuery(e.target.value)
                        }
                      />
                    )}
                  />
                </div>
              </div>

              <div className="text-4xl font-semibold mt-10">
                Product Details
              </div>
              <p className="text-xl font-light mt-4 leading-8">
                Keep it simple and clear. Describe your product in a way that
                makes it easy for people to understand what it does.
              </p>

              <div className="mt-10">
                <h2 className="font-medium">Short Description</h2>
                <textarea
                  name="description"
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  rows={8}
                  maxLength={300}
                  value={shortDescription}
                  onChange={handleShortDescriptionChange}
                  placeholder="Short description of the product"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {shortDescription.length} / 300
                </div>
              </div>

              <h1 className="text-4xl font-semibold mt-10">Additional Links</h1>
              <p className="text-xl font-light mt-4 leading-8">
                Add links to your product&apos;s website, social media, and
                other platforms
              </p>

              <div className="mt-10">
                <h2 className="font-medium">Web Url</h2>
                <input
                  type="text"
                  name="weburl"
                  value={weburl}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handleWebChange}
                  placeholder="https://www.yourdomain.com"
                />
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Suggest Url</h2>
                <input
                  type="text"
                  name="suggestUrl"
                  value={suggestUrl}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handleSuggestUrlChange}
                  placeholder="https://www.yourdomain.com/suggest"
                />
              </div>

              <div className="mt-10">
                <div className="font-medium flex items-center gap-x-2">
                  <PiPlanet className="text-2xl text-gray-600" />
                  <span>Website</span>
                </div>
                <input
                  type="text"
                  name="website"
                  value={website}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  placeholder="https://www.yourdomain.com"
                  onChange={handleWebsiteChange}
                />
              </div>

              <div className="mt-10">
                <div className="font-medium flex items-center gap-x-2">
                  <PiTwitterLogoFill className="text-2xl text-sky-400" />
                  <div>Twitter</div>
                </div>
                <input
                  placeholder="https://www.twitter.com"
                  type="text"
                  name="twitter"
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  value={twitter}
                  onChange={handleTwitterChange}
                />
              </div>

              <div className="mt-10">
                <div className="font-medium flex items-center gap-x-2">
                  <PiLinkedinLogo className="text-2xl text-sky-400" />
                  <div>LinkedIn</div>
                </div>
                <input
                  placeholder="https://www.linkedin.com"
                  type="text"
                  name="linkedin"
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  value={linkedin}
                  onChange={handleLinkedin}
                />
              </div>

              <h1 className="text-4xl font-semibold mt-10">Release Date</h1>
              <p className="text-xl font-light mt-4 leading-8">
                When will your product be available to the public? Select a date
                to continue.
              </p>

              <div className="mt-10">
                <div className="font-medium pb-3">Release date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <PiCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => setDate(date)}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <input type="hidden" name="releaseDate" value={formattedDate} />
              </div>
            </>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <h1 className="text-4xl font-semibold">
                Add images to showcase your product
              </h1>
              <p className="text-xl font-light mt-4 leading-8">
                Include images that best represent your product. This will help
                people understand what your product looks like.
              </p>

              <div className="mt-10">
                <h2 className="font-medium">Logo</h2>
                {uploadedLogoUrl ? (
                  <div style={{ marginTop: 16 }}>
                    <Image
                      src={uploadedLogoUrl}
                      alt="Uploaded Logo"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <LogoUploader
                    endpoint="productLogo"
                    onChange={handleLogoUpload}
                  />
                )}
                <input type="hidden" name="logo" value={uploadedLogoUrl} />
              </div>

              <div className="mt-4">
                <div className="font-medium">
                  Product Images (upload at least 1 image)
                </div>
                {uploadedProductImages.length > 0 ? (
                  <div className="mt-2 md:flex gap-2 space-y-4 md:space-y-0">
                    {uploadedProductImages.map((url, index) => (
                      <div key={index} className="relative md:w-40 h-40">
                        <Image
                          priority
                          src={url}
                          alt="Uploaded Product Image"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ImagesUploader
                    endpoint="productImages"
                    onChange={handleProductImagesUpload}
                  />
                )}
                {uploadedProductImages.map((url, index) => (
                  <input key={index} type="hidden" name="photos" value={url} />
                ))}
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Video Link</h2>
                <input
                  type="text"
                  name="videoLink"
                  value={videoLink}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handleVideoLinkChange}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isMaker}
                    onChange={(e) => setIsMaker(e.target.checked)}
                    color="primary"
                  />
                }
                label="Is Maker"
              />
              <input type="hidden" name="isMaker" value={isMaker.toString()} />
              <div className="mt-10">
                <h2 className="font-medium">Select Makers</h2>
                <div className="pt-4">
                  <Autocomplete
                    multiple
                    options={users.map((user) => ({
                      label: user.name,
                      id: user.id,
                    }))}
                    value={selectedUsers.map((userId) => {
                      const user = users.find((u) => u.id === userId);
                      return user ? { label: user.name, id: user.id } : null;
                    })}
                    onChange={(event, newValue) => {
                      if (Array.isArray(newValue)) {
                        setSelectedUsers(newValue.map((item) => item!.id));
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="makers"
                        variant="outlined"
                        label="Search Makers"
                        fullWidth
                      />
                    )}
                  />
                  {selectedUsers.map((userId, index) => (
                    <input
                      key={index}
                      type="hidden"
                      name="makers"
                      value={userId}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="mt-10">
                <h2 className="font-medium">Select Price Option</h2>
                <Select
                  value={priceOption}
                  onChange={handlePriceOptionChange}
                  fullWidth
                  className="mt-2"
                  name="priceOption"
                >
                  <MenuItem value="" disabled>
                    Select a price
                  </MenuItem>
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="subscription">Subscription</MenuItem>
                  <MenuItem value="lifetime">Lifetime deal</MenuItem>
                </Select>
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Price</h2>
                <input
                  type="text"
                  name="price"
                  value={price}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handlePriceChange}
                  placeholder="Enter price"
                />
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Promo Name</h2>
                <input
                  type="text"
                  name="promoOffer"
                  value={promoOffer}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handlePromoChange}
                  placeholder="Enter a promo name"
                />
              </div>

              <div className="mt-10">
                <h2 className="font-medium">Promo Code</h2>
                <input
                  type="text"
                  name="promoCode"
                  value={promoCode}
                  className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                  onChange={handlePromoCodeChange}
                  placeholder="Enter a promo code"
                />
              </div>

              <div className="mt-10">
                <div className="font-medium pb-3">Expire date</div>
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
                      <PiCalendar className="ml-auto h-4 w-4 opacity-50" />
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
                <input
                  type="hidden"
                  name="promoExpire"
                  value={formattedExpireDate}
                />
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <h1 className="text-4xl font-semibold">🔍 Review and submit</h1>
              <p className="text-xl font-light mt-4 leading-8">
                Review the details of your product and submit it to the world.
                Your product will be reviewed by our team before it goes live.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold">Name of the product</div>
                  <div className="mt-2 text-gray-600">{name}</div>
                </div>
                <div>
                  <div className="font-semibold">Slug (URL)</div>
                  <div className="mt-2 text-gray-600">{slug}</div>
                </div>
                <div>
                  <div className="font-semibold">Headline</div>
                  <div className="mt-2 text-gray-600">{headline}</div>
                </div>
                <div>
                  <div className="font-semibold">Tags</div>
                  <div className="mt-2 text-gray-600">{tags}</div>
                </div>
                <div>
                  <div className="font-semibold">Category</div>
                  <div className="mt-2 text-gray-600">{selectedCategory}</div>
                </div>
                <div>
                  <div className="font-semibold">Short description</div>
                  <div className="mt-2 text-gray-600">{shortDescription}</div>
                </div>
                <div>
                  <div className="font-semibold">Website URL</div>
                  <div className="mt-2 text-gray-600">{website}</div>
                </div>
                <div>
                  <div className="font-semibold">Suggest URL</div>
                  <div className="mt-2 text-gray-600">{suggestUrl}</div>
                </div>
                <div>
                  <div className="font-semibold">Website</div>
                  <div className="mt-2 text-gray-600">{website}</div>
                </div>
                <div>
                  <div className="font-semibold">Twitter</div>
                  <div className="mt-2 text-gray-600">{twitter}</div>
                </div>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="mt-2 text-gray-600">{linkedin}</div>
                </div>
                <div>
                  <div className="font-semibold">
                    Release date - Pending Approval
                  </div>
                  <div className="mt-2 text-gray-600">
                    {date ? date.toDateString() : "Not specified"}
                  </div>
                </div>
                <div className="cols-span-2">
                  <div className="font-semibold">Product Images</div>
                  <div className="mt-2 md:flex gap-2 w-full">
                    {uploadedProductImages.map((url, index) => (
                      <div key={index} className="relative w-28 h-28">
                        <Image
                          priority
                          src={url}
                          alt="Uploaded Product Image"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Select Price</div>
                  <div className="mt-2 text-gray-600">{price}</div>
                </div>
                <div>
                  <div className="font-semibold">Promo Code Name</div>
                  <div className="mt-2 text-gray-600">{promoOffer}</div>
                </div>
                <div>
                  <div className="font-semibold">Promo Code</div>
                  <div className="mt-2 text-gray-600">{promoCode}</div>
                </div>
                <div>
                  <div className="font-semibold">Promo Code date - Expired</div>
                  <div className="mt-2 text-gray-600">
                    {promoExpireDate
                      ? promoExpireDate.toDateString()
                      : "Not specified"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <div className="space-y-10">
              <div className="text-4xl font-semibold">Congratulations 🎉</div>
              <div className="text-xl font-light mt-4 leading-8">
                Your product has been successfully submitted. Our team will
                review it and get back to you soon.
              </div>
              <div className="flex flex-col gap-4">
                <div
                  onClick={handleGoToProducts}
                  className="bg-[#ff6154] text-white py-2 px-4 rounded mt-4 flex w-60 justify-center items-center cursor-pointer"
                >
                  Go to your products
                </div>
                <Separator />
                <div
                  onClick={submitAnotherProduct}
                  className="text-[#ff6154] py-2 px-4 rounded mt-4 flex w-60 justify-center items-center cursor-pointer"
                >
                  Submit another product
                </div>
              </div>
            </div>
          )}

          {step !== 5 && step !== 6 && (
            <div className="flex justify-between items-center mt-10">
              {step !== 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-gray-600"
                >
                  Previous
                </button>
              )}
              <div className="flex items-center">
                {step === 4 ? (
                  <Button
                    type="submit"
                    className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
