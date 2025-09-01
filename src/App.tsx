import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [headline, setHeadline] = useState("My Awesome Headline");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Editable Input */}
      <input
        type="text"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        className="border px-4 py-2 rounded-md mb-6 w-full max-w-md"
      />

      {/* Preview Section */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        {headline}
      </motion.h1>
    </div>
  );
}

export default App;
