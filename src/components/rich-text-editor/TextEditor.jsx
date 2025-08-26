import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../../conf/conf";
function TextEditor({ name, control, defaultValue }) {

  return (
    <Controller
    
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
        <Editor
        
          apiKey='pvho87fppfjr7b56ihkt0tsjexs45cquwduv8jou3pvqsbww'
          initialValue={defaultValue}
          init={{
            initialValue: defaultValue,
            height: 300,
            menubar: true,
            plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor",
            ],
            toolbar:
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={onChange}
        />
      )}
    />
  );
}
export default TextEditor;
