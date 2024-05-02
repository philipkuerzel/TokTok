import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Store } from "@/zustand";
import { useStore } from "@/zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewPost = () => {
  const { user } = useStore() as Store;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const fileRef = useRef(null);
  const [file, setFile] = useState();
  let preview_src = "";
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      setFile(URL.createObjectURL(file));
      reader.onloadend = () => {
        if (file) {
          const buffer = reader.result;
          const formData = new FormData();
          formData.append("postimage", new Blob([buffer]));
          form.setValue("postimage", new Blob([buffer]));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const newPostSchema = z.object({
    postimage: z.instanceof(Blob),
    caption: z
      .string()
      .min(5, {
        message: "Caption must be at least 5 characters long",
      })
      .max(1000, {
        message: "Caption cannot exceed 1000 characters",
      }),
  });

  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
  });

  const onSubmit = async (data) => {
    formData.append("caption", data.caption);
    await api.post("/posts", {
      body: formData,
      credentials: "include",
    });
  };

  return (
    <>
      <div className="flex items-center m-3 gap-5 mt-10 pl-5">
        <img src="./img/close.svg" className="" />
        <h2 className="text-3xl font-semibold">New Post</h2>
      </div>
      <Card className="border-none flex items-center align-center justify-center mt-5">
        {file ? (
          <img
            src={file}
            className="flex items-center justify-center w-96 h-96 bg-black-200 rounded-xl mt-5"
          />
        ) : (
          <div className="flex items-center justify-center w-96 h-96 bg-black-200 rounded-xl mt-5">
            {file ? (
              <Button
                className="bg-primary-500 w-72 rounded-ful"
                onClick={handleClick}
              >
                <img src="./img/camera.svg" alt="" />
              </Button>
            ) : (
              <Button
                className="bg-primary-500 w-72 rounded-full"
                onClick={handleClick}
              >
                <img src="./img/camera.svg" alt="" />
              </Button>
            )}
          </div>
        )}
        <Form
          className="flex flex-col gap-5 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            className="hidden"
          />
        </Form>
      </Card>
    </>
  );
};

export default NewPost;
