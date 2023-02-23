import React, { useRef, useState, useEffect } from 'react'
import DarkMode from '../DarkMode'
import styles from './header.module.scss'
// import './header.module.less'
import LogoIcon from '../../../assets/img/logo/logo.png'
import classNames from 'classnames'

const Header = () => {
  const headerRef = useRef(null)

  const tabList = [
    {
      key: 'Launchpad',
      name: 'Launchpad',
      link: '/launchpad'
    },
    {
      key: 'Marketplace',
      name: 'Marketplace',
      link: '/marketplace'
    },
    {
      key: 'Stats',
      name: 'Stats',
      link: '/stats'
    },
    {
      key: 'Airdrop',
      name: 'Airdrop',
      link: '/airdrop'
    }
  ]
  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })
  const isSticky = () => {
    const header = document.querySelector('.js-header')
    const scrollTop = window.scrollY
    scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed')
    scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small')
  }

  const menuLeft = useRef(null)
  const btnToggle = useRef(null)
  const btnSearch = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const handleOnClick = index => {
    setActiveIndex(index)
  }

  return (
    <header id='header_main' className={classNames(styles.header, 'js-header')} ref={headerRef}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img className={styles.logo} src={LogoIcon} alt='' />
          <div className={styles.searchInput}>
            <img src='../../../assets/img/header/icon-search.png' alt='' />
            <input className={styles.input} type='text' placeholder='Type to search...' />
          </div>
          <div className={styles.tabList}>
            {tabList.map((item, index) => (
              <div
                key={item.key}
                className={classNames(styles.item, activeIndex === index && styles.active)}
                onClick={() => {
                  handleOnClick(index)
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <DarkMode />
      </div>
    </header>
  )
}

export default Header
