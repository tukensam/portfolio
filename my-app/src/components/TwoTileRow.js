import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './TwoTileRow.css';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil'
import Row from 'react-bootstrap/Row';

import Tile from './Tile';

function TwoTileRow(props) {  
  const { id1, id2, title1, title2, desc1, desc2, start_width1, start_width2, content1, content2, icon1, isTransitioning, setIsTransitioning, openTile, setOpenTile, tileToClose, setTileToClose } = props

  const [width1, setWidth1] = useState(start_width1)
  const [class1, setClass1] = useState('closed')
  const [vis1, setVis1] = useState('hidden')

  const [width2, setWidth2] = useState(start_width2)
  const [class2, setClass2] = useState('closed')
  const [vis2, setVis2] = useState('hidden')

  const [ready, setReady] = useState('ready')
  
  const closedHeight = '250px'

  useEffect(() => {
    if (!isTransitioning) {
      setReady('ready')
    } else {
      setReady('')
    }
  }, [isTransitioning])

  /* adds event listeners on load */
  useEffect(() => {
    document.getElementById(id1).addEventListener("transitionend", myEndFunction);
    document.getElementById(id2).addEventListener("transitionend", myEndFunction2);
    window.addEventListener("resize", onResize);
  }, [])

  /* add comment to code */
  useEffect(() => {
    if (tileToClose == id1) {
      window.innerWidth < 768 ? handleClickActual3() : handleClickActual()
    } else if (tileToClose == id2) {
      window.innerWidth < 768 ? handleClickActual4() : handleClick2Actual()
    }
    setTileToClose('')
  }, [tileToClose])

  const onResize = () => {
    const element1 = document.getElementById(id1)
    const element2 = document.getElementById(id2)
    const classes = element1.classList
    const classes2 = element2.classList
    if (classes.contains('open')) {
      document.documentElement.style.setProperty('--open-height', '');
      document.documentElement.style.setProperty('--open-height', element1.scrollHeight + 'px');
    } else if (classes2.contains('open')) {
      document.documentElement.style.setProperty('--open-height', '');
      document.documentElement.style.setProperty('--open-height', element2.scrollHeight + 'px');

    }
  }

  const myEndFunction = () => {
    const element1 = document.getElementById(id1)
    const element2 = document.getElementById(id2)
    let classes = document.getElementById(id1).classList
    const classes2 = document.getElementById(id2).classList
    if (window.innerWidth < 768) {
      setIsTransitioning(false)
      setOpenTile('no-tile')
    } else {
      if (classes.contains('closed')) {
        setIsTransitioning(false)
        setOpenTile('no-tile')
      } else if (classes.contains('expanded')) {
        if (classes2.contains('opening-hidden')) {
          classes2.remove('d-none');
          setClass2('open')
          setVis2('visible')
          element2.style.height = "0px"; 
          setTimeout(() => {
            requestAnimationFrame(function() {
              element2.style.height = element2.scrollHeight + 'px'; 
            })
          }, 0)
          setTimeout(() => {
            requestAnimationFrame(() => {
              document.documentElement.style.setProperty('--open-height', element2.scrollHeight + 'px');
            })
          }, 0)
          setTimeout(() => {
            element2.style.height=''
          }, 100)
        }
      } else if (classes.contains('opening')) {
        element1.style.height = closedHeight; 
        setTimeout(() => {
          requestAnimationFrame(function() {
            element1.style.height = element1.scrollHeight + 'px'; 
          })
        }, 0)
        setVis1('visible')
        setTimeout(() => {
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--open-height', element1.scrollHeight + 'px');
          })
        }, 0)
        setTimeout(() => {
          element1.style.height=''
        }, 100)
        setClass1('open')
        classes = document.getElementById(id1).classList
        if (classes2.contains('opening-hidden')) {
          classes2.remove('d-none');
          setClass2('expanded')
        }
      } else if (classes.contains('open')) {
        // do nothing
        setIsTransitioning(false)
      } else if (classes.contains('closing')) {
        setClass1('closed')
        setWidth1(start_width1)
      }
    }
  }

  const myEndFunction2 = () => {
    const classes = document.getElementById(id2).classList
    breakme: if (classes.contains('closed')) {
      // setIsTransitioning(false)
      if (window.innerWidth < 768) {
        setIsTransitioning(false)
      }
    } else if (classes.contains('opening-hidden')) {
      break breakme;
    } else if (classes.contains('opening-hidden-fade')) {
      setClass2('opening-hidden d-none')
    } else if (classes.contains('open')) {
      setIsTransitioning(false)
    } else if (classes.contains('closing-hidden')) {
      setClass2('closed')
      setWidth1(start_width1)
    } else if (classes.contains('expanded')) {
      // setIsTransitioning(false)
    }
  } 

  // leftmost tile
  const handleClick = () => {
    if (!isTransitioning) {
      if (!(openTile == '' || openTile == id1 || openTile == id2)) {
        setTileToClose(openTile)
      }
      if (window.innerWidth < 768) {
        handleClickActual3()
      } else {
        handleClickActual()
      }
      setTimeout(() => {
        const el = document.getElementById(id1)
        if (el.classList.contains('open')) {
          window.scrollTo({top: el.getBoundingClientRect().top + window.pageYOffset - 100})  
        }
      }, 500) 
    }
    // const element1 = document.getElementById(id1)
    // const element2 = document.getElementById(id2)
    // if (!isTransitioning || tileToClose == id1) {
    //   switch(class1) {
    //     case 'closed':
    //       setIsTransitioning(true)
    //       setClass1('opening')
    //       setWidth1(12)
    //       setOpenTile(id1)
    //       // second tile
    //       setClass2('opening-hidden-fade')
    //       break;
    //     case 'opening':
    //       setClass1('closed')
    //       setWidth1(start_width1)
    //       // second tile
    //       if (class2 == 'opening-hidden-fade') {
    //         setClass2('closed')
    //       } else {
    //         // this timeout is also essentially a hacky fix
    //         // just gives the transition time to start collapsing the first
    //         // block so that the 
    //         setClass2('closing-hidden')
    //         setTimeout(() => {
    //           setClass2('closed')
    //         }, 100)
    //       }
    //       break;
    //     case 'open':
    //       /*
    //         *** EDGE CASE ***
    //         changing from opening to closing but getting stuck on closing
    //         slight timeout (10ms) fixed it
    //         */
    //       // setTimeout(() => {
    //       //   element1.style.height = "";
    //       //   element2.style.height = "";   
    //       //   setClass1('closing')
    //       //   setVis1('hidden')
    //       //   // second tile
    //       //   setClass2('closing-hidden')
    //       // }, 10)
    //       element1.style.height = "";
    //       element2.style.height = ""; 
    //       setIsTransitioning(true)  
    //       setClass1('closing')
    //       setVis1('hidden')
    //       // second tile
    //       setClass2('closing-hidden')
    //       break;
    //     case 'closing':
    //       setClass1('closed')
    //       setWidth1(start_width1) 
    //       // second tile
    //       setClass2('closing-hidden')
    //       break;
    //     case 'expanded':
    //       setIsTransitioning(true)
    //       // requestAnimationFrame(function() {
    //       //   element1.style.height = element1.scrollHeight + 'px'; 
    //       // })
    //       setVis1('visible')
    //       requestAnimationFrame(() => {
    //         document.documentElement.style.setProperty('--open-height', element1.scrollHeight + 'px');
    //       })
    //       setClass1('open')
    //       setWidth1(12)
    //       setOpenTile(id1)
    //       // second tile
    //       setClass2('expanded')
    //       setVis2('hidden')
    //       // element2.style.height = "250px";
    //       break;
    //   }
    // }
  }

  const handleClickActual = () => {
    const element1 = document.getElementById(id1)
    const element2 = document.getElementById(id2)
    switch(class1) {
      case 'closed':
        setIsTransitioning(true)
        setClass1('opening')
        setWidth1(12)
        setOpenTile(id1)
        // second tile
        setClass2('opening-hidden-fade')
        break;
      // case 'opening':
      //   setClass1('closed')
      //   setWidth1(start_width1)
      //   // second tile
      //   if (class2 == 'opening-hidden-fade') {
      //     setClass2('closed')
      //   } else {
      //     // this timeout is also essentially a hacky fix
      //     // just gives the transition time to start collapsing the first
      //     // block so that the 
      //     setClass2('closing-hidden')
      //     setTimeout(() => {
      //       setClass2('closed')
      //     }, 100)
      //   }
      //   break;
      case 'open':
        /*
          *** EDGE CASE ***
          changing from opening to closing but getting stuck on closing
          slight timeout (10ms) fixed it
          */
        // setTimeout(() => {
        //   element1.style.height = "";
        //   element2.style.height = "";   
        //   setClass1('closing')
        //   setVis1('hidden')
        //   // second tile
        //   setClass2('closing-hidden')
        // }, 10)
        element1.style.height = "";
        element2.style.height = ""; 
        setIsTransitioning(true)  
        setClass1('closing')
        setVis1('hidden')
        // second tile
        setClass2('closing-hidden')
        break;
      // case 'closing':
      //   setClass1('closed')
      //   setWidth1(start_width1) 
      //   // second tile
      //   setClass2('closing-hidden')
      //   break;
      case 'expanded':
        setIsTransitioning(true)
        // requestAnimationFrame(function() {
        //   element1.style.height = element1.scrollHeight + 'px'; 
        // })
        setVis1('visible')
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--open-height', element1.scrollHeight + 'px');
        })
        setClass1('open')
        setWidth1(12)
        setOpenTile(id1)
        // second tile
        setClass2('expanded')
        setVis2('hidden')
        // element2.style.height = "250px";
        break;
    }
  }

  const handleClickActual3 = () => {
    const element1 = document.getElementById(id1)
    const element2 = document.getElementById(id2)
    switch(class1) {
      case 'expanded':
      case 'closed':
        setIsTransitioning(true)
        setOpenTile(id1)
        setWidth1(12)
        element1.style.height = closedHeight; 
        setTimeout(() => {
          requestAnimationFrame(function() {
            element1.style.height = element1.scrollHeight + 'px'; 
          })
        }, 0)
        setVis1('visible')
        setTimeout(() => {
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--open-height', element1.scrollHeight + 'px');
          })
        }, 0)
        setTimeout(() => {
          element1.style.height=''
        }, 100)
        setClass1('open')
        setClass2('expanded')
        setVis2('hidden')
        break;
      case 'open':
        setIsTransitioning(true) 
        setClass1('closed')
        setVis1('hidden')
        setWidth1(start_width1)
        setClass2('closed')
        setVis2('hidden')
        // second tile
        break;
    }
  }

  const handleClickActual4 = () => {
    const element1 = document.getElementById(id1)
    const element2 = document.getElementById(id2)
    switch(class2) {
      case 'expanded':
      case 'closed':
        setIsTransitioning(true)
        setOpenTile(id2)
        setWidth1(12)
        element2.style.height = "250px"; 
        setTimeout(() => {
          requestAnimationFrame(function() {
            element2.style.height = element2.scrollHeight + 'px'; 
          })
        }, 0)
        setVis2('visible')
        setTimeout(() => {
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--open-height', element2.scrollHeight + 'px');
          })
        }, 0)
        setTimeout(() => {
          element2.style.height=''
        }, 100)
        setClass2('open')
        setClass1('expanded')
        setVis1('hidden')
        break;
      case 'open': 
        setIsTransitioning(true)
        setWidth1(start_width1) 
        setClass1('closed')
        setVis1('hidden')
        setClass2('closed')
        setVis2('hidden')
        // second tile
        break;
    }
  }

  // second tile
  const handleClick2 = () => {
    if (!isTransitioning) {
      if (!(openTile == '' || openTile == id1 || openTile == id2)) {
        setTileToClose(openTile)
      }
      if (window.innerWidth < 768) {
        handleClickActual4()
      } else {
        handleClick2Actual()
      }
      setTimeout(() => {
        const el = document.getElementById(id2)
        if (el.classList.contains('open')) {
          window.scrollTo({top: el.getBoundingClientRect().top + window.pageYOffset - 100})  
        }
      }, 500)
    }
  }

  const handleClick2Actual = () => {
    const element1 = document.getElementById(id1)
      const element2 = document.getElementById(id2)
      switch(class2) {
        case 'closed':
          setIsTransitioning(true)
          setOpenTile(id2)
          // rightmost tile
          setClass2('opening-hidden-fade')
          setWidth1(12)
          // leftmost tile
          setClass1('expanded')
          break;
        // case 'opening-hidden-fade':
        //   setClass2('closed')
        //   setWidth1(start_width1)
        //   // leftmost tile
        //   setClass1('closed')
        //   break;
        // case 'opening-hidden d-none':
        //   setClass2('closed')
        //   setWidth1(start_width1)
        //   // leftmost tile
        //   setClass1('closed')
        //   break;
        case 'open':
          element1.style.height = "";
          element2.style.height = "";
          setIsTransitioning(true)  
          setClass2('closing-hidden')
          setVis2('hidden')
          // leftmost tile
          setClass1('closed')
          break;
        // case 'closing':
        //   setClass2('closed')
        //   setWidth1(start_width1) 
        //   // leftmost tile
        //   setClass1('closed')       
        //   break;
        case 'expanded':
          setIsTransitioning(true)
          // requestAnimationFrame(function() {
          //   element2.style.height = element2.scrollHeight + 'px'
          // })
          setVis2('visible')
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--open-height', element2.scrollHeight + 'px');
            // element2.style.height = element2.scrollHeight + 'px'
          })
          setClass2('open')
          setOpenTile(id2)
          // first tile
          setClass1('expanded')
          setVis1('hidden')
          // element1.style.height = '250px';
          break;
      }
  }

  return (
  <Row>
    <Tile id={id1} width={width1} addedClass={class1 + ' ' + ready} contentVis={vis1} handleClick={handleClick} title={title1} desc={desc1} content={content1} icon={icon1}></Tile>
    <Tile id={id2} width={width2} addedClass={class2 + ' ' + ready} contentVis={vis2} handleClick={handleClick2} title={title2} desc={desc2} content={content2}></Tile>
  </Row>
  );
}

TwoTileRow.propTypes = {
  id1: PropTypes.string.isRequired,
  id2: PropTypes.string.isRequired,
  title1: PropTypes.string,
  title2: PropTypes.string,
  desc1: PropTypes.string,
  desc2: PropTypes.string,
  start_width1: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  start_width2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  isTransitioning: PropTypes.bool.isRequired,
  setIsTransitioning: PropTypes.func.isRequired,
  openTile: PropTypes.string.isRequired,
  setOpenTile: PropTypes.func.isRequired,
  tileToClose: PropTypes.string.isRequired,
  setTileToClose: PropTypes.func.isRequired,
  content1: PropTypes.any,
  content2: PropTypes.any,
  icon1: PropTypes.string
};

export default TwoTileRow;