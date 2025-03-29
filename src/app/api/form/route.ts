/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
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
    const filePath = path.join(process.cwd(), "public", "data.json");

    // Delete existing file if it exists
    try {
      await unlink(filePath);
    } catch (error) {
      console.log("File does not exist or could not be deleted:", error);
    }

    jsonData = jsonData.map((row: any) => ({
      Type: row["Type"] || "",
      "start time": row["start time"],
      "end time": row["end time"],
      event: row["event"] || "",
      Date: row["Date"],
      "Event No": row["Event No"] || "",
      event_id: row["event_id"] || "",
      gradient: row["gradient"] || "",
    }));

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
