"use client";

import { useState, DragEvent } from "react";
import { UploadCloud, File, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [popup, setPopup] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    if (event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return setPopup({
        open: true,
        type: "error",
        message: "Please select a file!",
      });
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setPopup({
          open: true,
          type: "success",
          message: "File uploaded and converted successfully!",
        });
        setFile(null);
      } else {
        setPopup({
          open: true,
          type: "error",
          message: "Error uploading file!",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setPopup({ open: true, type: "error", message: "Something went wrong!" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-gray-200">
        <h1 className="text-2xl font-semibold text-[#E00400] mb-6">
          Upload CSV or Excel File
        </h1>

        <label
          className={`cursor-pointer flex flex-col items-center p-6 border-2 border-dashed 
            rounded-lg transition duration-300 ${
              dragging
                ? "border-[#E00400] bg-red-50"
                : "border-gray-300 hover:border-[#E00400]"
            }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <UploadCloud className="h-12 w-12 text-gray-500" />
          <span className="text-gray-600 mt-2">
            Click to upload or drag & drop
          </span>
          <input
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="mt-4 flex items-center gap-3 bg-gray-100 p-3 rounded-lg border border-gray-300">
            <File className="h-5 w-5 text-gray-700" />
            <span className="text-gray-800 text-sm truncate">{file.name}</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="mt-5 px-5 py-2 bg-[#E00400] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 cursor-pointer"
        >
          Upload File
        </button>
      </div>

      {/* Popup Modal */}
      <Dialog
        open={popup.open}
        onOpenChange={(open) => setPopup({ ...popup, open })}
      >
        <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl p-6 border border-gray-200 transition-transform duration-200 transform scale-95">
          <DialogHeader className="flex flex-col items-center">
            {popup.type === "success" ? (
              <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            ) : (
              <XCircle className="h-12 w-12 text-[#E00400] mb-2" />
            )}
            <DialogTitle
              className={
                popup.type === "success" ? "text-green-600" : "text-[#E00400]"
              }
            >
              {popup.type === "success" ? "Success" : "Error"}
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-center">
              {popup.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-center">
            <Button
              onClick={() => setPopup({ ...popup, open: false })}
              className="bg-[#E00400] text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
