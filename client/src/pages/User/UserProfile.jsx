
import React, { useState, useEffect } from 'react';
import Header from '../../components/UserComponents/Header/Header';
import config from '../../config';
import { useSelector, useDispatch } from "react-redux";
// import Spinner from "../Spinner/Spinner";
import Spinner from '../../components/UserComponents/Spinner/Spinner';
// import { storage_bucket } from "../../../firebase";
import { uploadBytesResumable, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage_bucket } from '../../components/Firebase/firebase';
import { Avatar } from 'antd';


const Profile = () => {

  const pic="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

  // const pic="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  const { loading } = useSelector((a) => a.alertsReducer);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showCardBody, setShowCardBody] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);


  const [image, setImage] = useState([]);
  const [URLS, setURL] = useState();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBio, setNewBio] = useState('');




  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0px 2px 5px rgba(0,0,0,0.3)',
      marginBottom: '20px'
    },
    name: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    email: {
      fontSize: '16px',
      color: '#555',
      marginBottom: '10px'
    },
    bio: {
      fontSize: '16px',
      lineHeight: '1.5',
      textAlign: 'center'
    }
  };
  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const User =localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null

      const res = await config.put('/api/v1/user/profile', {
        User,
        name: newName || name,
        email: newEmail || email,
        bio: newBio || bio,
        URLS
        
      });
      setName(res.data.name);
      setEmail(res.data.email);
      setBio(res.data.bio || '');
      setNewName('');
      setNewEmail('');
      setNewBio('');
      setURL('')
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
         const User =localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null
        //  console.log("first",User._id)
        const Useru=User._id
        const res = await config.post('/api/v1/user/profile', {Useru});
        setName(res.data.name);
        setEmail(res.data.email);
        setBio(res.data.bio || '');
        setAvatarUrl(res.data.URLS || '');
        console.log(Avatar)
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleViewMore = () => {
    setShowCardBody(true);
    setIsCollapsed(false);
  };


  const handleImage = (e) => {
    const file = e.target.files[0];

    setFileToBaseone(file);
    console.log(file);


    let fileRef=ref(storage_bucket,"carPic/" + file.name);

    const uploadTask=uploadBytesResumable(fileRef,file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {

        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log('uploadProgress',progress);


        if (progress === 100) {
          console.log(file.name);
          //to get back the link....
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            console.log(URL);
            if (URL) {
              console.log("in!!!!");
              setURL(URL);
             
            }
          });
        }

      })
  
  };


  const setFileToBaseone = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setImage(reader.result);
    }

}














  return (
    <>
    <Header />
    {loading == true && <Spinner />}

    <div className="profile-card">
      <h2 style={{textAlign:'center', color:'#ff5757', fontSize:'36px', backgroundColor:'#f4f4f4', padding:'20px', border:'2px solid #ff5757', boxShadow:'0px 3px 3px rgba(0,0,0,0.3)'}}>
        User Profile
      </h2>
      <div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  flexDirection: 'column' 
}}>
  <img 
    src={avatarUrl?avatarUrl:pic} 
    alt="avatar" 
    style={{ 
      borderRadius: '50%', 
      width: '200px', 
      height: '200px', 
      objectFit: 'cover',
      margin: '20px'
    }} 
  />
  <h2 style={{ 
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    margin: '0' 
  }}>
    {name}
  </h2>
  <p style={{ 
    fontSize: '1.5rem', 
    margin: '0' 
  }}>
    {email}
  </p>
  <p style={{ 
    fontSize: '1rem', 
    textAlign: 'center', 
    margin: '20px', 
    maxWidth: '500px' 
  }}>
    {bio}
  </p>
</div>
      {!isCollapsed && (
        <div className="profile-card-body">
          <form className="profile-card-form profile-card-header profile-card">
            <label>
              New name:
              <input type="text" value={newName} onChange={handleNameChange} />
            </label>
            <label>
              New email:
              <input type="text" value={newEmail} onChange={handleEmailChange} />
            </label>
<label>
  Update profile pic

</label>



           <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>

            <img className="img-fluid" src={image} alt="" />



            <label>
              New bio:
              <textarea value={newBio} onChange={handleBioChange} />
            </label>
            <button onClick={handleUpdate}>Update profile</button>
            <h6>Note:The changes made will only be affected on re-login</h6>
          </form>
        </div>
      )}
      {isCollapsed && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleCollapse}>Edit Profile</button>
        </div>
      )}
      {!isCollapsed && (
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleCollapse}>Show less</button>
        </div>
      )}
    </div>
  </>
  );
};

export default Profile;








