// File: CoinImageDownloader.jsx
import React, { useState } from "react";
import MetaData from "../../../data/MetaDataof2kCoins.json";

const PROXY_URL = "/download"; // Your local proxy server

const CoinImageDownloader = () => {
  const urlById = Object.fromEntries(
    Object.values(MetaData).map((coin) => [coin.id, coin.url])
  );
  const [remainingCoins, setRemainingCoins] = useState(urlById);
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Function to download a single coin through your proxy
  const downloadSingle = async (coinName, imageUrl) => {
    try {
      // Call YOUR OWN server, which fetches the image and forces a download
      const response = await fetch(
        `${PROXY_URL}?url=${encodeURIComponent(imageUrl)}`
      );
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Now the 'download' attribute will work because the blob is from your proxy!
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${coinName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      // Successfully downloaded, so remove the button
      setRemainingCoins((prev) => {
        const updated = { ...prev };
        delete updated[coinName];
        return updated;
      });
    } catch (error) {
      console.error(`Failed to download ${coinName}:`, error);
      setStatusMessage(
        `Error downloading ${coinName}. Is the proxy server running?`
      );
    }
  };

  // Function to download all coins with a delay to respect rate limits
  const downloadAll = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setStatusMessage("Starting batch download...");

    const coinEntries = Object.entries(remainingCoins);
    const DELAY_BETWEEN_IMAGES = 3000; // 3 seconds to be very safe

    for (const [name, url] of coinEntries) {
      setStatusMessage(`Downloading ${name}...`);
      await downloadSingle(name, url);
      // Wait before downloading the next one
      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_IMAGES));
    }

    setStatusMessage("All downloads complete!");
    setIsDownloading(false);
  };

  const coinList = Object.entries(remainingCoins);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Coin Image Downloader</h2>
      <p style={{ color: "#666" }}>
        Make sure the proxy server is running on port 3001!
      </p>
      {statusMessage && <p style={{ color: "#007bff" }}>{statusMessage}</p>}

      {coinList.length > 0 ? (
        <>
          <button
            onClick={downloadAll}
            disabled={isDownloading}
            style={{ marginBottom: "20px", fontSize: "16px" }}
          >
            {isDownloading ? "Downloading..." : "Download All Coins"}
          </button>
          <p>{coinList.length} coins remaining</p>

          {coinList.map(([name, url]) => (
            <div key={name} style={{ margin: "5px 0" }}>
              <button onClick={() => downloadSingle(name, url)}>
                Download {name}
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>All coins have been downloaded! 🎉</p>
      )}
    </div>
  );
};

export default CoinImageDownloader;
