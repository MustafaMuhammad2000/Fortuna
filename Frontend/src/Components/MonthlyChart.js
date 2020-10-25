import React from 'react'
//import{Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Tooltip} from 'recharts';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export const MonthlyChart = (props) => {
        return(
       <BarChart width={600} height={300} data={props.data} layout="vertical" margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <YAxis dataKey="name" type="category" />
       <XAxis type="number"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="FoodandDrinks" stackId="a" fill="#54478c" />
       <Bar dataKey="Travel" stackId="a" fill="#2c699a" />
       <Bar dataKey="Shopping" stackId="a" fill="#048ba8" />
       <Bar dataKey="Subscriptions" stackId="a" fill="#0db39e" />
       <Bar dataKey="HousingandUtilities" stackId="a" fill="#16db93" />
       <Bar dataKey="Entertainment" stackId="a" fill="#b9e769" />
       <Bar dataKey="HealthandWellness" stackId="a" fill="#f1c453" />
       <Bar dataKey="Other" stackId="a" fill="#f29e4c" />
      </BarChart>
    )
}


    // const categories = {}
    // console.log(props.total);
    // let radius;
    // if((0.1*props.total) < 100){
    //     radius = 50+(0.1*props.total);
    // }else{
    //     radius = 0;
    // }
    // console.log(radius);
    // return (
    //     <RadarChart cx={300} cy={250} outerRadius={radius} width={600} height={500}>
    //         <PolarGrid />
    //         <PolarAngleAxis dataKey="category" allowDuplicatedCategory={false} />
    //         <PolarRadiusAxis />
    //         <Radar data={props.data}  name="This month" dataKey="amount" stroke="#3FBF3F" fill="#3FBF3F" fillOpacity={0.5}/>
    //         <Radar data={props.pastdata} name="Last month" dataKey="Pamount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5}/>
    //         <Legend />
    //         <Tooltip />
    //   </RadarChart>
    // )