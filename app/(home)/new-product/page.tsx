"use client";

import axios from "axios";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Chip,
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
} from "react-icons/pi";
import {
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
  // Light orange background
  // {
  //   id: 5,
  //   label: "Success",
  //   icon: PiListBullets,
  //   color: "#9E9E9E",
  //   lightColor: "#FAFAFA",
  // }, // Light grey background
];

const NewProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getActiveCategory().then((data) => {
      setCategories(data);
    });
  }, []);
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const [alternative, setAlternative] = useState<Alternative[]>([]);
  useEffect(() => {
    getActiveAlternative().then((data) => {
      setAlternative(data);
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  //add new
  const [tags, setTags] = useState("");
  const [linekdin, setLinekdin] = useState("");
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

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [promoExpireDate, setPromoExpireDate] = React.useState<
    Date | undefined
  >(new Date());

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const [selectedAlternatives, setSelectedAlternatives] = useState<[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);

  const [alternativeIds, setAlternativeIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSubQuery, setSearchSubQuery] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchAlternativeQuery, setAlternativeSearchQuery] = useState("");
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );
  const [isMaker, setIsMaker] = useState<boolean>(true);

  const findMatchCategory = categories.find(
    (category: Category) => category.id === categoryId
  );

  const handleHeadlineChange = (e: any) => {
    const headlineText = e.target.value.slice(0, 70);
    setHeadline(headlineText);
  };
  const handletagsChange = (e: any) => {
    setTags(e.target.value);
  };
  const handlewebChange = (e: any) => {
    setWeburl(e.target.value);
  };
  const handleSuggestUrlChange = (e: any) => {
    setSuggestUrl(e.target.value);
  };
  const handlePromoChange = (e: any) => {
    setPromoOffer(e.target.value);
  };
  const handlePromoCodeChange = (e: any) => {
    setPromoCode(e.target.value);
  };
  const handleVideoLinkChange = (e: any) => {
    setVideoLink(e.target.value);
  };
  const handlePriceOptionChange = (e: any) => {
    setPriceOption(e.target.value);
  };
  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  const handleWebsiteChange = (e: any) => {
    setWebsite(e.target.value);
  };
  const handleLinekdin = (e: any) => {
    setLinekdin(e.target.value);
  };

  const handleTwitterChange = (e: any) => {
    setTwitter(e.target.value);
  };

  const handleShortDescriptionChange = (e: any) => {
    setShortDescription(e.target.value.slice(0, 300));
  };

  const handleNameChange = (e: any) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);
    setName(truncatedName);

    const slugValue = truncatedName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "-");
    setSlug(slugValue);
  };

  const handleLogoUpload = useCallback((url: any) => {
    setUploadedLogoUrl(url);
  }, []);

  const handleProductImagesUpload = useCallback((urls: string[]) => {
    setUploadedProductImages(urls);
  }, []);

  const nextStep = useCallback(() => {
    if (step === 1 && name.length < 4) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 4 characters for the product name.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );

      return;
    }
    if (step === 1 && headline.length < 10) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 10 characters for the headline.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step === 1 && selectedCategory === null) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please select at least 1 categories for the product.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step === 1 && shortDescription.length < 20) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 20 characters for the short description.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }
    if (step === 1 && !date) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please select a release date or choose the Coming soon option.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step == 1 && !website && !twitter && !discord) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least one link for the product.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step === 2 && !uploadedLogoUrl) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please upload a logo for the product.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
      return;
    }

    if (step === 2 && uploadedProductImages.length < 1) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Upload at least 3 images for the product.
            </div>
          </div>
        </>,
        {
          position: "top-center",
        }
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
    setLinekdin("");
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
    setSelectedCategory("");
    setUploadedProductImages([]);
    setUploadedLogoUrl("");
  };

  const submitProduct = async () => {
    setLoading(true);
    const formattedDate = date ? format(date, "MM/dd/yyyy") : "";
    const formattedExpireDate = date ? format(date, "MM/dd/yyyy") : "";

    try {
      const file = uploadedLogoUrl;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
        data
      );
      const { secure_url } = uploadRes.data;

      const list = await Promise.all(
        Object.values(uploadedProductImages).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
            data
          );

          const { secure_url } = uploadRes.data;
          return secure_url;
        })
      );

      await createProduct({
        name,
        tags,

        linekdin,
        weburl,
        suggestUrl,
        promoOffer,
        promoCode,
        videoLink,
        priceOption,
        price,
        slug,
        headline,
        website,
        twitter,
        discord,
        isMaker,
        makers: selectedUsers,
        images: list,
        description: shortDescription,
        logo: secure_url,
        releaseDate: formattedDate,
        promoExpire: formattedExpireDate,
        photos: list,
        categoryId: categoryId!,
        alternativeIds: alternativeIds!,
        subcategoryId: subCategoryId!,
      });
      setStep(6);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleStepClick = (stepId: number) => {
    setStep(stepId);
  };
  return (
    <div className="flex justify-center py-8 md:py-20">
      <div className="hidden md:block w-1/2 p-4 md:p-0">
        <div className="space-y-4 sticky top-10">
          {steps.map((stepItem) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.id;
            return (
              <button
                key={stepItem.id}
                onClick={() => handleStepClick(stepItem.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${
                  isActive ? "" : "text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: isActive ? stepItem.lightColor : "",
                }}
              >
                <Icon
                  className={`text-xl ${isActive ? "text-white" : ""}`}
                  style={{ color: isActive ? stepItem.color : stepItem.color }}
                />
                <span>{stepItem.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form content on the right side - Always visible */}
      <div className="px-3 w-full md:w-5/5 ms-20">
        {step === 1 && (
          <>
            <h1 className="text-4xl font-semibold"> New product</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Ready to showcase your product to the world? You came to the right
              place. Follow the steps below to get started.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Name of the product</h2>
              <input
                type="text"
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
              <h2 className="font-medium">
                Slug (URL) - This will be used to create a unique URL for
                yourproduct
              </h2>

              <input
                type="text"
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
                value={tags}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={handletagsChange}
                placeholder="Tags of the product"
              />
            </div>

            <h1 className="text-4xl font-semibold mt-10">
              {" "}
              What category does your product belong to ?{" "}
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Choose at least 1 categories that best fits your product. This
              will people discover your product
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Select Category</h2>
              <div className="pt-4">
                <Autocomplete
                  options={categories?.map((category) => ({
                    label: category.name,
                    id: category.id,
                  }))}
                  value={
                    selectedCategory
                      ? { label: selectedCategory, id: categories.toString() }
                      : null
                  }
                  onChange={(event, newValue) => {
                    if (newValue && typeof newValue === "object") {
                      setSelectedCategory(newValue.label);
                      setCategoryId(newValue?.id ?? null);
                    } else {
                      setSelectedCategory(null);
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
                          id: findMatchCategory?.toString(),
                        }
                      : null
                  }
                  onChange={(event, newValue) => {
                    if (newValue && typeof newValue === "object") {
                      setSelectedSubCategory(newValue.label);
                      setSubCategoryId(newValue?.id ?? null);
                    } else {
                      setSelectedSubCategory(null);
                      setSubCategoryId(null);
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
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-medium">Select Alternative</h2>
              <div className="pt-4">
                <Autocomplete
                  multiple
                  options={alternative?.map((category) => ({
                    label: category.name,
                    id: category.id,
                  }))}
                  value={selectedAlternatives}
                  onChange={(event, newValue) => {
                    setSelectedAlternatives(newValue as any);
                    setAlternativeIds(newValue.map((item) => item.id!));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Search Categories"
                      fullWidth
                      onChange={(e) =>
                        setAlternativeSearchQuery(e.target.value)
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div className="text-4xl font-semibold mt-10">Product Details</div>
            <p className="text-xl font-light mt-4 leading-8">
              Keep it simple and clear. Describe your product in a way that
              makes it easy for people to understand what it does.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Short Description</h2>
              <textarea
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

            <h1 className="text-4xl font-semibold mt-10">Additional Links </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Add links to your product&apos;s website, social media, and other
              platforms
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Web Url</h2>
              <input
                type="text"
                value={weburl}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={handlewebChange}
                placeholder="https://www.yourdomain.com"
              />
            </div>

            <div className="mt-10">
              <h2 className="font-medium">Suggest Url</h2>
              <input
                type="text"
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
                className="border rounded-md p-2 w-full mt-2 focus:outline-none "
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
                className="border rounded-md p-2 w-full mt-2 focus:outline-none "
                value={linekdin}
                onChange={handleLinekdin}
              />
            </div>

            <h1 className="text-4xl font-semibold mt-10"> Release Date</h1>
            <p className="text-xl font-light mt-4 leading-8">
              When will your product be available to the public? Select a date
              to continue.
            </p>

            <div className="mt-10">
              <div className="font-medium pb-3">Release date</div>
              <>
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
              </>
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
            </div>

            <div className="mt-4">
              <div className="font-medium">
                Product Images ( upload atleast 3 images )
              </div>
              {uploadedProductImages.length > 0 ? (
                <div className="mt-2 md:flex gap-2 space-y-4 md:space-y-0">
                  {uploadedProductImages.map((url, index) => (
                    <div key={index} className="relative  md:w-40 h-40 ">
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
            </div>
            <div className="mt-10">
              <h2 className="font-medium">Video Link</h2>
              <input
                type="text"
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
            <div className="mt-10">
              <h2 className="font-medium">Select Makers</h2>
              <div className="pt-4">
                <Autocomplete
                  multiple
                  options={users?.map((user) => ({
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
                      variant="outlined"
                      label="Search Makers"
                      fullWidth
                      onChange={(e) => setSearchUser(e.target.value)}
                    />
                  )}
                />
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
              >
                <MenuItem value="" disabled>
                  Select a price
                </MenuItem>
                <MenuItem value={"free"}>Free</MenuItem>
                <MenuItem value={"paid"}>Paid</MenuItem>
                <MenuItem value={"subscription"}>Subscription</MenuItem>
                <MenuItem value={"lifetime"}>Lifetime deal</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </div>
            <div className="mt-10">
              <h2 className="font-medium">Price</h2>
              <input
                type="text"
                value={price}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={handlePriceChange}
                placeholder="Enter  price "
              />
            </div>
            <div className="mt-10">
              <h2 className="font-medium">Promo Name</h2>
              <input
                type="text"
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
                value={promoCode}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={handlePromoCodeChange}
                placeholder="Enter a promo code"
              />
            </div>
            <div className="mt-10">
              <div className="font-medium pb-3">Expire date</div>
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
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
              </>
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
            <h1 className="text-4xl font-semibold"> 🔍 Review and submit</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Review the details of your product and submit it to the world.
              Your product will be reviewed by our team before it goes live.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="">
                <div className="font-semibold">Name of the product</div>
                <div className=" mt-2 text-gray-600">{name}</div>
              </div>

              <div className="">
                <div className="font-semibold">Slug ( URL ) </div>
                <div className=" mt-2 text-gray-600">{slug}</div>
              </div>

              <div className="">
                <div className="font-semibold">Headline</div>
                <div className="  mt-2 text-gray-600">{headline}</div>
              </div>
              <div className="">
                <div className="font-semibold">Tags</div>
                <div className="  mt-2 text-gray-600">{tags}</div>
              </div>

              <div className="">
                <div className="font-semibold">Category</div>
                <div className="  mt-2 text-gray-600">{selectedCategory}</div>
              </div>

              <div className="">
                <div className="font-semibold">Short description</div>
                <div className=" mt-2 text-gray-600 ">{shortDescription}</div>
              </div>

              <div>
                <div className="font-semibold">Website URL</div>
                <div className=" mt-2 text-gray-600">{website}</div>
              </div>
              <div>
                <div className="font-semibold">Suggest URL</div>
                <div className=" mt-2 text-gray-600">{suggestUrl}</div>
              </div>
              <div>
                <div className="font-semibold">Website</div>
                <div className=" mt-2 text-gray-600">{website}</div>
              </div>

              <div>
                <div className="font-semibold">Twitter</div>
                <div className=" mt-2 text-gray-600">{twitter}</div>
              </div>

              <div>
                <div className="font-semibold">LinkedIn</div>
                <div className=" mt-2 text-gray-600">{linekdin}</div>
              </div>

              <div className="">
                <div className="font-semibold">
                  Release date - Pending Approval
                </div>
                <div className=" mt-2 text-gray-600">
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
                <div className=" mt-2 text-gray-600">{price}</div>
              </div>
              <div>
                <div className="font-semibold">Promo Code Name</div>
                <div className=" mt-2 text-gray-600">{promoOffer}</div>
              </div>
              <div>
                <div className="font-semibold">Promo Code</div>
                <div className=" mt-2 text-gray-600">{promoCode}</div>
              </div>
              <div>
                <div className="font-semibold">Promo Code</div>
                <div className=" mt-2 text-gray-600">{promoCode}</div>
              </div>
              <div className="">
                <div className="font-semibold">Promo Code date - Expired</div>
                <div className=" mt-2 text-gray-600">
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
            <div className="text-4xl font-semibold"> Congratulations 🎉 </div>
            <div className="text-xl font-light mt-4 leading-8 ">
              Your product has been successfully submitted. Our team will review
              it and get back to you soon.
            </div>

            <div className="flex flex-col  gap-4">
              <div
                onClick={handleGoToProducts}
                className="bg-[#ff6154] text-white py-2 px-4
                 rounded mt-4 flex w-60 justify-center items-center cursor-pointer"
              >
                Go to your products
              </div>

              <Separator />

              <div
                onClick={submitAnotherProduct}
                className="text-[#ff6154] py-2 px-4 rounded mt-4 
                flex w-60 justify-center items-center cursor-pointer"
              >
                Submit another product
              </div>
            </div>
          </div>
        )}

        {step !== 5 && (
          <>
            <div className="flex justify-between items-center mt-10">
              {step !== 1 && (
                <button onClick={prevStep} className="text-gray-600">
                  Previous
                </button>
              )}

              <div className="flex items-center">
                {step === 4 ? (
                  <button
                    onClick={submitProduct}
                    className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4 items-end"
                  >
                    {step === 7 ? "Submit" : "Continue"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
