import fs from "fs";

const jsonString = fs.readFileSync(
  "playwright-pruebas/datos/data_member.json",
  "utf8"
);
const data = JSON.parse(jsonString);

console.log(data);
