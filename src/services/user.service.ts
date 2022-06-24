import cookies from "js-cookie";
import ApiService from "./api.service";

class UserService extends ApiService {
  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await this.get("/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  }

  async read(id: number) {
    const { data } = await this.get(`/users/${id}`);

    return data;
  }
}

export default new UserService();
