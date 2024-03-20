
import "./Register.css";
import { useForm } from 'react-hook-form';
import {useState }  from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';



function Register() {
  //error state
  let [error, setError] = useState("");
   let [selectedFile,setSelectedFile]=useState(null)

  //navigate
  const navigate = useNavigate();

  //use form hook
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //adding new user
   let addNewUser = (newUser) => {
    console.log(newUser)
    // console.log(newUser);
    //make HTTP POST req to save newUser to localAPI

    let fd=new FormData();
    //append newUser to form data
    fd.append("user",JSON.stringify(newUser))
    //append selected file to form data
    fd.append("photo",selectedFile)

    axios
      .post("http://localhost:5000/user-api/register-user", fd)
      .then((response) => {
        
        if (response.status === 201) {
          //naviagte to login componentxp
          navigate('/login')
        }
        if(response.status!==201){
          setError(response.data.message)
        }
      })
      .catch((err) => {
        //  console.log("err is ",err)
        //the client was given an error response (5xx,4xx)
        if (err.response) {
          setError(err.message);
        }
        //the client never received a response
        else if (err.request) {
          setError(err.message);
        }
        //for other error
        else {
          setError(err.message);
        }
      });
   };


 //on file select
 const onFileSelect=(e)=>{
  setSelectedFile(e.target.files[0])
 }


  return (
    <div className="add-user ">


      <p className="display-3 text-center">Add New User</p>
      {/* form submission error */}
      {error.length !== 0 && (
        <p className="display-3 text-danger text-center">{error}</p>
      )}



      {/* add user form */}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(addNewUser)}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="e.g. John"
                {...register("username", { required: true })}
              />
              {/* validation errors for name */}
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Username is required
                </p>
              )}
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                placeholder="*********"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {/* validation errors for name */}
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Password is required
                </p>
              )}
            </div>
            {/* email */}
            <div className="mb-3">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                placeholder="e.g. example@mail.com"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              {/* validation errors for email */}
              {errors.email?.type === "required" && (
                <p className="text-danger fw-bold fs-5">* Email is required</p>
              )}
            </div>
            {/* date of birth */}
            <div className="mb-3">
              <label htmlFor="dob">Date of birth</label>
              <input
                type="date"
                id="dob"
                className="form-control"
                {...register("dob", { required: true })}
              />
              {/* validation errors for name */}
              {errors.dob?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  *Date of birth is required
                </p>
              )}
            </div>


            {/* image url */}
            <div className="mb-3">
              <label htmlFor="name">Select profile pic</label>
              <input
                type="file"
                id="image"
                className="form-control"
                {...register("image", { required: true })}
                onInput={onFileSelect}
              />
              {/* validation errors for image */}
              {errors.image?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  *Image URL is required
                </p>
              )}
            </div>


            {/* submit button */}
            <button type="submit" className="btn btn-primary">
              Regsiter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register