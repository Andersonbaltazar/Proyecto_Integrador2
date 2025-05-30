import React from "react";
import { CheckCircle, Clock } from "lucide-react";

const stages = [
  { name: "Plantación", completed: true },
  { name: "Desarrollo", completed: true },
  { name: "Cosecha", completed: false },
];

const CropLifecycle = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-green-700">Ciclo del Sembrío</h3>
      <div className="flex flex-col gap-4">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center gap-3">
            {stage.completed ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <Clock className="text-gray-400" size={20} />
            )}
            <span className={`text-base ${stage.completed ? "text-green-700" : "text-gray-500"}`}>
              {stage.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropLifecycle;