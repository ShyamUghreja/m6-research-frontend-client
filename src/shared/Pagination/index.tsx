import './style.sass'
import ReactPaginate from 'react-paginate';

const iconStyles = {
  fontSize: 25,
  marginBottom: 7,
  display: 'block',
  fontWeight: 500,
  color: '#ffffff'
}

const PreviousLabel = <span style={iconStyles}>{"<"}</span>
const NextLabel = <span style={iconStyles}>{">"}</span>

interface IPagination {
  page: number
  onPageChange: any
  totalPages: number
  theme?: 'light' | 'dark'
}

export default function Pagination(props: IPagination) {
  const { page, onPageChange, totalPages, theme = 'dark' } = props
  if (totalPages <= 1) {
    return null
  }
  return (
    <div className={`custom-pagination ${theme === "light" ? "light-theme" : "dark-theme"}`}>
      <ReactPaginate
        pageCount={Number(totalPages)}
        previousLabel={PreviousLabel}
        nextLabel={NextLabel}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        forcePage={page}
      />
    </div>
  )
}
