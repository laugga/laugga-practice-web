import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "../assets/laugga-practice.svg";

import { header, headerLink, headerLogo } from "./header.module.css"

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <header className={header}>
          <p>header</p>
          <Link className={headerLink} to="/">
            <Logo className={headerLogo} />
            <title id="title">laugga practice</title>
          </Link>
        </header>
      </>
    )
  }

}

Header.propTypes = {
  page: PropTypes.string,
}

Header.defaultProps = {
  page: ``,
}

export default Header
