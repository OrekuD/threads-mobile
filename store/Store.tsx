import { Thread, User } from "@/types";
import uuid from "react-native-uuid";
import { faker } from "@faker-js/faker";
import randomNumber from "@/util/randomNumber";
import getBoolean from "@/util/getBoolean";

class Store {
  createUser(isDefaultUser?: boolean): User {
    const name = faker.person.fullName({
      sex: faker.datatype.boolean() ? "male" : "female",
    });
    return {
      id: uuid.v4().toString(),
      name: name,
      username: name
        .trim()
        .replaceAll(" ", "")
        .replaceAll("-", "_")
        .toLowerCase(),
      isVerified: faker.datatype.boolean(),
      avatar: faker.datatype.boolean() ? faker.internet.avatar() : "",
      bio: isDefaultUser
        ? ""
        : faker.datatype.boolean()
        ? faker.person.jobTitle()
        : "",
      link: isDefaultUser
        ? ""
        : faker.datatype.boolean()
        ? faker.person.jobDescriptor()
        : "",
      followersCount: randomNumber(10000),
      followingCount: randomNumber(10000),
    };
  }

  createThread(user?: User | null): Thread {
    return {
      id: uuid.v4().toString(),
      creator: user || this.createUser(),
      likesCount: randomNumber(1000),
      repliesCount: randomNumber(15),
      media: Array(randomNumber(4))
        .fill(null)
        .map((_, index) => `https://picsum.photos/250/250?random=${index}`),
      text: faker.lorem.lines(),
      parentThread: getBoolean(0.1) ? this.createThread() : null,
    };
  }
}

export default new Store();
