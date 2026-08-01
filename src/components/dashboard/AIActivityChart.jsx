import React from "react";

export default function AIActivityChart() {
  const data = [40, 65, 48, 80, 55, 92, 70];
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
            style={{ height: `${(value / max) * 100}%` }}
          />
          <span className="text-[10px] text-slate-500">{"MonTueWedThuFriSatSun"[index * 3]}{index * 3 + 1}</span>
        </div>
      ))}
    </div>
  );
}
