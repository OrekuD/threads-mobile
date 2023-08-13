import { Thread, User } from "@/types";
import uuid from "react-native-uuid";
import { faker } from "@faker-js/faker";
import randomNumber from "@/util/randomNumber";

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
      followersCount: randomNumber(1000),
      followingCount: randomNumber(1000),
    };
  }

  createThread(): Thread {
    return {
      id: uuid.v4().toString(),
      creator: this.createUser(),
      likesCount: randomNumber(1000),
      repliesCount: randomNumber(15),
      images: Array(randomNumber(4))
        .fill(null)
        .map((_, index) => `https://picsum.photos/200/200?random=${index}`),
      text: faker.lorem.lines(),
    };
  }
}

export default new Store();
