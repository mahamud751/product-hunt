import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  ChevronLeft, 
  Save, 
  Type, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from 'lucide-react';
import slugify from 'slugify';

interface BlogEditorProps {
  onBack: () => void;
}

export default function BlogEditor({ onBack }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: 'Write your blog post here...'
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4'
      }
    }
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(slugify(newTitle, { lower: true }));
  };

  const handleSave = () => {
    const blogPost = {
      title,
      description,
      slug,
      category,
      author,
      image,
      content: editor?.getHTML(),
      isPublished,
      publishedAt: publishedAt || new Date().toISOString()
    };
    console.log('Saving blog post:', blogPost);
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Posts
        </button>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg hover:bg-[#8E4730] transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Create & create another</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            placeholder="A short description of the post (will be used in meta tags)"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <div className="border border-gray-200 rounded-lg">
            {/* Editor Toolbar */}
            <div className="border-b border-gray-200 p-2 flex items-center space-x-2">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('bold') ? 'bg-gray-100' : ''
                }`}
              >
                <Bold className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('italic') ? 'bg-gray-100' : ''
                }`}
              >
                <Italic className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().setParagraph().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('paragraph') ? 'bg-gray-100' : ''
                }`}
              >
                <Type className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('heading', { level: 1 }) ? 'bg-gray-100' : ''
                }`}
              >
                <Heading1 className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''
                }`}
              >
                <Heading2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('bulletList') ? 'bg-gray-100' : ''
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('orderedList') ? 'bg-gray-100' : ''
                }`}
              >
                <ListOrdered className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                className="p-2 rounded hover:bg-gray-100"
              >
                <AlignLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                className="p-2 rounded hover:bg-gray-100"
              >
                <AlignCenter className="w-5 h-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                className="p-2 rounded hover:bg-gray-100"
              >
                <AlignRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter the URL');
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className={`p-2 rounded hover:bg-gray-100 ${
                  editor?.isActive('link') ? 'bg-gray-100' : ''
                }`}
              >
                <LinkIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter the image URL');
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
                className="p-2 rounded hover:bg-gray-100"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] bg-gray-50"
            placeholder="Will be generated automatically from title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blog post category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog post category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            >
              <option value="">Select an option</option>
              <option value="product-launch">Product Launch</option>
              <option value="marketing">Marketing</option>
              <option value="community">Community</option>
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            >
              <option value="">John Doe</option>
              <option value="jane-smith">Jane Smith</option>
              <option value="mike-johnson">Mike Johnson</option>
            </select>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#AF583B] hover:text-[#8E4730] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#AF583B]"
                >
                  <span>Drag & Drop your files or Browse</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Publishing Options */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 text-[#AF583B] focus:ring-[#AF583B] border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
              Is published
            </label>
          </div>
          
          {isPublished && (
            <div>
              <label htmlFor="publishedAt" className="block text-sm text-gray-900">
                Published at
              </label>
              <input
                type="datetime-local"
                id="publishedAt"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}