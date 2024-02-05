import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getPosts } from '../../api/posts'
import { getCategories } from '../../api/posts'
import twitterIcon from "../../assets/icons/twitter-icon.svg"
import facebookIcon from "../../assets/icons/facebook-icon.svg"
import pinterestIcon from "../../assets/icons/pinterest-icon.svg"
import instagramIcon from "../../assets/icons/instagram-icon.svg"
import m6FooterLogo from "../../assets/icons/m6-footer-logo.svg"
import { useLocation } from 'react-router-dom';
import moment from "moment"
import "./style.sass"

const socialLinks = [
  {
    name: "Twitter",
    icon: <i className="ri-twitter-fill"></i>,
    link: "https://twitter.com/M6Labs",
  },
  {
    name: "Linkedin",
    icon: <i className="ri-linkedin-fill"></i>,
    link: "https://www.linkedin.com/company/m6-labs",
  },
  // {
  //   name: "Facebook",
  //   icon: facebookIcon,
  //   link: "",
  // },
  // {
  //   name: "Pinterest",
  //   icon: pinterestIcon,
  //   link: "",
  // },
  // {
  //   name: "Instagram",
  //   icon: instagramIcon,
  //   link: "",
  // },
]

const quickLinks = [
  {
    name: "About",
    path: "/aboutus",
  },
  {
    name: "Research",
    path: "/research",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Advertise with us",
    path: "/advertise",
  },
  {
    name: "Contact",
    path: "/aboutus",
  },
  {
    name: "Cross Promo",
    path: "/promotion",
  }
]

function Footer() {
  const location = useLocation()
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const pathname = location.pathname

  useEffect(() => {
    getPosts({ trending: true, limit: 6 }).then(res => {
      setPosts(res.data || [])
    })
    getCategories().then(cats => {
      setTags(cats || [])
    })
  }, [])

  // if(pathname === "/subscribe") {
  //   return null
  // }

  return (
    <div className='footer-container bg-black text-white overflow-hidden pt-10 pb-10 mt-20'>
      <Container>
        <Row>
          <Col xs={12}>
            <img src={m6FooterLogo} alt="" />
          </Col>
        </Row>
        <hr className='my-4' />
        <Row>
          <Col xs={12} sm={6} md={4}>
            <div className='text-start sm:w-fit sm:m-auto md:m-0'>
              <h5 className="my-4 text-neutral-100">Most Popular</h5>
              <ul className='p-0 m-0'>
                {
                  posts.map((post: any) => {
                    return <li key={post.slug} className='my-3'>
                      <a className='text-neutral-400 hover:text-inherit no-underline' href={`/post/${post.slug}`}>{post.title}</a>
                    </li>
                  })
                }
              </ul>
            </div>
          </Col>

          <Col xs={6} sm={6} md={4}>
            <div className='text-start sm:w-fit sm:m-auto'>
              <h5 className="my-4 text-neutral-100">Categories</h5>
              <ul className='p-0 m-0'>
                {tags.slice(0, tags.length - 1).map((cat: any) => {
                  return <li key={cat.slug} className='my-3'>
                    <a className='text-neutral-400 hover:text-inherit no-underline' href={`/research/all/${cat.slug}`}>{cat.name}</a>
                  </li>
                })}

              </ul>
            </div>
          </Col>
          <Col xs={6} sm={6} md={4}>
            <div className='text-start sm:w-fit sm:m-auto'>
              <h5 className="my-4 text-neutral-100">Quick Links</h5>
              <ul className='p-0 m-0'>
                {
                  quickLinks.map(link => {
                    return <li key={link.name} className='my-3'>
                      <a className='text-neutral-400 hover:text-inherit no-underline' href={link.path}>{link.name}</a>
                    </li>
                  })
                }
              </ul>
            </div>
          </Col>

        </Row>
        <hr className='my-4 md:my-5' />
        <Row>
          <Col xs={12} md={6} className='text-start'>
            <span className='text-neutral-400'>@ {moment().format("yyyy")} www.m6labs.co. All rights reserved</span>
          </Col>
          <Col xs={12} md={6}>
            <div className='block flex justify-end items-center sm:mt-3 md:mt-0'>
              {/* <span className='mr-3 text-neutral-400'>Social Media :</span> */}
              <span className='flex items-center block'>
                {
                  socialLinks.map(social => {
                    return <a className='mx-2 text-neutral-400 hover:text-inherit no-underline' key={social.name} href={social.link} target='_blank'>{social.icon}</a>
                  })
                }
              </span>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer