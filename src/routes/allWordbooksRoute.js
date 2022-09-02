import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const allWordbooksRoute = {
  path: "/api/wordbooks",
  method: "get",
  handler: async (req, res) => {
    const perPage = parseInt(req.query.perPage);
    const search = req.query.search;
    const currentPage = parseInt(req.query.currentPage);
    const db = getDbConnection("wordslet");

    if (search == "") {
      const docs = await db
        .collection("wordbooks")
        .find({
          $where: "this.words.length > 0",
        })
        .sort({ _id: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .toArray();
      res.status(200).json({ count: docs.length, docs: docs });
    } else {
      const docs = await db
        .collection("wordbooks")
        .find({
          title: { $regex: search },
        })
        .sort({ _id: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .toArray();
      res.status(200).json({ count: docs.length, docs: docs });
    }
  },
};
