import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", ProductViewed: 700, ProductSold: 500 },
  { name: "Feb", ProductViewed: 300, ProductSold: 139 },
  { name: "Mar", ProductViewed: 200, ProductSold: 980 },
  { name: "Apr", ProductViewed: 278, ProductSold: 390 },
  { name: "May", ProductViewed: 189, ProductSold: 480 },
];

const Chart = () => {

  return (
    <div style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-4">
       
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center lg:gap-8 gap-4">
            <span className="w-8 h-2 rounded-full bg-[#55AAF1] mr-2"></span>
            <span className="font-bold ">Products Viewed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-8 h-2 rounded-full bg-[#42BDA1] mr-2"></span>
            <span className="font-bold ">Products Sold</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={data}>
          <CartesianGrid horizontal={true} vertical={false} strokeWidth={0.3} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#8D98AF", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} tick={{ fill: "#8D98AF", fontSize: 14 }} />
          <Tooltip />
          <Bar dataKey="ProductViewed" fill="#55AAF1" barSize={16} radius={[10, 10, 10, 10]}  />
          <Bar dataKey="ProductSold" fill="#42BDA1" barSize={16} radius={[10, 10, 10, 10]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;