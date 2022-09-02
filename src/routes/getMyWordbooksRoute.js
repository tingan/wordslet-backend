import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const getMyWordbooksRoute = {
  path: "/api/wordbook/my/:userId",
  method: "get",
  handler: async (req, res) => {
    const { userId } = req.params;
    const search = req.query.search;
    const perPage = parseInt(req.query.perPage);
    const currentPage = parseInt(req.query.currentPage);
    const db = getDbConnection("wordslet");

    if (search == "") {
      const docs = await db
        .collection("wordbooks")
        .find({
          uid: ObjectID(userId),
        })
        .sort({
          title: 1,
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .toArray();

      res.status(200).json({ count: docs.length, docs: docs });
    } else {
      const docs = await db
        .collection("wordbooks")
        .find({
          uid: ObjectID(userId),
          title: { $regex: search },
        })
        .sort({
          title: 1,
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .toArray();

      res.status(200).json({ count: docs.length, docs: docs });
    }
  },
};
