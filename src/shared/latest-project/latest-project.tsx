import React, { useEffect, useState } from 'react'
import "./latest-project.sass"
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getPosts } from '../../api/posts';
import moment from "moment"
import LatestContentLoader from './LatestContentLoader';
import Pagination from '../Pagination';

const totalLimit = 18

const Latestproject = ({ showAll }: { showAll?: boolean }) => {
  const location = useLocation();
  const nav = useNavigate()

  const pathname = location.pathname;
  const [lastestPosts, setLastestPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)

  const isNews = pathname.includes("/news")
  const element = document.getElementById("latest-project-id");

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage, showAll])

  const fetchPosts = (currentPage: number) => {
    setLoader(true)
    if(showAll) element?.scrollIntoView({ behavior: "smooth" });
    getPosts({ type: isNews ? "news" : "research", limit: showAll ? totalLimit : 9, skip: showAll ? currentPage * totalLimit : 0 }).then(posts => {
      setLoader(false)
      setLastestPosts(posts.data || [])
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
        <section id="latest-project-id" className='latest-project-sec mt-5'>
          <Container>
            <div className='latest-project-bg'>
              <div className='d-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
                {isNews ?
                  <h2 className='heading-2 color-white'>Latest News</h2> :
                  <h2 className='heading-2 font-color-white'>Latest Research</h2>
                }

                {showAll ? null : <div>
                  <button className='view-button-white' onClick={() => nav(`/${isNews ? "news" : "research"}/latest`)}>View All</button>
                </div>}
              </div>
              <Row>
                {loader && <LatestContentLoader />}
                {!loader && lastestPosts && lastestPosts?.map((item: any, i: any) => {
                  const tagsArr = item.tags && item.tags.split(",") || []
                  return (
                    <Col lg={4} className='mb-4' key={i} onClick={() => nav(`/post/${item.slug}`)}>
                      <div className="latest-card latest-card-bg" role="button">
                        <div className="d-flex justify-content-between">
                          <div className='d-flex hide-scrollbar'>
                            {
                              tagsArr.map((tag: string, i: number) => <button key={i} className='button-small mx-1'>{tag}</button>)
                            }
                          </div>
                        </div>
                        <h6 className='heading-6 color-white'>{item.title}</h6>
                        <div className="d-flex by-date align-items-center mt-3">
                          <p className='by-them paragraph-smaller'>by <span className='bold-subhead'>{item.author}</span></p>
                          <div className='mx-3'>|</div>
                          <p className='article-date paragraph-smaller bold-subhead'>{item.publishDate && moment(item.publishDate).format("MMM DD, yyyy") || "-"}</p>
                        </div>
                      </div>
                    </Col>
                  )
                }
                )}
              </Row>
              {showAll && <Pagination
                theme="light"
                page={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Latestproject