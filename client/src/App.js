import "./App.css";
import Layout from "./components/UserComponents/Layout/UserLayout";
import config from '../../client/src/config'
import { useEffect } from "react";

function App() {


const getAdhil=async()=>{

  try {
    const {data}=await config.get("api/v1/admin/adil")
    console.log("man",data);

  } catch (error)

   {
    console.log(error)

  }
}



  useEffect(()=>{

    getAdhil()

  },[])

  return (
    <>
  <Layout />
  </>
  )
}

export default App;

