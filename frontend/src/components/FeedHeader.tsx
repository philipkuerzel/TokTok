import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const FeedHeader = ({ profile }) => {
  if (!profile) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }
  return (
    <>
      <div className="flex m-4 justify-between">
        <div className="flex m-1">
          <Avatar className=" m-1">
            <AvatarImage src={profile.profilePictureUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h5>{profile.username}</h5>
            <p className="text-black-400">{profile.job}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src="./img/more.svg" alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FeedHeader;
