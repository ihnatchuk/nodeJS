import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./config/configs";
import { User } from "./models/user.model";
import { IUser } from "./types/user.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  const users: IUser[] = await User.find();
  res.json(users);
});
app.get("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  // const user: IUser = await User.findOne({ _id: userId });
  const user: IUser = await User.findById(userId);
  res.json(user);
});

app.post("/users", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    await User.create({ ...body });
    res.status(201).json({
      message: "User created!",
    });
  } catch (e) {
    // throw new Error(e.message);
    res.status(400).send(e.message);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.deleteOne({ _id: userId });
  res.sendStatus(204);
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const body = req.body;
  await User.updateOne({ _id: userId }, body);
  res.status(201).json({
    message: "UserModel updated!",
  });
});
//
// app.put("/users/:userId", async (req: Request, res: Response) => {
//   const body = req.body;
//   const { userId } = req.params;
//
//   const nameRes = nameIsValid(body.name);
//   const ageRes = ageIsValid(body.age);
//   const genderRes = genderIsValid(body.gender);
//
//   const users = await reader();
//   const index = users.findIndex((user) => user.id === +userId);
//   if (index === -1) {
//     res.send("UserId not found");
//     return;
//   }
//
//   if (ageRes.isValid && nameRes.isValid && genderRes.isValid) {
//     users[index] = { ...users[index], ...body };
//
//     await writer(users);
//
//     res.status(201).json({
//       message: "UserModel updated!",
//     });
//     return;
//   }
//
//   res.status(400).json({
//     message: [nameRes.reqMessage, ageRes.reqMessage, genderRes.reqMessage].join(
//       " "
//     ),
//   });
// });
//
// app.patch("/users/:userId", async (req: Request, res: Response) => {
//   const body = req.body;
//   const { userId } = req.params;
//   let isUpdated = false;
//
//   const users = await reader();
//
//   const index = users.findIndex((user) => user.id === +userId);
//   if (index === -1) {
//     res.send("UserId not found");
//     return;
//   }
//
//   for (const bodyKey in body) {
//     switch (bodyKey) {
//       case "name":
//         users[index] = nameIsValid(bodyKey).isValid
//           ? {
//               ...users[index],
//               bodyKey: body[bodyKey],
//             }
//           : { ...users[index] };
//         isUpdated = true;
//         break;
//       case "age":
//         users[index] = ageIsValid(bodyKey).isValid
//           ? {
//               ...users[index],
//               bodyKey: body[bodyKey],
//             }
//           : { ...users[index] };
//         isUpdated = true;
//         break;
//       case "gender":
//         users[index] = genderIsValid(bodyKey).isValid
//           ? {
//               ...users[index],
//               bodyKey: body[bodyKey],
//             }
//           : { ...users[index] };
//         isUpdated = true;
//         break;
//       default:
//     }
//   }
//   if (isUpdated) {
//     await writer(users);
//
//     res.status(201).json({
//       message: "UserModel updated!",
//     });
//     return;
//   }

//   res.status(400).json({
//     message: "Not Updated",
//     // message: [nameRes.reqMassage,
//     //     ageRes.reqMassage,
//     //     genderRes.reqMassage].join(' ')
//   });
// });

app.listen(configs.PORT, async () => {
  console.log(configs.MONGO_URL);
  await mongoose.connect(configs.MONGO_URL);
  console.log(`Server listen ${configs.PORT}`);
});
