import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrainerBoard from "../components/TrainerBoard";

const TrainerPage = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <Header />

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          {/* Chessboard Container */}
          <div className="w-full md:w-2/3 flex justify-center">
            <div className="rounded-xl shadow-2xl p-4 bg-[#1A2332] border border-gray-700">
              <TrainerBoard />
            </div>
          </div>

          {/* Instructions/Chatbox */}
          <div className="w-full md:w-1/3 bg-[#1A2332] p-6 rounded-xl shadow-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Try It Out Right Now</h3>
            <p className="text-gray-300 mb-4">
              Click on any piece to select it, then click a square to move. You'll see feedback on whether it's part of a known opening.
            </p>
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] p-4 rounded-lg shadow-md text-white mb-4">
              <p className="font-semibold">💡 Next move: e4 — the King's Pawn Opening</p>
              <p className="text-sm text-gray-100 mt-1">
                This is one of the most popular first moves in chess. It controls the center and opens lines for your pieces.
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded-md text-sm text-gray-200 mb-4">
              ✅ Ready to make your first move? Click any piece to get started!
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Opening Progress</p>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-1/3" style={{ width: '0%' }}></div>
              </div>
              <p className="text-xs text-right text-gray-400 mt-1">0/3 moves</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrainerPage;
