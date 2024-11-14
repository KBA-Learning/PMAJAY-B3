import React from 'react'
//import Navbar from '../components/Navbar'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewAllCoursesButton from '../components/ViewAllCoursesButton'
import coursesData from '../data/courses.json'


const Home = () => {
  const topCourses = coursesData.slice(0,3);
  return (
    <MainLayout>
    <Hero />
    <TopCourses />
    <CourseGrid courses={topCourses} />
    <ViewAllCoursesButton />
    </MainLayout>
  )
}

export default Home