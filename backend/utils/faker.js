import { faker } from "@faker-js/faker";
import { User } from "../user/user.model.js";
import { Post } from "../post/post.model.js";
import { Comment } from "../comment/comment.model.js";

const createFakeUsers = async (num) => {
  for (let i = 0; i < num; i++) {
    const user = new User({
      username: faker.internet.userName(),
      passwordHash: faker.internet.password(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      gender: "male",
      followers: [],
      following: [],
      bio: faker.lorem.sentence(),
      userGroup: "user",
      emailVerified: false,
      job: faker.person.jobTitle(),
      website: faker.internet.url(),
      phone: faker.phone.phoneNumber,
    });
    await user.save();
  }
};

const createFakePosts = async (num) => {
  for (let i = 0; i < num; i++) {
    const post = new Post({
      caption: faker.lorem.sentence(),
      imageUrl: faker.image.url(),
      username: faker.internet.userName(),
      likes: [],
      comments: [],
    });
    await post.save();
  }
};

const createFakeComments = async (num) => {
  for (let i = 0; i < num; i++) {
    const comment = new Comment({
      content: faker.lorem.sentence(),
      username: faker.internet.userName(),
    });
    await comment.save();
  }
};

const createFakeData = async (num) => {
  await createFakeUsers(num);
  // await createFakePosts(num);
  // await createFakeComments(num);
};
createFakeData(1);
export default createFakeData;
