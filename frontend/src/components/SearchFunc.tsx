import { useStore, Store, AllUsers  } from "@/zustand";
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
          {filteredUsers.map((user) => {
            return (
              <div
                key={user._id}
                className="w-[380px] justify-start items-center gap-3 inline-flex"
              >
                <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-5 flex">
                  <div className="w-[60px] h-[60px] justify-center items-center flex">
                    <img
                      className="w-[60px] h-[60px] rounded-full"
                      src={user?.profilePictureUrl}
                    />
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                    <div className="self-stretch text-neutral-800 text-lg font-bold font-['Urbanist'] leading-snug">
                      {user?.username}
                    </div>
                    <div className="self-stretch text-zinc-600 text-sm font-medium font-['Urbanist'] leading-tight tracking-tight">
                      {user?.job}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-primary-500 rounded-[100px] justify-center items-center gap-1 flex">
                  <button className="text-center text-primary-50 text-sm font-semibold font-['Urbanist'] leading-tight tracking-tight">
                    {user.followers!.includes(user!._id)
                      ? "Unfollow"
                      : "Follow"}
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
