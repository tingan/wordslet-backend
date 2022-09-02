import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const updateWordbookByIdRoute = {
  path: "/api/wordbook/:wordbook_id/update",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { wordbook_id } = req.params;
    const updates = (({ title, description, uid, words }) => ({
      title,
      description,
      uid: ObjectID(uid),
      words,
    }))(req.body);

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });
      const { id, email, isVerified, info } = decoded;
      if (id !== updates.uid.toString()) {
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
      }

      const db = getDbConnection("wordslet");
      const result = await db.collection("wordbooks").updateOne(
        { _id: ObjectID(wordbook_id) },
        {
          $set: {
            title: updates.title,
            description: updates.description,
            words: updates.words,
          },
        }
      );

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
