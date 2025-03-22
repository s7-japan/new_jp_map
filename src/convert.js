import XLSX from "xlsx";
import fs from "fs";

// Replace with your Excel file path
const excelFilePath = "../public/assets/data.xlsx"; // e.g., "data.xlsx"
const outputJsonPath = "./assets/data.json";

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);
const sheetName = workbook.SheetNames[2]; // First sheet
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const jsonData = XLSX.utils.sheet_to_json(sheet);

// Save to a JSON file
fs.writeFileSync(outputJsonPath, JSON.stringify(jsonData, null, 2), "utf-8");

console.log("Conversion complete! Check output.json");
