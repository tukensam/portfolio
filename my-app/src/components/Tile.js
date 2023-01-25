import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from'./Tile.module.css';
import PropTypes from 'prop-types';

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useRecoilState} from 'recoil';

import { isLightModeState } from './../Atoms/atoms';

function Tile(props) {
  const { id, width, addedClass, contentVis, handleClick, title, desc, content, icon } = props

  const [isLightMode, setIsLightMode] = useRecoilState(isLightModeState)

  return (
    <Col id={id} className={`${id} ${isLightMode ? '' : `${styles.dark_theme}`} ${styles.tile} ${addedClass}`} md={width} onClick={handleClick}>
      <Row className={styles.body}>
        <Col className={styles.preview_text} xs={''}>
          <div className={styles.wrapper}>
            {icon && <img className={isLightMode ? styles.icon : styles.dark_icon} src={icon}></img>}
            <h3 className={styles.preview_title}>{title}</h3>
          </div>
          <h4 className={styles.preview_description}>{desc}</h4>
        </Col>
        <Row>
          <Col xs={12}>
            <div className={contentVis}>
              {content}
            </div>
          </Col>
        </Row>
      </Row>
    </Col>
  )
}

Tile.propTypes = {
  id: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  addedClass: PropTypes.string,
  contentVis: PropTypes.string,
  handleClick: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.string,
  content: PropTypes.any,
  icon: PropTypes.string
};

export default Tile;