import React from "react";
import Fortuna1 from "../Images/Fortuna1.jpg"
import Fortuna2 from "../Images/Fortuna2.jpg"
import Fortuna3 from "../Images/Fortuna3.jpg"
export const About = () => {
  return (  
    <React.Fragment>
      <h2 className="Title">About Fortuna</h2>
      <h2 className="border">Record Your Expenses</h2>
      <img className='image' src={Fortuna1} alt="Logo" />;
      <h2 className="border">See how your spending habits evolve</h2>
      <img className='image' src={Fortuna2} alt="Logo" />;
      <h2 className="border">Visualize how you spend your money</h2>
      <img className='image' src={Fortuna3} alt="Logo" />;
    </React.Fragment> 
  );
};
