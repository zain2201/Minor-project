import React,{useEffect,useState} from 'react';
import moment from 'moment/moment';
const Contests = () => {
  const [arr,setArr]= useState([]);
  async function fetchdata(){
    
    const resp= await fetch('https://www.kontests.net/api/v1/all');
    const respjson= await resp.json();
    console.log(respjson)
    setArr(respjson)
   }
useEffect( () => {fetchdata()}
,[]); 

  return (
    <div id="list">
    <div id="list_item">  {arr.map((contest,idx) =>{
     let name = contest.name;
     let start_time=contest.start_time;
     let end_time=contest.end_time;
     start_time=moment(start_time).format('LLLL');
     end_time=moment(end_time).format('LLLL');
     let url=contest.url;
     return (<div><a href={url}>
     <p>Name : {name}</p> 
     <p>Start Time: {start_time}</p>
     <p>End Time : {end_time}</p>
     </a>
     </div>)
    })}</div>
      
    </div>
  )
}

export default Contests