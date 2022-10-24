import React, { useEffect, useState } from "react";

type Props = {}

const EduList=({data})=>{
    const users = [
        {
          id: 1,
          username: "cocoon",
          email: "asd123@gmail.com",
        },
        {
          id: 2,
          username: "ultra",
          email: "qwe555@example.com",
        },
        {
          id: 3,
          username: "hozae",
          email: "zxc789@example.com",
        },
      ];

      
    const eduNameList = data.eduNameList;
    const eduCostList = data.eduCostList;
    const eduAuthorList = data.eduAuthorList;
    const eduReviewList = data.eduReviewList;
    const eduLinkList = data.eduLinkList;

    console.log("eduNameList==>"+eduNameList);
    console.log("eduCostList==>"+eduCostList);
    console.log("eduAuthorList==>"+eduAuthorList);
    console.log("eduReviewList==>"+eduReviewList);
    console.log("eduLinkList==>"+eduLinkList);

    const [eduName,setEduName]= React.useState<any>(); 
    const [eduCost,setEduCost]= React.useState<any>(); 
    const [eduAuthor,setEduAuthor]= React.useState<any>(); 
    const [eduReview,setEduReview]= React.useState<any>(); 
    const [eduLink,setEduLink]= React.useState<any>(); 

    useEffect(()=>{
        setEduName(eduNameList)
        setEduCost(eduCostList)
        setEduAuthor(eduAuthorList)
        setEduReview(eduReviewList)
        setEduLink(eduLinkList)

    },[eduNameList,eduCostList,eduAuthorList,eduReviewList,eduLinkList])

    return (
    <div className="eduNameList" style={{color:'grey'}}>
        <li style={{color:'grey'}}>{users[0].username}</li>
        <li style={{color:'grey'}}>{eduCost}</li>
        <li style={{color:'#464646'}}>{eduAuthor}</li>
        <li style={{color:'#464646'}}>{eduReview}</li>
        <li style={{color:'#464646'}}>{eduLink}</li>
    </div>
    );
};

export default EduList