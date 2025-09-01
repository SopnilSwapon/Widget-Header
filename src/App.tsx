// import { useState } from "react";
// import { motion } from "framer-motion";

// const fonts = ["sans-serif", "serif", "monospace", "cursive", "Roboto", "Arial"];

// function App() {
//   const [headline, setHeadline] = useState("My Awesome Headline");
//   const [fontSize, setFontSize] = useState(48);
//   const [fontWeight, setFontWeight] = useState(700);
//   const [fontFamily, setFontFamily] = useState(fonts[0]);
//   const [gradientOn, setGradientOn] = useState(true);
//   const [direction, setDirection] = useState("to-r");
//   const [color1, setColor1] = useState("#3b82f6"); // blue
//   const [color2, setColor2] = useState("#8b5cf6"); // purple

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
//         {/* Title */}
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
//           🎨 Headline Widget
//         </h2>

//         {/* Input */}
//         <input
//           type="text"
//           value={headline}
//           onChange={(e) => setHeadline(e.target.value)}
//           className="border px-4 py-2 rounded-md mb-6 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           placeholder="Enter headline..."
//         />

//         {/* Typography Controls */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Font Size
//             </label>
//             <input
//               type="number"
//               value={fontSize}
//               onChange={(e) => setFontSize(Number(e.target.value))}
//               className="border px-2 py-1 rounded w-full"
//               min={16}
//               max={120}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Font Weight
//             </label>
//             <input
//               type="number"
//               value={fontWeight}
//               onChange={(e) => setFontWeight(Number(e.target.value))}
//               className="border px-2 py-1 rounded w-full"
//               min={100}
//               max={900}
//               step={100}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Font Family
//             </label>
//             <select
//               value={fontFamily}
//               onChange={(e) => setFontFamily(e.target.value)}
//               className="border px-2 py-1 rounded w-full"
//             >
//               {fonts.map((f) => (
//                 <option key={f} value={f}>
//                   {f}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Gradient Controls */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={gradientOn}
//               onChange={() => setGradientOn(!gradientOn)}
//             />
//             <label className="text-sm font-medium text-gray-700">
//               Gradient
//             </label>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Direction
//             </label>
//             <select
//               value={direction}
//               onChange={(e) => setDirection(e.target.value)}
//               className="border px-2 py-1 rounded w-full"
//             >
//               <option value="to-r">→ Right</option>
//               <option value="to-l">← Left</option>
//               <option value="to-b">↓ Bottom</option>
//               <option value="to-t">↑ Top</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Color 1
//             </label>
//             <input
//               type="color"
//               value={color1}
//               onChange={(e) => setColor1(e.target.value)}
//               className="w-full h-10 border rounded cursor-pointer"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Color 2
//             </label>
//             <input
//               type="color"
//               value={color2}
//               onChange={(e) => setColor2(e.target.value)}
//               className="w-full h-10 border rounded cursor-pointer"
//             />
//           </div>
//         </div>

//         {/* Preview */}
//         <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
//           <motion.h1
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             style={{
//               fontSize: `${fontSize}px`,
//               fontWeight: fontWeight,
//               fontFamily: fontFamily,
//               backgroundImage: gradientOn
//                 ? `linear-gradient(${
//                     direction === "to-r"
//                       ? "90deg"
//                       : direction === "to-l"
//                       ? "270deg"
//                       : direction === "to-b"
//                       ? "180deg"
//                       : "0deg"
//                   }, ${color1}, ${color2})`
//                 : undefined,
//               WebkitBackgroundClip: gradientOn ? "text" : undefined,
//               color: gradientOn ? "transparent" : "black",
//             }}
//             className="text-center leading-snug"
//           >
//             {headline}
//           </motion.h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

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
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [highlightWord, setHighlightWord] = useState("");
  const [effect, setEffect] = useState("fade");
  const [exported, setExported] = useState("");

  // Split headline into words for styling
  const words = headline.split(" ");

  // Settings object for export
  const settings = {
    headline,
    fontSize,
    fontWeight,
    fontFamily,
    gradientOn,
    direction,
    color1,
    color2,
    highlightWord,
    effect,
  };

  const handleExport = () => {
    setExported(JSON.stringify(settings, null, 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          🎨 Headline Widget
        </h2>

        {/* Input */}
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="border px-4 py-2 rounded-md mb-6 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter headline..."
        />

        {/* Typography Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block mb-1 text-sm font-medium">Font Size</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="border px-2 py-1 rounded w-full"
              min={16}
              max={120}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Font Weight</label>
            <input
              type="number"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="border px-2 py-1 rounded w-full"
              min={100}
              max={900}
              step={100}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gradient Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={gradientOn}
              onChange={() => setGradientOn(!gradientOn)}
            />
            <label className="text-sm font-medium">Gradient</label>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="to-r">→ Right</option>
              <option value="to-l">← Left</option>
              <option value="to-b">↓ Bottom</option>
              <option value="to-t">↑ Top</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Color 1</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-10 border rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Color 2</label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-10 border rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Word Styling + Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Highlight Word
            </label>
            <input
              type="text"
              value={highlightWord}
              onChange={(e) => setHighlightWord(e.target.value)}
              className="border px-2 py-1 rounded w-full"
              placeholder="Enter word to highlight"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Effect</label>
            <select
              value={effect}
              onChange={(e) => setEffect(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="fade">Fade-in</option>
              <option value="glow">Hover Glow</option>
              <option value="letters">Per-letter Animation</option>
              <option value="shadow">Text Shadow</option>
            </select>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-xl p-8 shadow-inner mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              fontFamily: fontFamily,
              backgroundImage: gradientOn
                ? `linear-gradient(${
                    direction === "to-r"
                      ? "90deg"
                      : direction === "to-l"
                      ? "270deg"
                      : direction === "to-b"
                      ? "180deg"
                      : "0deg"
                  }, ${color1}, ${color2})`
                : undefined,
              WebkitBackgroundClip: gradientOn ? "text" : undefined,
              color: gradientOn ? "transparent" : "black",
              textShadow:
                effect === "shadow"
                  ? "2px 2px 8px rgba(0,0,0,0.4)"
                  : undefined,
            }}
            className={`text-center leading-snug ${
              effect === "glow" ? "hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.8)] transition" : ""
            }`}
          >
            {effect === "letters"
              ? words.map((word, i) => (
                  <span key={i} className="inline-block mr-2">
                    {word.split("").map((char, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.05 }}
                        className={`${
                          word === highlightWord
                            ? "bg-yellow-200 px-1 rounded"
                            : ""
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : words.map((word, i) => (
                  <span
                    key={i}
                    className={`mr-2 ${
                      word === highlightWord ? "bg-yellow-200 px-1 rounded" : ""
                    }`}
                  >
                    {word}
                  </span>
                ))}
          </motion.h1>
        </div>

        {/* Export Settings */}
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow"
        >
          Export Settings
        </button>

        {exported && (
          <pre className="mt-4 bg-gray-900 text-green-300 text-sm p-4 rounded-lg overflow-x-auto">
            {exported}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;

