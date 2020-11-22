import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import styles from './scss/Pagination.module.scss'

type Props = {
  total: number
}

const PAGE_STEP = 1

export function Pagination({ total }: Props) {
  const { search, getSearchUrl } = useSearch()

  const currentPage = useMemo(() => {
    if (typeof search.page === 'string') {
      const page = parseInt(search.page, 10 /* radix */)
      if (Number.isInteger(page)) {
        return page
      }
    }
    return PAGE_STEP
  }, [search])

  const first = getSearchUrl({ page: PAGE_STEP })
  const previous =
    currentPage > PAGE_STEP
      ? getSearchUrl({ page: currentPage - PAGE_STEP })
      : first
  const last = getSearchUrl({ page: total })
  const next =
    currentPage < total ? getSearchUrl({ page: currentPage + PAGE_STEP }) : last

  return (
    <div className={styles.pagination}>
      <div className={styles.item}>
        <Link to={first}>First</Link>
      </div>
      <div className={styles.item}>
        <Link to={previous}>Previous</Link>
      </div>
      <div className={styles.info}>{`Page ${currentPage} of ${total}`}</div>
      <div className={styles.item}>
        <Link to={next}>Next</Link>
      </div>
      <div className={styles.item}>
        <Link to={last}>Last</Link>
      </div>
    </div>
  )
}
