import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const CustomBarChart = ({ data, COLORS }) => {
    // Function to alternate colors
    const getBarColor = (entry) => {
        switch (entry?.priority) {
            case 'Low':
                return '#00BC7D';

            case 'Medium':
                return '#FE9900';

            case 'High':
                return '#FF1F57';

            default:
                return '#00BC7D';
        }
    };
    // console.log(data);

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} >
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="priority"
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke="none" />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke="none" />
                    <Bar dataKey="count" nameKey="priority" fill="#8884d8" radius={[10, 10, 0, 0]} activeDot={{ r: 8, fill: "yellow" }} activeStyle={{ fill: "green" }} >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                        ))}
                    </Bar>
                    <Tooltip cursor={{ fill: "transparent" }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart