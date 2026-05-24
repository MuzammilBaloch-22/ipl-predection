const fs = require("fs");
const { SourceMapConsumer } = require("source-map");
const raw = fs.readFileSync("dist/client/assets/index-DuwhFiw5.js.map", "utf8");
SourceMapConsumer.with(JSON.parse(raw), null, consumer => {
  console.log(consumer.originalPositionFor({ line: 9, column: 41327 }));
});
