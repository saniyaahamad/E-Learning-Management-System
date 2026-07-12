import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import courseData from "../pages/courseData";
import "../App.css";

function Courses() {

  const [courses, setCourses] = useState([]);

  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [fees, setFees] = useState("");


  // GET COURSES FROM FASTAPI
  useEffect(() => {

    fetch("http://127.0.0.1:8000/courses")
      .then(res => res.json())
      .then(data => {

        console.log(data);

        if(Array.isArray(data)){
          setCourses(data);
        }
        else if(data.courses){
          setCourses(data.courses);
        }
        else{
          setCourses([]);
        }

      })
      .catch(err => console.log(err));

  }, []);



  // ADD COURSE

  const addCourse = ()=>{

    fetch("http://127.0.0.1:8000/courses",
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        course_name:courseName,
        duration:duration,
        fees:Number(fees)

      })

    })
    .then(res=>res.json())
    .then(()=>{

      alert("Course Added");

      window.location.reload();

    })

  };




  // DELETE COURSE

  const deleteCourse=(id)=>{


    fetch(
      `http://127.0.0.1:8000/courses/${id}`,
      {
        method:"DELETE"
      }
    )
    .then(res=>res.json())
    .then(()=>{

      alert("Deleted");

      setCourses(
        courses.filter(c=>c[0]!==id)
      );

    })

  };




return (

<div className="page">


<h1 className="title">
Courses 
</h1>



<div className="top-section">


<div className="total-card">

<h2>
Total Courses : {courses.length}
</h2>


</div>



<div className="form-card">


<h2>
Add Course
</h2>


<input
placeholder="Course Name"
value={courseName}
onChange={
e=>setCourseName(e.target.value)
}
/>


<input
placeholder="Duration"
value={duration}
onChange={
e=>setDuration(e.target.value)
}
/>



<input
placeholder="Fees"
type="number"
value={fees}
onChange={
e=>setFees(e.target.value)
}
/>


<button onClick={addCourse}>
Save Course
</button>


</div>


</div>





<div className="table-container">


<table>


<thead>

<tr>

<th>ID</th>
<th>Course</th>
<th>Duration</th>
<th>Fees</th>
<th>Action</th>

</tr>

</thead>




<tbody>


{
courses.map((c)=>(


<tr key={c[0]}>


<td>
{c[0]}
</td>



<td>


<Link

to={`/course/${c[0]}`}

state={{

course:
courseData.find(
(x)=>x.id===c[0]
)

}}

>


{c[1]}


</Link>


</td>



<td>
{c[2]}
</td>



<td>
₹{c[3]}
</td>



<td>


<button

onClick={()=>
deleteCourse(c[0])
}

style={{

background:"red",
color:"white",
padding:"8px",
borderRadius:"5px"

}}

>

Delete

</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>



</div>


);


}


export default Courses;