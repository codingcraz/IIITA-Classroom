import React, { useContext, useEffect } from "react";
import Charts from "../Charts/Charts";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Image4 = "/photos/Subjects/img4.jpg";

function Attendance() {
  const { data, setData } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await axios.get("http://localhost:5000/user/Dashboard", {
            headers: {
              authorization: token, // Pass the token directly, assuming it's a string
            },
          });
          const subData = data.data.user.courses;

          const formattedData = subData.map((item) => ({
            Image: Image4, // Assuming Image4 is defined somewhere in your code
            course_name: item.course.coursename, // Assuming course name is stored in course.coursename
            course: item.course.courseid, // Assuming course ID is stored in course.courseid
            proffesor:
              item.course.professor.length > 0
                ? item.course.professor.map((prof) => prof.name).join(", ")
                : "N/A",
            // posts: item.course.posts.map((post) => ({
            //   Author: post.author,
            //   // pfp: post.user.userImage,
            //   date: post.date,
            //   content: post.content,
            // })),
          }));
          // console.log(formattedData)

          setData(formattedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-wrap">
      {data.map((d) => (
        <div
          key={d.course}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-gray-200 m-3 flex flex-col p-2"
        >
          <div className="font-bold flex m-1 text-gray-600 justify-center">
            {d.course_name}
          </div>
          <Charts pdata={[5, 3]} />
          <div className="p-2 ">
            <Link to={`/attendance/${d.course}`} className="block w-full">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">
                View Attendance
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Attendance;
