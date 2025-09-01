import { useState } from "react";
import { motion } from "framer-motion";

const fonts = ["sans-serif", "serif", "monospace", "cursive", "Roboto", "Arial"];

function App() {
  const [headline, setHeadline] = useState("My Awesome Headline");
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(700);
  const [fontFamily, setFontFamily] = useState(fonts[0]);
  const [gradientOn, setGradientOn] = useState(true);
  const [direction, setDirection] = useState("to-r");
  const [color1, setColor1] = useState("#3b82f6"); // blue-500
  const [color2, setColor2] = useState("#8b5cf6"); // purple-500


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Input */}
      <input
        type="text"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        className="border px-4 py-2 rounded-md mb-6 w-full max-w-md"
        placeholder="Enter headline..."
      />

      {/* Typography Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <div>
          <label className="block mb-1">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="border px-2 py-1 rounded"
            min={16}
            max={120}
          />
        </div>
        <div>
          <label className="block mb-1">Font Weight</label>
          <input
            type="number"
            value={fontWeight}
            onChange={(e) => setFontWeight(Number(e.target.value))}
            className="border px-2 py-1 rounded"
            min={100}
            max={900}
            step={100}
          />
        </div>
        <div>
          <label className="block mb-1">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {fonts.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gradient Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <div>
          <label className="block mb-1">Gradient</label>
          <input
            type="checkbox"
            checked={gradientOn}
            onChange={() => setGradientOn(!gradientOn)}
          />{" "}On/Off
        </div>
        <div>
          <label className="block mb-1">Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="to-r">→</option>
            <option value="to-l">←</option>
            <option value="to-b">↓</option>
            <option value="to-t">↑</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Color 1</label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-16 h-8 p-0 border-0"
          />
        </div>
        <div>
          <label className="block mb-1">Color 2</label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-16 h-8 p-0 border-0"
          />
        </div>
      </div>

      {/* Preview */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          backgroundImage: gradientOn
            ? `linear-gradient(${direction === "to-r" ? "90deg" :
                              direction === "to-l" ? "270deg" :
                              direction === "to-b" ? "180deg" : "0deg"}, ${color1}, ${color2})`
            : undefined,
          WebkitBackgroundClip: gradientOn ? "text" : undefined,
          color: gradientOn ? "transparent" : undefined,
        }}
        className="text-center"
      >
        {headline}
      </motion.h1>
    </div>
  );
}

export default App;
