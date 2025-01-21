import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import BlogPostCard from '../../components/blogPostCard/BlogPostCard'
import { Helmet } from 'react-helmet'


function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
            <Helmet><title>Voix </title></Helmet>

    <div>
      <Layout>
        <HeroSection/>
        <BlogPostCard/>
      </Layout>
    </div></>
  )
}

export default Home