import ReactQuill, { Quill } from "react-quill";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { updateContent, updateNote } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import SavingIndicator from "EditorView/SavingIndicator";
import hljs from "highlight.js";
import "./dracula.css";
import QuillImageDropAndPaste, { ImageData } from "quill-image-drop-and-paste";
import { uploadImage } from "slices/imagesSlice";

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

hljs.configure({
  languages: [
    "javascript",
    "ruby",
    "python",
    "rust",
    "css",
    "pgsql",
    "txt",
    "sql",
    "yaml",
  ],
});

const Editor = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.notes.content);
  const uploadingImages = useSelector((state) => state.images.uploadingImages);
  const selectedNoteId = useSelector((state) => state.notes.selectedNoteId);
  const quillRef = useRef(null);

  const selectedNoteRef = useRef(null);
  selectedNoteRef.current = { selectedNoteId, content };

  useEffect(() => {
    const autoSave = () => {
      const selectedNoteId = selectedNoteRef.current.selectedNoteId;
      const content = selectedNoteRef.current.content;

      if (selectedNoteId) {
        dispatch(updateNote({ noteId: selectedNoteId, content }));
      }
    };
    setInterval(autoSave, process.env.AUTOSAVE_INTERVAL || 10000);
  }, []);

  const imageUploader = (dataUrl, type, imageData) => {
    const file = imageData.toFile();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("note_id", selectedNoteId);

    dispatch(uploadImage(formData))
      .unwrap()
      .then((response) => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        const index = range.index + range.length;
        editor.insertEmbed(index, "image", response.url);
        editor.setSelection(index + 1);
      });
  };

  const clickImageUpload = (clicked) => {
    if (clicked) {
      let fileInput = document.querySelector("input.ql-image[type=file]");
      if (fileInput == null) {
        fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute(
          "accept",
          "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
        );
        fileInput.classList.add("ql-image");
        fileInput.addEventListener("change", function (e) {
          const files = e.target.files;
          let file;
          if (files.length > 0) {
            file = files[0];
            const type = file.type;
            const reader = new FileReader();
            reader.onload = (e) => {
              // handle the inserted image
              const dataUrl = e.target.result;
              imageUploader(
                dataUrl,
                type,
                new ImageData(dataUrl, type, file.name)
              );
              fileInput.value = "";
            };
            reader.readAsDataURL(file);
          }
        });
      }
      fileInput.click();
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        // TODO: implement image upload
        handlers: { image: clickImageUpload },
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["link", "image"],
          ["clean"],
          ["code-block"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      imageDropAndPaste: {
        handler: imageUploader,
      },
    }),
    [selectedNoteId]
  );

  return (
    <Content
      style={{
        margin: "24px 16px",
        marginTop: 4,
        padding: "0px",
        overflowY: "scroll",
      }}
      className="editor-container" // prevents scrolling jump issue for quill.js
    >
      <div style={{ backgroundColor: "#252525", color: "white", border: 0 }}>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          key={selectedNoteId}
          value={content}
          onChange={(content, delta, source, editor) => {
            dispatch(updateContent(content));
          }}
          scrollingContainer=".editor-container"
          placeholder="Begin something amazing here..."
          readOnly={uploadingImages}
        />
      </div>
      <SavingIndicator
        shouldShow={uploadingImages}
        styles={{ marginTop: 13 }}
      />
    </Content>
  );
};

export default Editor;
