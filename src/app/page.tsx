"use client";
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

export default function Home() {
  const [char, setChar] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateToken = () => {
    if (!char) {
      setError("Lütfen bir karakter girin");
      return;
    }

    if (!/^[a-zA-Z0-9]$/.test(char)) {
      setError("Lütfen sadece tek bir harf veya rakam girin");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const upperChar = char.toUpperCase();
      const length = 25;
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let randomPart = "";

      for (let i = 0; i < length - 1; i++) {
        randomPart += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }

      setGeneratedToken(upperChar + randomPart);
      setError("");
      setIsGenerating(false);
    }, 300);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Token Üretici
        </h1>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={char}
              onChange={(e) => setChar(e.target.value)}
              maxLength={1}
              className="w-full p-3 border border-gray-200 rounded-lg
                focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none
                transition-colors duration-200"
              placeholder="Bir harf veya rakam girin"
            />
          </div>

          <button
            onClick={generateToken}
            disabled={isGenerating}
            className={`w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold
              py-3 px-6 rounded-lg transition duration-200 relative
              ${isGenerating ? "opacity-75 cursor-not-allowed" : ""}
              active:scale-[0.98]`}
          >
            {isGenerating ? "Oluşturuluyor..." : "Token Oluştur"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {generatedToken && (
            <div className="mt-2">
              <div className="relative">
                <div
                  className={`bg-gray-50 p-4 rounded-lg break-all pr-12 border border-gray-200
                  ${copied ? "bg-green-50 border-green-200" : ""} transition-colors duration-200`}
                >
                  {generatedToken}
                  <button
                    onClick={copyToClipboard}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2
                      hover:bg-gray-200 rounded-lg transition-all duration-200
                      ${copied ? "text-green-500" : "text-gray-600"}`}
                    title={copied ? "Kopyalandı!" : "Kopyala"}
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {copied && (
                  <div className="absolute -right-2 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Kopyalandı!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
