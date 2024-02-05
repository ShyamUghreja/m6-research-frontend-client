import React, { useEffect, useState } from 'react'
import "./trending-cmp.sass"
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import Post, { IPost } from '../post-card/Post';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';

const totalLimit = 20

const TrendingCmp = ({ showAll }: { showAll?: boolean }) => {
  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;
  const [trendingPosts, setTrendingPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)

  const isNews = pathname.includes("/news")
  const element = document.getElementById("trending-cmp-id");

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage, showAll])

  const fetchPosts = (currentPage: number) => {
    setLoader(true)
    if (showAll) element?.scrollIntoView({ behavior: "smooth" });
    getPosts({
      type: isNews ? "news" : "research",
      limit: showAll ? totalLimit : 4,
      skip: showAll ? currentPage * totalLimit : 0,
      trending: true
    }).then(posts => {
      setLoader(false)
      setTrendingPosts(posts.data || [])
      setTotal(posts.total || 0)
    }).catch(err => {
      setLoader(false)
    })
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)

  return (
    <>
      <div>
        <section id="trending-cmp-id" className='research-card-sec mt-lg-5 mt-3'>
          <Container>
            <div className='d-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
              {isNews ?
                <h2 className='heading-2 font-color-black'>Trending News</h2> :
                <h2 className='heading-2 font-color-black'>Trending Research</h2>
              }
              {showAll ? null : <div>
                <button className='view-button' onClick={() => nav(`/${isNews ? "news" : "research"}/trending`)} >View All</button>
              </div>}
            </div>
            <Row>
              {loader && <PostContentLoader />}
              {!loader && trendingPosts.length ? trendingPosts.map((item: any, index: number) => (
                <Post
                  key={index}
                  slug={item.slug}
                  title={item.title}
                  subTitle={item.subTitle}
                  author={item.author}
                  tags={item.tags}
                  thumbnailUrl={item.thumbnailUrl}
                  publishDate={item.publishDate}
                />
              )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
            </Row>
          </Container>
          {showAll && <Pagination
            theme="light"
            page={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />}
        </section>
      </div>
    </>
  )
}

export default TrendingCmp