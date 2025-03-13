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

const Postform = ({ post }) => {
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

  // Watch for file input change
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

      let imageUrl = post.featuredimage; // Default to existing image

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

      if (file) {
        const imageUrl = await postsimageobj.filepreview(file.$id);
        const uploadingData = { ...data };
        delete uploadingData.image;

        const dbPost = await postsdatabaseobj.createpost(ID.unique(), {
          ...uploadingData,
          userid: user.$id,
          featuredimage: imageUrl,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-5 rounded-2xl bg-purple-200 mx-10">
        <form onSubmit={handleSubmit(blogSubmit)}>
          <Input
            type="text"
            placeholder="Enter blog title"
            classNameInput="w-full p-2 border bg-none rounded mb-4"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <Input
            type="file"
            accept="image/*"
            classNameInput="mb-4"
            {...register("image", {
              required: !post ? "Image is required" : false,
            })}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 mb-4 w-full  h-40 object-cover rounded-lg"
            />
          )}
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <TextEditor
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            defaultValue={getValues("content")}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}

          <Button
            type="submit"
            text={post ? "Update" : "Submit"}
            bgColor={post ? "bg-green-500" : undefined}
            className="mt-3 block mx-auto w-[40%]"
          />
        </form>
      </div>
      <div className="h-14"></div>
    </div>
  );
};

export default Postform;
