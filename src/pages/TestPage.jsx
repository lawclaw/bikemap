import React,{useEffect, useState} from 'react'
import { api } from '../api/appwrite'

function TestPage(props){
    const [postItems, setPostItems] = useState([])

    useEffect(() => {
        const getPostData = async () => {
            try {
                await api.getData().then((res) => {
                    console.log(res)
                    const stateData = []; // make a temporary const to store your state to be set
                    res.forEach((doc) => {
                        stateData.push({
                            "User": doc.User,
                            "Longitude": doc.Longitude,
                            "Latitude": doc.Latitude,
                            "Title": doc.Title,
                            "Description": doc.Description,
                            "TimeUntil": doc.TimeUntil
                        });
                    });
                    // finally set your state here
                    setPostItems([...stateData]);
                })
            } catch (error) {
                console.log(error.message);
            }
        }
        getPostData();
        console.log(postItems)
    }, [])

    return(
        <>
            <h1>test</h1>
            {postItems.map((element) => {
            return (
                <>
                    <p>{element.User}</p>
                    <p>{element.Longitude}</p>
                    <p>{element.Latitude}</p>
                    <p>{element.Title}</p>
                    <p>{element.Description}</p>
                    <p>{element.TimeUntil}</p>
                </>
                )
            })}
        </>

    )
}

export default TestPage
