import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
const CustomPieChart = ({data,COLORS}) => {
    // const data = [
    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    // ];
   
    return (
        <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        // fill="#8884d8"
                        dataKey={"count"}
                        nameKey={"status"}
                    >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}</Pie>
                       <Legend/>
                <Tooltip/>
                </PieChart>
             
            </ResponsiveContainer>
        </div>
    )
}

export default CustomPieChart