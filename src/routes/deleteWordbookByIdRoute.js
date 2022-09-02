import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const deleteWordbookByIdRoute = {
  path: "/api/wordbook/:wordbook_id/delete",
  method: "delete",
  handler: async (req, res) => {
    const { wordbook_id } = req.params;
    const { authorization } = req.headers;
    const { uid } = req.body;

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });
      const { id, email, isVerified, info } = decoded;
      if (id !== uid) {
        return res
          .status(403)
          .json({ message: "Not allowed to delete that user's data" });
      }

      const db = getDbConnection("wordslet");
      const result = await db
        .collection("wordbooks")
        .deleteOne({ _id: ObjectID(wordbook_id) });

      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        /*{ expiresIn: "5d" },*/
        (err, token) => {
          if (err) {
            res.status(200).json(err);
          }

          res.status(200).json({ token });
        }
      );
    });
  },
};
