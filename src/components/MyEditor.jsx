import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { axiosApiInstance } from "../services/auth/authService";
import BASE_URL from "../utils/Url";
import { axiosApiInstanceForFile } from "../services/event/EventService";


export default function MyEditor({ handleChange, ...props }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("PlanFile", file);
            body.append("FileName", null);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${BASE_URL.uploadImage}`, {
              method: "post",
              body: body,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                // "Content-Type" : `multipart/form-data`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${BASE_URL.images}/${res.data.filename}`,
                  Authorization :  `Bearer ${localStorage.getItem("token")}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div className="App">
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin]
        }}
        editor={ClassicEditor}
        onReady={(editor) => {}}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
        onChange={(event, editor) => {
          handleChange(editor.getData());
        }}
        {...props}
      />
    </div>
  );
}
