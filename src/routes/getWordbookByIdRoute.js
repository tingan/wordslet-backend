import { ObjectID } from "mongodb";
import { getDbConnection } from "../db";

export const getWordbookByIdRoute = {
  path: "/api/wordbook/:wordbook_id",
  method: "get",
  handler: async (req, res) => {
    const { wordbook_id } = req.params;
    const db = getDbConnection("wordslet");

    const docs = await db
      .collection("wordbooks")
      .find({
        _id: ObjectID(wordbook_id),
      })
      .limit(1)
      .toArray();

    res.status(200).json({ docs });
  },
};
