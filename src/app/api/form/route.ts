/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import * as XLSX from "xlsx";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    let jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

    jsonData = jsonData.map((row: any) => ({
      Type: row["Type"] || "",
      "start time": formatTime(row["start time"]),
      "end time": formatTime(row["end time"]),
      event: row["event"] || "",
      Date: formatDate(row["Date"]),
    }));

    const filePath = path.join(process.cwd(), "public", "data.json");
    await writeFile(filePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({
      message: "File uploaded successfully!",
      path: "/data.json",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error processing file:", errorMessage);
    return NextResponse.json(
      { error: "Error processing file", details: errorMessage },
      { status: 500 }
    );
  }
}

function formatTime(value: any): string {
  if (!value) return "";

  if (!isNaN(value)) {
    const date = XLSX.SSF.parse_date_code(value);
    return `${padZero(date.H)}:${padZero(date.M)}`;
  }

  return value;
}

function formatDate(value: any): string {
  if (!value) return "";

  if (!isNaN(value)) {
    const date = XLSX.SSF.parse_date_code(value);
    return `${padZero(date.D)}/${padZero(date.M)}/${date.Y}`;
  }

  return value;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
