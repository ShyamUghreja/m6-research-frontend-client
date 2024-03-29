import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import moment from "moment"
import "./post.sass"
import { useNavigate } from 'react-router-dom'

export interface IPost {
  slug: string,
  title: string,
  subTitle: string,
  author: string,
  tags: string,
  thumbnailUrl: string,
  publishDate: string
}

function Post(props: IPost) {
  const { slug, title, subTitle, author, tags, thumbnailUrl, publishDate } = props
  const tagsArr = tags && tags.split(",") || []
  const nav = useNavigate()

  return (
    <Col lg={3} md={6} xs={12} role="button" onClick={() => nav(`/post/${slug}`)}>
      <div className="crypto-card-container">
        <div className="card-image">
          <img src={thumbnailUrl} alt="" className='img-fluid' />
        </div>
        <div className="card-content">
          <div className="content-heading">
            <div className='d-flex justify-end gap-1 flex-wrap'>
              {
                tagsArr.map((tag, i) => <button key={i} className='button-small'>{tag}</button>)
              }
            </div>
          </div>
          <hr className='m-0'/>
          <p className='mt-2 mb-2 medium-p heading'>{title}</p>
          <p className='paragraph-disc discription'>{subTitle}</p>
          <div className="by-date">
            <p className='by-them paragraph-smaller'>by <span className='bold-subhead'>{author}</span></p>
            <p className='article-date paragraph-smaller bold-subhead'>{publishDate && moment(publishDate).format("MMM DD, yyyy") || "-"}</p>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default Post