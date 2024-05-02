import { followUser, unfollowUser } from "@/lib/api";
import { useStore, Store, AllUsers } from "@/zustand";
import { useEffect, useState } from "react";

const SearchFunc = () => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<AllUsers[]>([]);

  const { users, user } = useStore() as Store;

  const filterUsers = () => {
    if (!searchItem.trim()) {
      const excludeOwnId = users!.filter(
        (ownUser) => ownUser._id !== user!._id
      );
      setFilteredUsers(excludeOwnId);
    } else {
      const filtered = users!.filter((userList) =>
        userList.username.toLowerCase().includes(searchItem.toLowerCase())
      );
      const excludeOwnId = filtered!.filter(
        (ownUser) => ownUser._id !== user!._id
      );

      setFilteredUsers(excludeOwnId);
    }
  };

  const handleSearchInput = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    filterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItem, users]);

  const handleFollow = async (userId, isFollowing) => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      filterUsers();
    } catch (error) {
      console.error("Fehler beim Folgen/Entfolgen des Benutzers:", error);
    }
  };

  return (
    <>
      <div className="w-[428px] h-[882px] p-6 flex-col justify-start items-center gap-7 inline-flex">
        <div className="self-stretch h-[792px] flex-col justify-start items-start gap-6 flex">
          <div className="w-[380px] h-[60px] px-5 bg-neutral-50 rounded-xl justify-start items-center gap-3 inline-flex">
            <input
              className="w-[380px] h-[60px] px-5 bg-black-50 rounded-xl justify-start items-center gap-3 inline-flex outline-none"
              type="text"
              value={searchItem}
              onChange={handleSearchInput}
              name="username"
              placeholder="search..."
            />
          </div>
          <div className="self-stretch justify-start items-start inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-3 inline-flex">
              <div className="self-stretch justify-center items-center gap-2 inline-flex">
                <div className="w-6 h-6 px-1 py-0.5 justify-center items-center flex">
                  <img className="w-4 h-5" src="../img/Group.jpg" />
                </div>
              </div>
              <div className="self-stretch h-1 bg-primary-500 rounded-[100px]"></div>
            </div>
          </div>
          {filteredUsers.map((filteredUser) => {
            const isFollowing = filteredUser?.followers.includes(user!._id);
            return (
              <div
                key={filteredUser._id}
                className="w-[380px] justify-start items-center gap-3 inline-flex"
              >
                <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-5 flex">
                  <div className="w-[60px] h-[60px] justify-center items-center flex">
                    <img
                      className="w-[60px] h-[60px] rounded-full"
                      src={filteredUser?.profilePictureUrl}
                    />
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                    <div className="self-stretch text-neutral-800 text-lg font-bold font-['Urbanist'] leading-snug">
                      {filteredUser?.username}
                    </div>
                    <div className="self-stretch text-zinc-600 text-sm font-medium font-['Urbanist'] leading-tight tracking-tight">
                      {filteredUser?.job}
                    </div>
                  </div>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-[100px] justify-center items-center gap-1 flex ${
                    isFollowing
                      ? "bg-white text-primary-500 border-2 border-primary-500"
                      : "bg-primary-500 text-primary-50"
                  }`}
                >
                  <button
                    onClick={() => handleFollow(filteredUser._id, isFollowing)}
                    className={`text-center text-sm font-medium font-['Urbanist'] leading-tight tracking-tight `}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchFunc;
