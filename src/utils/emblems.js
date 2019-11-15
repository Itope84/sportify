const emblems = {};

const files = require.context("../assets/emblems", true, /\.png$/i);

files.keys().forEach(key => {
  emblems[
    key
      .split("/")
      .pop()
      .split(".")[0]
  ] = files(key);
});
export default emblems;
