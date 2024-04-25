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
    });
    await user.save();
  }
};

const createFakePosts = async (num) => {
  for (let i = 0; i < num; i++) {
    const post = new Post({
      caption: faker.lorem.sentence(),
      imageUrl: faker.image.imageUrl(),
      username: faker.internet.userName(),
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
  await createFakePosts(num);
  await createFakeComments(num);
};

export default createFakeData;
