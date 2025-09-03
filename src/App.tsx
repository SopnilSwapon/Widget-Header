import { useState } from "react";
import { motion } from "framer-motion";

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof window.webkitSpeechRecognition;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

const fonts = [
  "sans-serif",
  "serif",
  "monospace",
  "cursive",
  "Roboto",
  "Arial",
];
function App() {
  const [headline, setHeadline] = useState("Build Amazing Headline...");
  const [fontSize, setFontSize] = useState(56);
  const [fontWeight, setFontWeight] = useState(700);
  const [fontFamily, setFontFamily] = useState(fonts[0]);
  const [gradientOn, setGradientOn] = useState(true);
  const [direction, setDirection] = useState("to-r");
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [effect, setEffect] = useState("bounce");
  const [exported, setExported] = useState("");
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(exported);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const words = headline.split(" ");

  const settings = {
    headline,
    fontSize,
    fontWeight,
    fontFamily,
    gradientOn,
    direction,
    color1,
    color2,
    effect,
  };
  const handleExport = () => {
    if (exported) {
      setExported("");
    } else {
      setExported(JSON.stringify(settings, null, 2));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const glowVariants = {
    initial: { boxShadow: "0 0 0px rgba(99, 102, 241, 0)" },
    hover: {
      boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  // Add Microphone for voice editing headline
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition 😢");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true); // 🎤 Mic ON

    interface SpeechRecognitionEventResult {
      [index: number]: {
        transcript: string;
      };
    }

    interface SpeechRecognitionEvent extends Event {
      results: SpeechRecognitionEventResult[];
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setHeadline(transcript);
      setIsListening(false); // কাজ শেষ হলে বন্ধ
    };

    recognition.onerror = (event: { error: string }) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false); // Mic বন্ধ হয়ে গেলে reset
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-black to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.h1
            className="text-3xl mt-4 sm:text-4xl text-slate-400 lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            FunnelCare Headline Studio
          </motion.h1>
          <motion.p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create stunning, animated headlines with modern typography and
            gradient effects
          </motion.p>
        </motion.div>

        {/* Headline Preview */}
        <div className="mb-6">
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <motion.div
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white/5 backdrop-blur-2xl flex-col border border-white/10 rounded-3xl p-16 shadow-2xl min-h-[200px] flex relative overflow-hidden"
            >
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-40">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                  }}
                />
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-8 right-8 w-13 h-13 bg-indigo-400 rounded-full opacity-60"
              />
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-pink-400 rounded-full opacity-40"
              />
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-pink-400 rounded-full opacity-40"
              />

              <motion.div
                key={headline + effect}
                initial={{ opacity: 0, y: 30 }}
                suppressContentEditableWarning={true} // React warning fix
                onInput={(e) => setHeadline(e.currentTarget.textContent ?? "")}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  fontSize: `clamp(${Math.max(24, fontSize * 0.6)}px, ${
                    fontSize * 0.8
                  }px, ${fontSize}px)`,
                  fontWeight: fontWeight,
                  fontFamily: fontFamily,
                  marginTop: 0,
                  paddingTop: 0,
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
                  color: gradientOn ? "transparent" : "white",
                  textShadow:
                    effect === "shadow"
                      ? "4px 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(99, 102, 241, 0.3)"
                      : undefined,
                }}
                className={`text-center leading-tight tracking-tight ${
                  effect === "glow"
                    ? "hover:drop-shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all duration-300"
                    : ""
                } ${effect === "bounce" ? "hover:animate-bounce" : ""}`}
              >
                {effect === "letters"
                  ? words.map((word, i) => (
                      <span key={i} className="inline-block mr-3 sm:mr-4">
                        {word.split("").map((char, j) => (
                          <motion.span
                            key={j}
                            initial={{ opacity: 0, y: 20, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                              delay: (i * word.length + j) * 0.05,
                              duration: 0.6,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            whileHover={{
                              y: -5,
                              transition: { duration: 0.2 },
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))
                  : effect === "wave"
                  ? words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="inline-block mr-3 sm:mr-4"
                      >
                        {word.split("").map((char, j) => (
                          <motion.span
                            key={j}
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              delay: j * 0.1,
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.span>
                    ))
                  : effect === "highlight"
                  ? words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        className="inline-block mr-3 sm:mr-4 relative"
                      >
                        <span className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent px-2 z-10">
                          {word}
                        </span>
                        <span className="absolute inset-0 text-emerald-300 rounded-md -z-0"></span>
                      </motion.span>
                    ))
                  : effect === "underline"
                  ? words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="inline-block mr-3 text-indigo-400 sm:mr-4 relative"
                      >
                        {word}
                        <span className="block w-full h-[3px] bg-indigo-400 rounded-full mt-1"></span>
                      </motion.span>
                    ))
                  : effect === "block"
                  ? words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="inline-block mr-3 sm:mr-4 text-white bg-slate-600/40 px-2 py-1 rounded-md"
                      >
                        {word}
                      </motion.span>
                    ))
                  : words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-block mr-3 sm:mr-4 transition-transform"
                      >
                        {word}
                      </motion.span>
                    ))}
              </motion.div>
            </motion.div>
            <div className="flex items-center justify-center mx-auto mt-[-60px] z-50 gap-2">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                autoFocus
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="bg-white/10 border bg-white/20 relative rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                placeholder="Enter your headline..."
              />
              <button
                onClick={startListening}
                className={`px-3 py-2 z-50  rounded-xl shadow-md transition-all ${
                  isListening
                    ? "bg-red-500 animate-pulse"
                    : "to-purple-600 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 hover:to-purple-700"
                } text-white`}
              >
                {isListening ? "🎙 Listening..." : "🎙️ Voice"}
              </button>
            </div>
          </motion.div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 mt-10 xl:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            className="xl:col-span-1 space-y-6"
          >
            <motion.div
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                Style Customizations
              </h3>

              <div className="grid xl:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Font Size
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.05 }}
                    type="range"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    min={24}
                    max={120}
                  />
                  <span className="text-xs text-slate-400">{fontSize}px</span>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Font Weight
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.05 }}
                    type="range"
                    value={fontWeight}
                    onChange={(e) => setFontWeight(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    min={500}
                    max={800}
                    step={100}
                  />
                  <span className="text-xs text-slate-400">{fontWeight}</span>
                </div>
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center mt-2 gap-3 cursor-pointer"
                >
                  <motion.input
                    whileTap={{ scale: 0.9 }}
                    type="checkbox"
                    checked={gradientOn}
                    onChange={() => setGradientOn(!gradientOn)}
                    className="w-5 h-5 rounded border-2 border-white/20"
                  />
                  <span className="text-slate-300">Enable Gradient Color</span>
                </motion.label>
                {/* Gradient colors */}
                {gradientOn && (
                  <div className="flex gap-4 justify-between mt-2">
                    <div className="w-full">
                      <label className="block mb-1 text-xs font-medium text-slate-400">
                        Primary
                      </label>
                      <motion.input
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="cursor-pointer w-full"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block mb-1 text-xs font-medium text-slate-400">
                        Secondary
                      </label>
                      <motion.input
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="cursor-pointer w-full"
                      />
                    </div>
                  </div>
                )}
                <motion.div className="mb-16">
                  {gradientOn && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full"
                    >
                      <label className="block mb-2 text-xs font-medium text-slate-400">
                        Direction
                      </label>
                      <select
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="to-r" className="bg-slate-800">
                          Left to Right →
                        </option>
                        <option value="to-l" className="bg-slate-800">
                          Left to Right ←
                        </option>
                        <option value="to-b" className="bg-slate-800">
                          Top to Bottom ↓
                        </option>
                        <option value="to-t" className="bg-slate-800">
                          Bottom to Top ↑
                        </option>
                      </select>
                    </motion.div>
                  )}
                </motion.div>

                <div>
                  <label className="text-xs block mb-2 font-xs text-slate-400">
                    Font Name
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="bg-white/10 border border-white/20 w-full rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    {fonts.map((f) => (
                      <option key={f} value={f} className="bg-slate-800">
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="w-full"
                >
                  <label className="block mb-2 text-xs font-medium text-slate-400">
                    Animation Effect
                  </label>
                  <select
                    value={effect}
                    onChange={(e) => setEffect(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="fade" className="bg-slate-800">
                      Fade In
                    </option>
                    <option value="glow" className="bg-slate-800">
                      Hover Glow
                    </option>
                    <option value="letters" className="bg-slate-800">
                      Letter Animation
                    </option>
                    <option value="shadow" className="bg-slate-800">
                      Text Shadow
                    </option>
                    <option value="bounce" className="bg-slate-800">
                      Bounce
                    </option>
                    <option value="wave" className="bg-slate-800">
                      Wave
                    </option>
                    <option value="underline" className="bg-slate-800">
                      underline
                    </option>
                    <option value="block" className="bg-slate-800">
                      block
                    </option>
                    <option value="highlight" className="bg-slate-800">
                      highlight
                    </option>
                  </select>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className={`bg-gradient-to-r from-indigo-600 ${
              exported ? "mb-0" : "mb-4"
            } mt-0 to-purple-600 max-w-[230px] ml-auto hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
          >
            <motion.span
              animate={{ rotate: exported ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              📋
            </motion.span>
            Export Style Settings
          </motion.button>

          {exported && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-5"
            >
              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-emerald-500 text-white z-50 cursor-pointer text-xs px-3 py-1 rounded-md shadow-md"
              >
                {copied ? "Copied" : "Copy"}
              </button>

              <motion.pre
                whileHover={{ scale: 1.01 }}
                className="bg-slate-900/80 text-emerald-300 text-xs p-4 rounded-xl overflow-x-auto border border-emerald-400/20 shadow-lg"
              >
                {exported}
              </motion.pre>
            </motion.div>
          )}
        </div>
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}

export default App;
