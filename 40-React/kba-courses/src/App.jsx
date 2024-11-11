import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopCourses from './components/TopCourses'
import CoursesGrid from './components/CourseGrid'
import coursesData from './data/courses.json'
import ViewAllCoursesButton from './components/ViewAllCoursesButton'

const App = () => {
  return (
    <div>
    <Navbar />
    <Hero />
    <TopCourses />
    <CoursesGrid courses={coursesData} />
    <ViewAllCoursesButton />
    </div>
  )
}

export default App