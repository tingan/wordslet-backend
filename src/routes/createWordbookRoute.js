import jwt from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const createWordbookRoute = {
  path: "/api/wordbook/new",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
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
      /*    
      if (!isVerified)
        return res.status(403).json({
          message:
            "You need to verify your email before you can update your data",
        });
        */
      const db = getDbConnection("wordslet");
      const result = await db.collection("wordbooks").insertOne(updates);
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
