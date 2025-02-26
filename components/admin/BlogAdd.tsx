"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { createBlog } from "@/lib/server-actions"; // Assuming you'll create this server action
import { TINY_MCE_EDITOR_INIT } from "@/lib/constants";
import { Blog } from "@/services/types";

interface Content {
  title: string;
  description: string;
  photos: string[];
}

const BlogAdd = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [readtime, setReadtime] = useState("");
  const [headline, setHeadline] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState<File[]>([]); // For main blog photos
  const [contents, setContents] = useState<Content[]>([
    { title: "", description: "", photos: [] },
  ]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleReadtime = (e: React.ChangeEvent<HTMLInputElement>) =>
    setReadtime(e.target.value);
  const handleHeadline = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHeadline(e.target.value);
  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDesc(e.target.value);

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleContentChange = (
    index: number,
    field: keyof Content,
    value: string | File[]
  ) => {
    const updatedContents = [...contents];
    if (field === "photos" && value instanceof Array) {
      updatedContents[index].photos = []; // Reset photos, we'll upload them later
      handleContentImageUpload(index, value); // Upload immediately
    } else {
      //@ts-ignore
      updatedContents[index][field] = value;
    }
    setContents(updatedContents);
  };

  const addContentItem = () => {
    setContents([...contents, { title: "", description: "", photos: [] }]);
  };

  const handleContentImageUpload = async (index: number, files: File[]) => {
    try {
      const list = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
            data
          );
          return uploadRes.data.url;
        })
      );
      const updatedContents = [...contents];
      updatedContents[index].photos = list;
      setContents(updatedContents);
    } catch (error) {
      console.error("Error uploading content images:", error);
      toast.error("Failed to upload content images.");
    }
  };

  const submitBlog = async () => {
    setLoading(true);
    try {
      // Upload main blog photos
      const photoUrls = await Promise.all(
        photos.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
            data
          );
          return uploadRes.data.url;
        })
      );

      const blogData: Blog = {
        name,
        readtime,
        headline,
        desc,
        photos: photoUrls,
        contents: contents.map((content) => ({
          title: content.title,
          description: content.description,
          photos: content.photos,
        })),
        userId: user.id,
      };

      await createBlog(blogData);
      toast.success("Blog created successfully!");
      setName("");
      setReadtime("");
      setHeadline("");
      setDesc("");
      setPhotos([]);
      setContents([{ title: "", description: "", photos: [] }]);
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-8 md:py-20">
      <div className="px-8 w-full md:w-2/5 ms-20">
        <h1 className="text-4xl font-semibold">New Blog</h1>

        <div className="mt-10">
          <h2 className="font-medium">Blog Name</h2>
          <input
            type="text"
            value={name}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleName}
            placeholder="Enter blog name"
          />
        </div>

        <div className="mt-10">
          <h2 className="font-medium">Read Time</h2>
          <input
            type="text"
            value={readtime}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleReadtime}
            placeholder="e.g., 5 min read"
          />
        </div>

        <div className="mt-10">
          <h2 className="font-medium">Headline</h2>
          <input
            type="text"
            value={headline}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleHeadline}
            placeholder="Enter blog headline"
          />
        </div>

        <div className="mt-10">
          <h2 className="font-medium">Description</h2>
          <textarea
            rows={4}
            value={desc}
            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
            onChange={handleDesc}
            placeholder="Enter blog description"
          />
        </div>

        <div className="mt-10">
          <h2 className="font-medium">Main Photos</h2>
          <input
            type="file"
            multiple
            className="border rounded-md p-2 w-full mt-2"
            onChange={handlePhotos}
          />
          {photos.length > 0 && (
            <div className="mt-2">
              {photos.map((file, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Contents Section */}
        {contents.map((content, index) => (
          <div key={index} className="mt-10">
            <h2 className="font-medium">Content Section {index + 1}</h2>
            <div className="mt-4">
              <h3 className="font-medium">Title</h3>
              <input
                type="text"
                value={content.title}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={(e) =>
                  handleContentChange(index, "title", e.target.value)
                }
                placeholder="Section title"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-medium">Description</h3>
              <Editor
                apiKey="9i9siri6weyxjml0qbccbm35m7o5r42axcf3lv0mbr0k3pkl"
                init={TINY_MCE_EDITOR_INIT}
                value={content.description}
                onEditorChange={(newValue: string) =>
                  handleContentChange(index, "description", newValue)
                }
              />
            </div>
            <div className="mt-4">
              <h3 className="font-medium">Photos</h3>
              <input
                type="file"
                multiple
                className="border rounded-md p-2 w-full mt-2"
                onChange={(e) =>
                  handleContentChange(
                    index,
                    "photos",
                    Array.from(e.target.files || [])
                  )
                }
              />
              {content.photos.length > 0 && (
                <div className="mt-2">
                  {content.photos.map((url, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      {url.split("/").pop()} {/* Show file name from URL */}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addContentItem}
          className="text-[#ff6154] py-2 px-4 rounded-md mt-4"
        >
          + Add Another Content Section
        </button>

        <button
          onClick={submitBlog}
          disabled={loading}
          className="bg-[#ff6154] text-white py-2 px-4 rounded-md mt-4 items-end disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </div>
    </div>
  );
};

export default BlogAdd;
