import React from 'react'
import{Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Tooltip} from 'recharts';


export const MonthlyChart = (props) => {
    console.log(props.total);
    let radius;
    if((0.1*props.total) < 100){
        radius = 100+(0.1*props.total);
    }else{
        radius = 200;
    }
    console.log(radius);
    return (
        <RadarChart cx={300} cy={250} outerRadius={200} width={600} height={500}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" allowDuplicatedCategory={false} />
            <PolarRadiusAxis/>
            <Radar data={props.data}  name="This month" dataKey="amount" stroke="#3FBF3F" fill="#3FBF3F" fillOpacity={0.5}/>
            <Radar data={props.pastdata} name="Last month" dataKey="Pamount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
            <Legend />
            <Tooltip />
      </RadarChart>
    )
}
