import crypto from "crypto";
import fs from "fs";
import "dotenv/config";
import { useAgent } from "./assistant";
import { decryptData, encryptData } from "./utils";

// UNCOMMENT TO ENCRYPT GET THE GEMINI KEY
const encryptedData = fs.readFileSync("gemini.txt", "utf8");
const decryptedData = decryptData(encryptedData);
fs.writeFileSync("gemini_key.json", JSON.parse(decryptedData));

process.env.GOOGLE_APPLICATION_CREDENTIALS = "gemini_key.json";
useAgent("What is the weather in Tokyo ?");
