"use client";

import { useState } from "react";
import Image from "next/image";
import Charts from "@/components/features/dashboard/charts";
import {
  Calendar,
  ChevronDown,
  Download,
  Info,
  TrendingDown,
  TrendingUp,
  Award
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  RadialBarChart,
  AreaChart,
  Area
} from "recharts";



const summaryCards = [
  {
    title: "Total Sub-Project",
    value: "16",
    trend: "8.5% Up from last month",
    isPositive: true,
  },
  {
    title: "Active",
    value: "82",
    trend: "1.3% Up from past week progress",
    isPositive: true,
  },
  {
    title: "In Progress",
    value: "82",
    trend: "1.3% Up from past week progress",
    isPositive: true,
  },
  {
    title: "Completed",
    value: "07",
    trend: "4.3% Down from last year",
    isPositive: false,
  },
];




const timelineData = [
  { date: "Dec 1", tasks: 8 },
  { date: "Dec 5", tasks: 9 },
  { date: "Dec 10", tasks: 10 },
  { date: "Dec 14", tasks: 11 },
  { date: "Dec 18", tasks: 10 },
  { date: "Dec 22", tasks: 12 },
];

const teamMembers = [
  {
    name: "Cameron Williamson",
    image: "/userimage.jpg",
    progress: 57,
    tasks: "4/7 tasks",
    badge: 1,
  },
  {
    name: "Kristin Watson",
    image: "/userimage.jpg",
    progress: 71,
    tasks: "5/7 tasks",
    badge: 2,
  },
  {
    name: "Darlene Robertson",
    image: "/userimage.jpg",
    progress: 43,
    tasks: "3/7 tasks",
    badge: 3,
  },
  {
    name: "Jenny Wilson",
    image: "/userimage.jpg",
    progress: 86,
    tasks: "6/7 tasks",
    badge: null,
  },
  {
    name: "Jenny Wilson",
    image: "/userimage.jpg",
    progress: 29,
    tasks: "2/7 tasks",
    badge: null,
  },
];

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1W");
  const currentDate = "June 01, 2025";


  return (
    <div className="w-full space-y-2 p-2">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-[sans-serif] font-semibold text-[14px] leading-[20px] tracking-[-0.28px] text-foreground">
            Project Analytics Dashboard
          </h1>
          <p className="text-muted-foreground font-inter font-normal text-sm leading-5 tracking-normal">
            A clear view of progress, performance, and team
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Picker */}
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors bg-card">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{currentDate}</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </button>
          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Download size={16} />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-card rounded-lg border border-border p-5 shadow-sm"
          >
            <p className="text-sm text-muted-foreground mb-2">{card.title}</p>
            <p className="text-3xl font-semibold text-foreground mb-2">
              {card.value}
            </p>
            <div className="flex items-center gap-2">
              {card.isPositive ? (
                <TrendingUp size={16} className="text-green-600" />
              ) : (
                <TrendingDown size={16} className="text-red-600" />
              )}
              <span
                className={`text-sm ${
                  card.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
     <Charts/>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Timeline */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h2 className="font-sans
  font-medium
  text-sm
  leading-5
  tracking-normal
  text-foreground mb-4">
              Task Timeline
            </h2>
          <div className="flex justify-between items-center mb-4">
            
            <div className="w-full flex gap-1 justify-between">
              {["1W", "2W", "1M", "6M", "1Y"].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`w-full h-[24px] flex items-center gap-1 p-1 pr-[10px] pb-1 pl-[10px] opacity-100 ${
                    selectedTimeframe === timeframe
                      ? "bg-muted text-foreground"
                      : "bg-transparent text-muted-foreground"
                  }`}
                >
                  <span className="font-sans font-medium text-[12px] leading-[16px] tracking-[-0.24px] text-center">
                  {timeframe}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={timelineData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
    <Tooltip
      content={({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
              <p className="text-sm font-semibold">Dec 14, 25</p>
              <p className="text-xs text-muted-foreground">Task Completed</p>
              <p className="text-sm font-medium mt-1">{payload[0].value}/12</p>
            </div>
          );
        }
        return null;
      }}
    />
    <Area
      type="monotone"
      dataKey="tasks"
      stroke="#3B82F6"
      strokeWidth={2}
      fill="#E4F5F5"
      fillOpacity={0.3}
      dot={{ fill: "#3B82F6", r: 4 }}
      activeDot={{ r: 6 }}
    />
  </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <Info size={14} />
            <span className="font-sans font-normal text-[14px] leading-[20px] tracking-normal">
              Total work hours include extra hours.
            </span>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="font-sans
  font-medium
  text-sm
  leading-5
  tracking-normal
  text-foreground mb-4">
            Team Performance
          </h2>
          <div className="grid grid-cols-1 gap-4">
    {teamMembers.map((member, index) => (
      <div
        key={index}
        className="h-[65px] gap-3 p-3 rounded-[10px] bg-muted border border-border opacity-100 hover:shadow-md transition-shadow relative"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden relative">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 h-[40px]">
  <div className="flex items-center justify-between mb-1">
    <p className="font-sans font-medium text-[14px] leading-[20px] tracking-[-0.28px] text-foreground">
      {member.name}
    </p>
  </div>
  
  <div className="flex items-center gap-3">
    <div className="flex-1 bg-muted rounded-full h-[4px]">
      <div
        className="bg-blue-600 h-[4px] rounded-full transition-all"
        style={{ width: `${member.progress}%` }}
      />
    </div>
    
    <p className="text-[16px] font-medium text-muted-foreground whitespace-nowrap">
      {member.tasks}
    </p>
  </div>
</div>
        </div>
        
        {/* Badge Section - THIS IS THE PART YOU MENTIONED */}
        {member.badge && (
          <div className="absolute -top-1 right-2 w-[24px] h-[24px]  flex items-center justify-center">
            <Image
              src='/badgecontainericon.png'
              alt="badge"
              fill
              sizes="28px"
              className="object-cover"
            />
            <span className="absolute text-blue-600 text-[8px] font-bold pt-1">
              {member.badge}
            </span>
          </div>
        )}
      </div>
    ))}
  </div>
        </div>
      </div>
    </div>
  );
}
