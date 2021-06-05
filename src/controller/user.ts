import { Request, Response } from "express";
import Users from "../model/Users";
import {
  createSalt,
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  createhashedPassword,
  isAuthorized,
} from "./auth";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const socialLogin = async (req: Request, res: Response) => {
  try {
    const { token, type } = req.body;
    let payload: any;
    // 소셜 로그인 분기. 입력받은 타입에 따라 payload를 다르게 뱉도록 함
    switch (type) {
      case 0:
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
        break;
      default:
        payload = false;
        break;
    }

    if (payload) {
      const userData = await Users.findOne({
        where: {
          email: payload.email,
        },
      });
      //로그인 분기. userData 여부에 따라 회원가입, 로그인 로직으로 이동
      if (userData) {
        const accessToken = generateAccessToken({
          id: userData.id,
          email: userData.email,
        });
        const refreshToken = generateRefreshToken({
          id: userData.id,
          email: userData.email,
        });
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, 200, accessToken, userData.id);
      } else {
        const salt = createSalt();
        const newUser = await Users.create({
          salt,
          email: payload.email,
          name: payload.name,
          password: createhashedPassword(payload.sub, salt),
          img: payload.picture,
          address: "null",
        });
        const accessToken = generateAccessToken({
          id: newUser.id,
          email: newUser.email,
        });
        const refreshToken = generateRefreshToken({
          id: newUser.id,
          email: newUser.email,
        });
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, 200, accessToken, newUser.id);
      }
    } else {
      res.status(403).send({ message: "AccessToken is unreliable" });
    }
  } catch (e) {
    res.status(403).send({ message: "Fail login", err: e });
  }
};

export const userinfo = async (req: Request, res: Response) => {
  try {
    const userData = await Users.findOne({
      where: {
        id: req.url.split("/info/")[1],
      },
    });
    if (userData) {
      const { id, name, email, img, address } = userData;
      res.status(200).send({
        data: {
          id,
          name,
          email,
          img,
          address,
        },
        message: "ok",
      });
    } else {
      res.status(403).send("Invalid user id");
    }
  } catch (e) {
    res.status(403).send("Invalid user id");
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(403).send("Invalid user email or password");
    }
    const userData = await Users.findOne({
      where: {
        email,
      },
    });
    if (userData) {
      const hashedPsw = createhashedPassword(password, userData.salt);
      if (hashedPsw !== userData.password) {
        res.status(403).send("Invalid user password");
      } else {
        const accessToken = generateAccessToken({
          id: userData.id,
          email: userData.email,
        });
        const refreshToken = generateRefreshToken({
          id: userData.id,
          email: userData.email,
        });
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, 200, accessToken, userData.id);
      }
    } else {
      res.status(403).send("Invalid user email");
    }
  } catch (e) {
    res.status(403).send("Invalid user email or password");
  }
};

export const signout = (req: Request, res: Response) => {
  try {
    if (!isAuthorized(req)) {
      res.status(403).send("Invalid access Token");
    } else {
      res.status(200).send("Success logout");
    }
  } catch (e) {
    res.status(403).send("Fail logout");
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;
    if (!email || !password || !name) {
      res.status(422).send("insufficient parameters supplied");
    }
    const isUser = await Users.findOne({
      where: { email },
    });

    if (isUser) {
      res.status(409).send("email exists");
    } else {
      const salt = createSalt();
      const newUser = await Users.create({
        salt,
        email,
        name,
        password: createhashedPassword(password, salt),
        img: `${process.env.URL}/uploads/profile.png`,
        address: "null",
      });
      res.status(201).send({ data: { id: newUser.id }, massege: "ok" });
    }
  } catch (err) {
    res.status(422).send("insufficient parameters supplied");
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const tokenData: any = isAuthorized(req);
    if (!tokenData) {
      res.status(403).send("Invalid access Token");
    } else {
      if (req.body.name) {
        await Users.update(
          { name: req.body.name },
          {
            where: {
              id: tokenData.id,
            },
          }
        );
      }
      if (req.body.address) {
        await Users.update(
          {
            address: req.body.address,
          },
          {
            where: {
              id: tokenData.id,
            },
          }
        );
      }
      res.status(200).send({
        data: {
          name: req.body.name,
          address: req.body.address,
        },
        messeage: "uploadData",
      });
    }
  } catch (e) {
    res.status(403).send("Invalid access Token");
  }
};

export const editimg = async (req: Request, res: Response) => {
  try {
    const tokenData: any = isAuthorized(req);
    if (!tokenData) {
      res.status(403).send("Invalid access Token");
    } else {
      if (req.file.path) {
        const filePath: string = req.file.path.split("public")[1];
        await Users.update(
          {
            img: process.env.URL + filePath,
          },
          {
            where: {
              id: tokenData.id,
            },
          }
        );
        res.status(200).send({
          data: {
            path: process.env.URL + filePath,
          },
          messeage: "Success change profile",
        });
      } else {
        res.status(403).send("no frofile");
      }
    }
  } catch (e) {
    res.status(403).send("no frofile");
  }
};

export const editpassword = async (req: Request, res: Response) => {
  try {
    const { password, afterpassword } = req.body;
    const tokenData: any = isAuthorized(req);
    if (!tokenData) {
      res.status(403).send("Invalid access Token");
    } else {
      const userData = await Users.findOne({
        where: {
          id: tokenData.id,
        },
      });
      if (userData) {
        const hashedPsw = createhashedPassword(password, userData.salt);
        if (hashedPsw !== userData.password) {
          res.status(403).send("Invalid user password");
        } else {
          const salt = createSalt();
          await Users.update(
            {
              password: createhashedPassword(afterpassword, salt),
              salt: salt,
            },
            {
              where: {
                id: tokenData.id,
              },
            }
          );
          res.status(200).send({
            message: "uploadData",
          });
        }
      }
    }
  } catch (e) {
    res.status(403).send("Fail edit password");
  }
};

export const userdelete = async (req: Request, res: Response) => {
  try {
    const tokenData: any = isAuthorized(req);
    if (!tokenData) {
      res.status(403).send("Invalid access Token");
    } else {
      await Users.destroy({
        where: {
          id: tokenData.id,
        },
      });
      res.status(200).send("Delete userinfo");
    }
  } catch (e) {
    res.status(403).send("Fail Delete userinfo");
  }
};
