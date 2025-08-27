import React, { useState, useEffect } from "react";
import { ID } from "appwrite";
import Select from "../select/Select";
import postsimageobj from "../../appwrite/userpostimage";
import postsdatabaseobj from "../../appwrite/userpostsdatabase";
import Input from "../input&btncomponent.jsx/input";
import Button from "../input&btncomponent.jsx/button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextEditor from "../rich-text-editor/TextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { ImageIcon, X } from "lucide-react";

const Postform = ({ post }) => {
  const [userdata, setUserdata] = useState(null);
  const data = useSelector((state) => state.authslice.userdata);
  console.log(data);

  // Sync local state with Redux data
  useEffect(() => {
    setUserdata(data);
    console.log(userdata);
    
  }, [data]);
  const { postid } = useParams();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(post?.featuredimage || null);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      slug: post?.slug || "",
    },
  });

  const user = useSelector((state) => state.authslice.userdata);
  const navigate = useNavigate();
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }, [imageFile]);

  const blogSubmit = async (data) => {
    setLoading(true);

    if (post) {
      const file = data.image?.[0]
        ? await postsimageobj.uploadfile(data.image[0])
        : null;
      console.log(file);

      let imageUrl = post.featuredimage;

      if (file) {
        await postsimageobj.deletefile(post.featuredimage);
        imageUrl = await postsimageobj.filepreview(file.$id);
      }

      const uploadingData = { ...data };
      delete uploadingData.image;

      const dbPost = await postsdatabaseobj.updatepost(post.$id, {
        ...uploadingData,
        featuredimage: imageUrl,
      });

      if (dbPost) {
        navigate(`/post/${postid}`);
      }
    } else {
      const file = data.image?.[0]
        ? await postsimageobj.uploadfile(data.image[0])
        : null;
      console.log(file);

      if (file) {
        const imageUrl = await postsimageobj.filepreview(file.$id);
        console.log(imageUrl);

        const uploadingData = { ...data };
        delete uploadingData.image;

        const dbPost = await postsdatabaseobj.createpost(ID.unique(), {
          ...uploadingData,
          userid: user.$id,
          featuredimage: imageUrl,
          createdBy: user?.email,
        });
        console.log(dbPost);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] mb-10">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white rounded-2xl shadow-md p-6">
        <form onSubmit={handleSubmit(blogSubmit)}>
          {/* Title + Status */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-5">
            {/* Title */}
            <div className="flex-1">
              <label className="block mb-1 text-gray-700 text-sm font-semibold">
                Title
              </label>
              <Input
                type="text"
                placeholder="Enter blog title"
                classNameInput="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="w-full md:w-40 mt-3 md:mt-0">
              <label className="block mb-1 text-gray-700 text-sm font-semibold">
                Status
              </label>
              <Select
                options={["active", "inactive"]}
                className="w-full border border-gray-300 rounded-lg p-2"
                {...register("status", { required: true })}
              />
            </div>
          </div>

          {/* Image + Editor */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Upload */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <label className="block mb-1 text-gray-700 text-sm font-semibold">
                Cover Image
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 relative">
                {preview ? (
                  <div className="relative w-full">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => setPreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-2 cursor-pointer w-full">
                    <ImageIcon className="w-8 h-8 text-purple-600" />
                    <span className="text-gray-600 text-sm">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("image", {
                        required: !post ? "Image is required" : false,
                      })}
                    />
                  </label>
                )}
              </div>
              {errors.image && (
                <p className="text-red-500 mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Editor */}
            <div className="w-full lg:w-2/3 flex flex-col">
              <label className="block mb-1 text-gray-700 text-sm font-semibold">
                Content
              </label>
              <TextEditor
                name="content"
                control={control}
                rules={{ required: "Content is required" }}
                defaultValue={getValues("content")}
              />
              {errors.content && (
                <p className="text-red-500 mt-1">{errors.content.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              text={post ? "Update" : "Submit"}
              bgColor={post ? "bg-green-500" : "bg-purple-600"}
              className="py-2 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postform;
