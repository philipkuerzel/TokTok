import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Store } from "@/zustand";
import { useStore } from "@/zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectSeparator } from "@/components/ui/select";
import ky from "ky";
import Autocomplete from "react-google-autocomplete";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";

const NewPost = () => {
  const { user } = useStore() as Store;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const formData = new FormData();
  const fileRef = useRef(null);
  const [file, setFile] = useState<string | undefined>();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    city: string;
  }>({
    latitude: 0,
    longitude: 0,
    city: "",
  });
  const [caption, setCaption] = useState("");
  type DataType = {
    results: { formatted_address: string }[];
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      fileRef.current = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) {
          const buffer = reader.result;
          form.setValue("imageUrl", new Blob([buffer]));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const newPostSchema = z.object({
    imageUrl: z.instanceof(Blob),
    caption: z
      .string()
      .min(5, {
        message: "Caption must be at least 5 characters long",
      })
      .max(1000, {
        message: "Caption cannot exceed 1000 characters",
      }),
    facebook: z.boolean().optional(),
    twitter: z.boolean().optional(),
    tumblr: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
  });

  const onSubmit = async () => {
    {
      fileRef.current ? formData.append("imageUrl", fileRef.current) : null;
    }
    formData.append("caption", caption);
    formData.append("city", location.city);
    try {
      if (user)
      await api.post(`posts/${user._id}`, {
        body: formData,
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: "",
        });
        const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          position.coords.latitude
        },${position.coords.longitude}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`;
        ky.get(googleApi)
          .then((response) => response.json())
          .then((data) => {
            const resultData = data as DataType;
            setLocation({
              city: resultData.results[0].formatted_address,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          })
          .catch((error) => console.log(error));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {!file && user ? (
        <>
          <div className="flex items-center m-3 gap-5 mt-10 pl-5">
            <img src="./img/close.svg" className="" />
            <h2 className="text-3xl font-semibold">New Post</h2>
          </div>
          <Card className="border-none flex items-center align-center justify-center mt-5">
            {file && user ? (
              <img
                src={file}
                className="flex items-center justify-center w-96 h-96 bg-black-200 rounded-xl mt-5"
              />
            ) : (
              <div className="flex items-center justify-center w-96 h-96 bg-black-200 rounded-xl mt-5">
                {file && user ? null : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                          <FormItem>
                            <Button
                              className="bg-primary-500 w-72 rounded-full"
                              onClick={handleClick}
                            >
                              <img src="./img/camera.svg" alt="" />
                            </Button>
                            <FormControl>
                              <Input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                {...fileRef}
                                className="hidden"
                                accept="image/*"
                              />
                            </FormControl>
                          </FormItem>
                          
                        )}
                      />
                    </form>
                  </Form>
                )}
              </div>
            )}
          </Card>
        </>
      ) : (
        <>
          <div className="flex items-center m-3 gap-5 mt-10 pl-5">
            <img
              src="./img/back.svg"
              className=""
              onClick={() => {
                setFile(undefined);
              }}
            />
            <h2 className="text-3xl font-semibold">New Post</h2>
          </div>
          <div className="flex gap-5 align-middle items-center justify-center">
          {user ? (
            <Avatar className="w-20 h-20 border">
              <AvatarImage
                src={user.profilePictureUrl}
                className="w-full h-full object-cover"
              />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          ) : null}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
                <textarea
                  name="caption"
                  placeholder="Write a caption..."
                  onChange={(e) => setCaption(e.target.value)}
                  wrap="hard"
                  className="w-full h-24 bg-black-50 rounded-xl border-none text-center"
                />
              </form>
            </Form>
            <img src={file} className="w-20 h-20 bg-black-200 rounded-xl" />
          </div>
          <SelectSeparator className="my-10" />
          <div className="flex items-center justify-center gap-2">
            <Form {...form}>
              <img
                src="./img/location.svg"
                onClick={handleLocation}
                className="ml-5"
              />
              <Autocomplete
                className="w-full mx-5 h-12 bg-black-50 rounded-xl border-none pl-5"
                apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                options={{
                  types: ["geocode", "establishment"],
                }}
                onPlaceSelected={(place) => {
                  setLocation({
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                    city: place.formatted_address,
                  });
                }}
                types={["(regions)"]}
                placeholder="Add location"
                value={location.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value) {
                    setLocation({ ...location, city: e.target.value });
                  }
                }}
              />
            </Form>
          </div>
          <SelectSeparator className="my-10" />
          <div className="flex items-center m-3 gap-5 mt-10 pl-5">
            <p className="text-lg">Also post to</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Form {...form}>
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg w-full m-3 px-5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Facebook</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg w-full m-3 gap-5 px-5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Twitter</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tumblr"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg w-full m-3 gap-5 px-5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Tumblr</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Form>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Button
              className="bg-primary-500 w-72 rounded-full"
              onClick={onSubmit}
            >
              Post
            </Button>
          </div>
          <SelectSeparator className="my-5" />
          <div className="flex items-center gap-">
            <img src="./img/settings.svg" className="px-5" />
            <h2 className="text-lg font-semibold">Advanced Settings</h2>
          </div>
        </>
      )}
    </>
  );
};

export default NewPost;
