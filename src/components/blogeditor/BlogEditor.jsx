import React from "react";
import { ID } from "appwrite";
import Select from "../select/Select";
import postsimageobj from "../../appwrite/userpostimage";
import postsdatabaseobj from "../../appwrite/userpostsdatabase";
import Input from "../input&btncomponent.jsx/input";
import Button from "../input&btncomponent.jsx/button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextEditor from "../rich-text-editor/TextEditor";
import { useNavigate } from "react-router-dom";
const BlogEditor = ({ post }) => {
  const user = useSelector(state=>state.authslice.userdata)
  const {
    register,
    handleSubmit,
    control,
    getValues,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      slug: post?.slug || "",
    },
  });

  const navigate = useNavigate();

  const blogSubmit = async (data) => {
    if (post) {
      const beforeeditimg = post.featuredimage;
      const file = data.image[0]
        ? await postsimageobj.uploadfile(data.image[0])
        : null;
  
      let imageUrl = beforeeditimg; // Default to existing image
  
      if (file) {
        await postsimageobj.deletefile(post.featuredimage);
        imageUrl = await postsimageobj.filepreview(file.$id); // Get URL
      }
  
      const uploadingdata = { ...data };
      delete uploadingdata.image;
  
      const dbpost = await postsdatabaseobj.updatepost(post.$id, {
        ...uploadingdata,
        featuredimage: imageUrl,
      });
  
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await postsimageobj.uploadfile(data.image[0])
        : null;
  
      if (file) {
        const imageUrl = await postsimageobj.filepreview(file.$id); // Get URL
        const uploadingdata = { ...data };
        delete uploadingdata.image;
  
        const dbpost = await postsdatabaseobj.createpost(ID.unique(), {
          ...uploadingdata,
          userid: user.$id,
          featuredimage: imageUrl, // Save URL instead of file ID
        });
  
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };
  
  
  return (
    <div className=" max-w-2xl mx-auto ">
      {/* Title Input */}
      <div className="p-5  rounded-2xl bg-purple-200 mx-10">
        <form onSubmit={handleSubmit(blogSubmit)}>
          <Input
            type="text"
            placeholder="Enter blog title"
            className="w-full p-2 border bg-white rounded mb-4"
            {...register("title", {
              required: "title is required",
            })}
          />

          {/* Image Upload */}
          <Input
            type="file"
            accept="image/*"
            classNameInput="mb-4"
            {...register("image", {
              required: "image is required",
            })}
          />
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <TextEditor
            name="content"
            control={control}
            defaultValue={getValues("content")}
            {...register("content", { required: true })}
          />
          {/* Submit Button */}
          <Button
            type="submit"
            text={post ? "Update" : "Submit"}
            bgColor={post ? "bg-green-500" : undefined}
            className=" mt-3 block mx-auto w-[40%]"
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
