



 import TopNav from '../../components/AdminComponents/TopNav/TopNav'
import { toast } from 'react-toastify';
import { addCar } from '../../redux/action/carsAction';
 import { useDispatch } from 'react-redux';
 import { useState } from 'react';

const AddCar = () => {
const dispatch =useDispatch()

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [bookedTimeSlots, setbookedTimeSlots] = useState([])
    const [image, setImage] = useState([]);
const [rentPerHour, setrentPerHour] = useState('')
const [capacity, setcapacity] = useState('')
const [fuelType, setfuelType] = useState('')
const [pickType, setPickType] = useState('')

const [place, setPlace] = useState('')
    //categories from the backend

    
    //handle and convert it in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }

    }
    
   
    const submitForm = (e) =>{
      e.preventDefault();

      dispatch(addCar({ name, description, image,rentPerHour,capacity,fuelType,bookedTimeSlots,place,pickType }));

      setName('');
      setDescription('');
      setCategory('');
      setImage('');
      setrentPerHour('');
      setcapacity('')
      setfuelType('')
      setbookedTimeSlots('')
      setPlace('')
      setPickType('')
      toast.success('product created successfully');
  }
  

  return (
   <>
    <TopNav/>

     <div className="container custom_class">
        <h2 className="signup_title " style={{textAlign:'center',paddingTop:"90px"}}>ADD CAR</h2>
        <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data" onSubmit={submitForm}>
            
            <div className="form-outline mb-4">
                <input onChange={(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control"  value={name}/>
                <label className="form-label" htmlFor="form4Example1">Name</label>
            </div>


            <div className="form-outline mb-4">
                <textarea  onChange={(e)=>setDescription(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={description}/>
                <label className="form-label" htmlFor="form4Example2">Description </label>
            </div>

            <div className="form-outline mb-4">
                <textarea  onChange={(e)=>setPlace(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={place}/>
                <label className="form-label" htmlFor="form4Example2">Country </label>
            </div>

           

            <div className="form-outline mb-4">
                <input  onChange={(e)=>setrentPerHour(e.target.value)}  type="number" id="form4Example4" className="form-control"   value={rentPerHour}/>
                <label className="form-label" htmlFor="form4Example2">Rent per hour </label>
            </div>

            <div className="form-outline mb-4">
                <input  onChange={(e)=>setcapacity(e.target.value)}  type="number" id="form4Example4" className="form-control"   value={capacity}/>
                <label className="form-label" htmlFor="form4Example2">capacity </label>
            </div>

            <div className="form-outline mb-4">
                <input  onChange={(e)=>setfuelType(e.target.value)}  type="text" id="form4Example4" className="form-control"   value={fuelType}/>
                <label className="form-label" htmlFor="form4Example2">fuelType </label>
            </div>


            <div className="form-outline mb-4">
                <input  onChange={(e)=>setPickType(e.target.value)}  type="text" id="form4Example4" className="form-control"   value={pickType}/>
                <label className="form-label" htmlFor="form4Example2">Pickup Location </label>
            </div>

            <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>

            <img className="img-fluid" src={image} alt="" />
            <button  type="submit" className="btn btn-primary btn-block mb-4">Create</button>
            
         </form>
    </div> 
   </>
  )
}

export default AddCar