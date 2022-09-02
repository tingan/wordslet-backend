import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { logInRoute } from "./logInRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { signUpRoute } from "./signUpRoute";
import { testRoute } from "./testRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { createWordbookRoute } from "./createWordbookRoute";
import { getMyWordbooksRoute } from "./getMyWordbooksRoute";
import { getWordbookByIdRoute } from "./getWordbookByIdRoute";
import { updateWordbookByIdRoute } from "./updateWordbookByIdRoute";
import { deleteWordbookByIdRoute } from "./deleteWordbookByIdRoute";
import { allWordbooksRoute } from "./allWordbooksRoute";

export const routes = [
  forgotPasswordRoute,
  logInRoute,
  resetPasswordRoute,
  signUpRoute,
  testRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  createWordbookRoute,
  getMyWordbooksRoute,
  getWordbookByIdRoute,
  updateWordbookByIdRoute,
  deleteWordbookByIdRoute,
  allWordbooksRoute,
];
