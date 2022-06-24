import cookies from "js-cookie";
import ApiService from "./api.service";

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

class AuthService extends ApiService {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const { data } = await this.post("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    
    this.setAccessToken({ accessToken: data.access, config: { expires: 1 } });
    this.setRefreshToken({
      refreshToken: data.refresh,
      config: { expires: 7 },
    });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) {
    const { data } = await this.post("/auth/signup", {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });

    this.setAccessToken({ accessToken: data.access, config: { expires: 1 } });
    this.setRefreshToken({
      refreshToken: data.refresh,
      config: { expires: 7 },
    });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const { data } = await this.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/login",
      { email, password }
    );
    
    this.setAccessToken({ accessToken: data.access, config: { expires: 1 }});
    this.setRefreshToken({ refreshToken: data.refresh, config: { expires: 7 }});
  }

  setAccessToken({
    accessToken,
    config,
  }: {
    accessToken: string;
    config: { [key: string]: any };
  }) {
    cookies.set("accessToken", accessToken, config);
  }

  setRefreshToken({
    refreshToken,
    config,
  }: {
    refreshToken: string;
    config: { [key: string]: any };
  }) {
    cookies.set("refreshToken", refreshToken, config);
  }
}

export default new AuthService();
