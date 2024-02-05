import React, { useEffect, useState } from 'react'
import "./industry-reports.sass"
import { Col, Container, Row } from 'react-bootstrap'
import Report from '../../assets/report-img.svg';
import { getPdfs } from '../../api/posts';
import { Document, Page, pdfjs } from 'react-pdf'
import PdfModal from './PdfModal';
import Pagination from '../Pagination';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

// import PDFViewer from 'pdf-viewer-reactjs'

const reportData = [
  {
    id: 1,
    image: Report
  },
  {
    id: 2,
    image: Report
  },
  {
    id: 3,
    image: Report
  },
]

const Industryreports = () => {

  const [reports, setReports] = useState<any>([])
  const [loader, setLoader] = useState(false)
  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false)




  useEffect(() => {
    setLoader(true)
    getPdfs().then(data => {
      setLoader(false)
      setReports(data)
    }).catch(err => {
      setLoader(false)
    })
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }

  const onPageChange = (e: any) => {
    setPageNumber(e.selected + 1)
  }

  return (
    <>
      <div className='industry-reports-sec'>
        <section className='mt-lg-5 mt-3'>
          <Container>
            <div className='report-bg'>
              <Row className='justify-center'>
                <Col lg={12}>
                  <div className='text-center'>
                    <h2 className='heading-2 color-white'>Industry Reports</h2>
                  </div>
                </Col>
                {reports && reports.map((item: any, i: number) => (
                  <Col lg={4} key={i}>
                    <div className='reportImg text-center overflow-hidden'>
                      <Document file={item.path}>
                        <Page className="pdf-rendered-page" pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} onClick={() => setOpenModal(prev => !prev)} />
                      </Document>

                    </div>
                    <div className='text-center'>
                      <button className='downloadbtn mt-lg-4 mt-3' onClick={() => window.open(item.path)}><i className="ri-download-cloud-2-line me-2"></i>Download</button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </section>
      <PdfModal isOpen={openModal} toggle={() => setOpenModal(prev => !prev)}>
        <>
          <div className='border-2 border-neutral-900' style={{ width: "100%" }}>
            <Document file={reports && reports[0] && reports[0].path || ''} onLoadSuccess={onDocumentLoadSuccess}>
              <Page className="pdf-rendered-page" pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} />
            </Document>
          </div>
          <div style={{ display: " flex", justifyContent: "center" }}>
            <Pagination
              page={pageNumber - 1}
              totalPages={numPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      </PdfModal >
      </div>
    </>
  )
}

export default Industryreports