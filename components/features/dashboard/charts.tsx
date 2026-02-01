"use client";

import { useState } from "react";
import Loader from '../../common/loading-screen'
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
    RadialBar,
  } from "recharts";
  
  const COLORS = {
    todo: "#10B981", // Green
    complete: "#3B82F6", // Blue
    notStarted: "#EF4444", // Red
    review: "#F59E0B", // Yellow
    inProgress: "#6B7280", // Gray
    totalSum: "#E5E5E5", // Gray
  };

  const taskStatusData = [
    { name: "To-Do", value: 21, fill: COLORS.todo },
    { name: "Complete", value: 12, fill: COLORS.complete },
    { name: "Not Started", value: 3, fill: COLORS.notStarted },
    { name: "Review", value: 3, fill: COLORS.review },
    { name: "In Progress", value: 12, fill: COLORS.inProgress },
  ];
  
  const priorityData = [
    {
      priority: "Urgent",
      todo: 5,
      complete: 3,
      notStarted: 1,
      review: 2,
      inProgress: 4,
    },
    {
      priority: "High",
      todo: 8,
      complete: 6,
      notStarted: 1,
      review: 1,
      inProgress: 5,
    },
    {
      priority: "Medium",
      todo: 5,
      complete: 2,
      notStarted: 1,
      review: 0,
      inProgress: 2,
    },
    {
      priority: "Low",
      todo: 3,
      complete: 1,
      notStarted: 0,
      review: 0,
      inProgress: 1,
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

  export default function Charts() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("1W");
    const currentDate = "June 01, 2025";
    const [loading, setLoading] = useState(true);
    const totalTasks = taskStatusData.reduce((sum, item) => sum + item.value, 0);
    const completedPercentage = Math.round(
      (taskStatusData.find((item) => item.name === "Complete")?.value || 0) /
        totalTasks *
        100
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h2 className="font-sans
  font-medium
  text-sm
  leading-5
  tracking-normal
  text-[#46474A] mb-4">
            Task Status Distribution
          </h2>
          <div className="flex items-center gap-8">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="100%"
          data={taskStatusData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
             
  
        </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-semibold text-[#242529]">
                    {completedPercentage}%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {taskStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm text-[#242529]">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[#242529]">
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="pt-2  ">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS.totalSum }}
                    />
                  <span className="text-sm font-semibold text-[#242529]">
                    Total task
                  </span>
                  </div>
                  <span className="text-sm font-semibold text-[#242529]">
                    {totalTasks}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks by Priority & Status */}
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h2 className="font-sans
  font-medium
  text-sm
  leading-5
  tracking-normal
  text-[#46474A] mb-4">
            Tasks by Priority & Status
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={priorityData}
             
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
  dataKey="priority"
  axisLine={false}
  tickLine={false}
  tick={{
    fontFamily: "sans-serif",
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: "-0.24px",
    textAnchor: "middle" // centers text horizontally
  }}
/>
              
              <Tooltip />
              <Bar dataKey="todo" stackId="a" fill={COLORS.todo}  barSize={48}  radius={[4, 4, 0, 0]} stroke="#FFFFFF" strokeWidth={1} opacity={1} />
              <Bar dataKey="complete" stackId="a" fill={COLORS.complete}  barSize={48}  radius={[4, 4, 0, 0]} stroke="#FFFFFF" strokeWidth={1} opacity={1}/>
              <Bar dataKey="notStarted" stackId="a" fill={COLORS.notStarted}  barSize={48}  radius={[4, 4, 0, 0]} stroke="#FFFFFF" strokeWidth={1} opacity={1}/>
              <Bar dataKey="review" stackId="a" fill={COLORS.review}  barSize={48}  radius={[4, 4, 0, 0]} stroke="#FFFFFF" strokeWidth={1} opacity={1}/>
              <Bar dataKey="inProgress" stackId="a" fill={COLORS.inProgress}  barSize={48}  radius={[4, 4, 0, 0]} stroke="#FFFFFF" strokeWidth={1} opacity={1}/>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex  items-center  flex-wrap gap-2 mt-4">
            {taskStatusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    );
  }