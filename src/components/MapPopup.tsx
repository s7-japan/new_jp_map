import React from "react";
import { Popup } from "react-leaflet";

interface MapItem {
  "Icon Category": string;
  "Article Format": string;
  "Zoom Level": "Low" | "Medium" | "High";
  Title: string;
  "Sub Title": string;
  "Article Content": string;
  "Line Button Text (If Area Introduction format)": string;
  "Line Button URL": string;
  "Top Image": string;
  Locations: string;
  "Is Location Check Done?": string;
  Remarks: string;
}

interface MapPopupProps {
  item: MapItem;
}

const parseContentText = (text: string) => {
  if (!text) return null;
  const sections: { header: string; items: string[] }[] = [];
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  let currentSection: { header: string; items: string[] } | null = null;
  lines.forEach((line) => {
    if (line.startsWith("【") && line.endsWith("】")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { header: line.slice(1, -1), items: [] };
    } else if (currentSection) {
      currentSection.items.push(line);
    } else {
      if (!currentSection) currentSection = { header: "", items: [] };
      currentSection.items.push(line);
    }
  });
  if (currentSection) sections.push(currentSection);
  return sections.length > 0 ? sections : null;
};

export const MapPopup: React.FC<MapPopupProps> = ({ item }) => {
  const contentSections = parseContentText(item["Article Content"]);

  return (
    <Popup>
      <div>
        <h3>{item.Title}</h3>
        <p>
          <strong>Category:</strong> {item["Icon Category"]}
        </p>
        <p>
          <strong>Sub Title:</strong> {item["Sub Title"]}
        </p>
        <p>
          <strong>Zoom Level:</strong> {item["Zoom Level"]}
        </p>
        {contentSections && contentSections.length > 0 && (
          <div className="content-sections">
            {contentSections.map((section, idx) => (
              <div key={idx} className="content-section">
                {section.header && <h4>[{section.header}]</h4>}
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Popup>
  );
};
