const fooditemmodel = require("../model/fooditemmodel");

async function foodpartnerfooditems(req, res) {
  console.log("hey");
  try {
    const { id } = req.params;
    const videos = await fooditemmodel
      .find({ foodpartner: id })
      .populate("foodpartner");
    if (videos.length === 0) {
      console.log("no video");
return res.status(404).json({ message: "no data found", data: [] });    }

    return res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = foodpartnerfooditems;
