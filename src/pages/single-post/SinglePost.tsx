import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getNextPost, getPostById } from '../../api/posts'
import Arrow from '../../assets/Arrow.svg';
import ContentLoader from 'react-content-loader';
import { Col } from 'react-bootstrap';
import './single-post.sass'

function getScrollPercent() {
  var h: any = document.documentElement,
    b: any = document.body,
    st: any = "scrollTop",
    sh: any = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

function SinglePost() {

  const params = useParams()
  const nav = useNavigate()
  const [loader, setLoader] = useState(false)
  const slug = params.slug as string

  const nextPostLoaderRef = useRef(false)
  const excludeSlugRef = useRef('')
  const categorySlugRef = useRef('')
  const typeRef = useRef('')

  useEffect(() => {
    if (slug) {
      setLoader(true)
      nextPostLoaderRef.current = true
      getPostById(slug).then(data => {
        window.scrollTo(0, 0)
        setLoader(false)
        nextPostLoaderRef.current = false
        const elm = document.getElementById("single-post-id")
        if (elm) {
          elm.innerHTML = data.content || ''
          excludeSlugRef.current = data.slug || ''
          categorySlugRef.current = data.tags.split(",").filter((item: string) => {
            if (item === "research" || item === "news") {
              typeRef.current = item
              return false
            } else return true
          }).join(",")
        }
      }).catch(err => {
        setLoader(false)
      })
    }
    window.addEventListener("scroll", onHandleScroll)
    return () => {
      window.removeEventListener("scroll", onHandleScroll)
    }
  }, [slug])

  const onHandleScroll = () => {
    if (!nextPostLoaderRef.current && getScrollPercent() > 90) {
      nextPostLoaderRef.current = true
      getNextPostBy()
    }
  }

  const getNextPostBy = () => {
    setLoader(prev => !prev)
    getNextPost({
      type: typeRef.current,
      tag: categorySlugRef.current,
      exclude: excludeSlugRef.current
    }).then(data => {
      console.log(data, "data")
      setLoader(prev => !prev)
      const nextDiv = document.createElement("div");
      const divider = document.createElement("hr");
      divider.style.maxWidth = "1320px"
      divider.style.marginLeft = "auto"
      divider.style.marginRight = "auto"
      const postContainerElm = document.getElementById("news-post-container")
      if (Object.keys(data).length && postContainerElm) {
        nextPostLoaderRef.current = false
        nextDiv.innerHTML = data.content || ''
        excludeSlugRef.current = excludeSlugRef.current + "," + data.slug
        postContainerElm?.appendChild(divider);
        postContainerElm?.appendChild(nextDiv);
      } else {
        window.removeEventListener("scroll", onHandleScroll)
      }
    }).catch(ex => setLoader(prev => !prev))
  }

  if ((window as any)?.twttr!) {
    (window as any).twttr?.widgets?.load()
  }

  const contentLoader = () => {
    return <>
      <Col xs={12}>
        <ContentLoader height={630} width="100%">
          <rect x="0" y="30" rx="5" ry="5" width="100%" height="30px" />
          <rect x="0" y="80" rx="5" ry="5" width="100%" height="30px" />
          <rect x="0" y="150" rx="5" ry="5" width="60%" height="20px" />
          <circle cx="30" cy="250" r="24" />
          <rect x="60" y="235" rx="5" ry="5" width="80px" height="10px" />
          <rect x="60" y="255" rx="5" ry="5" width="80px" height="10px" />
          <circle cx="80%" cy="255" r="16" />
          <circle cx="88%" cy="255" r="16" />
          <circle cx="96%" cy="255" r="16" />
          <rect x="0" y="400" rx="5" ry="5" width="60%" height="14px" />
          <rect x="0" y="420" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="440" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="460" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="480" rx="5" ry="5" width="20%" height="14px" />
          <rect x="0" y="540" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="560" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="580" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="600" rx="5" ry="5" width="60%" height="14px" />
        </ContentLoader>
      </Col>
    </>
  }

  return (
    <div className='single-post-container'>
      <div role='button' className='max-w-2xl mt-6 mb-2 mx-auto'>
        <img
          style={{ background: "#d4d4d4", padding: "10px" }}
          src={Arrow}
          alt=""
          onClick={() => nav(-1)}
        />
      </div>
      <div id="news-post-container">
        <div id="single-post-id" />
      </div>
      {loader && <div className='max-w-2xl mx-auto'>
        {contentLoader()}
      </div>}
    </div>
  )
}

export default SinglePost