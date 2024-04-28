import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fulldata, UserData, useStore } from "@/zustand";
import { useRef } from "react";
import { useForm } from "react-hook-form";

const EditProfile = () => {
  const { userDataFull } = useStore() as Fulldata & UserData;
  const user = userDataFull[0];
  const form = useForm();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <header className="m-10">
        <div>
          <a href="http://localhost:5173/profile">
            <img src="../img/arrow.svg" />
          </a>
          <p className="text-3xl font-bold">Edit Profile</p>
        </div>
      </header>
      <main className="flex flex-col items-center gap-6 mt-10 font-bold">
        <Form {...form}>
          <FormField
            control={form.control}
            name="profilepicture"
            render={({ field }) => (
              <FormItem>
                <Avatar className="w-40 h-40 border">
                  <AvatarImage src={user.profilePictureUrl} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <img
                  src="../img/profile-edit.svg"
                  className="z-10 absolute top-[16rem] left-[60%] sm:left-[54%] sm:top-[40%]"
                  onClick={handleClick}
                />
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    ref={hiddenFileInput}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={user.username}
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={user.bio}
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue="12/27/1995"
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={user.email}
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue="+1 111 467 378 399"
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue="Male"
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="webste"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue="https://www.google.com"
                    className="min-w-[300px] bg-black-50 border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primary-500 rounded-3xl min-w-[300px] mb-6"
          >
            Submit
          </Button>
        </Form>
      </main>
    </>
  );
};

export default EditProfile;
