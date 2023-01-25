import React, { useEffect, useState } from 'react';
import { useRecoilState} from 'recoil';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import TwoTileRow from './components/TwoTileRow';

import { isLightModeState } from './Atoms/atoms';

/* TO-DO
  4. change background (doodles?)
  6. replace the three state vars here with global state vars? (broke it, so look into later)
  10. should clicking home close the open tile? (does it matter?)
  */

function App() {
  /* these three vars are passed to each of the rows of tiles in order to globally
     manage state */
  // might be good to replace these with global states like in 1951v
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [openTile, setOpenTile] = useState('')
  const [tileToClose, setTileToClose] = useState('')

  // const ids = ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5', 'tile-6']
  const ids = ['tile-1', 'tile-2', 'tile-3', 'tile-4']

  const [isLightMode, setIsLightMode] = useRecoilState(isLightModeState)

  const check = (id) => {
    const classes = document.getElementById(id).classList
    if (classes.contains('opening') || classes.contains('open')) {
      setOpenTile(id)
    }
  }

  const salutations = ['Hello!', 'Howdy!', 'Guten Tag!', 'Wie läuft\'s?', 'Hi there!']

  const getSalutation = () => {
    let newSalutation
    do {
      newSalutation = salutations[Math.floor(Math.random() * salutations.length)]
      console.log(newSalutation)
    }
    while(newSalutation == salutation)
    setSalutation(newSalutation)
  }

  const [salutation, setSalutation] = useState('')

    // randomize greeting
    useEffect(() => {
      setSalutation(salutations[Math.floor(Math.random() * salutations.length)])
    }, [])

  const [tool, setTool] = useState('hammer')

  const changeTool = () => {
    const tools = ['hammer', 'screwdriver', 'wrench']
    return tools[Math.floor(Math.random() * tools.length)]
      // if (constructors.indexOf(constructor) === constructors.length - 1) {
      //   setConstructor(constructors[0])
      // } else {
      //   setConstructor(constructors[constructors.indexOf(constructor) + 1])
      // }
  }

  useEffect(() => {
    ids.forEach((id) => check(id))
  }, [openTile]) // could run this on isTransitioning

  const content1 = 
  <>
    <h4 className='content-subheading'>An Introduction</h4>
    <p className='content-text'>
      This remains my favorites project from my UI/UX class and one of my favorite
      projects during my time at Brown. Each student had to take an existing website 
      and redesign it with usability and accessibility in mind. I wanted to do 
      something personal, so I picked the home page of an Italian restaurant from my town. 
      The home page was a Goldilocks site: broken enough that there were plenty of things
      I could fix and improve upon but coherent enough that I could conceive of an
      overall theme. Some sites I found were so scuffed that I didn&#39;t know where
      to begin. The redesigned page had to work on mobile, tablet, and desktop, and it was 
      important to maintain a cohesive design across the different screen sizes. 
      This would prove more difficult than I had first thought.
    </p>
    <figure>
      <img className='image' src={require('./assets/tile-1/webpage-original.png')}></img>
      <figcaption><i>Fig. 1a: the original home page</i></figcaption>
    </figure>
    <h4 className='content-subheading'>An Overview</h4>
    <p className='content-text'>
      After looking over the web page—clicking buttons, resizing the window, following links—I found numerous usability issues I could fix. 
      Some of the most egregious to me were two separate buttons for the same online ordering functionality, 
      the at least five different fonts used, and the four different button designs. All of these were potential sources of confusion I wanted to remedy. 
      There were also accessibility concerns, chief among them low contrast between certain pieces of text and their backgrounds and bad alt text. 
      After identifying all of these issues, I moved into the drafting phase. Again, I had to consider three distinct 
      screen sizes and the possible differences in layout for each—mobile, tablet, and desktop. I first made wireframes
      for each to hash out the general layout. With a general idea of what elements I wanted to include, I went ahead 
      creating a style guide so that my design would be cohesive. With an overall theme achieved, I used my style guide 
      and my wireframes to design high-fidelity prototypes in Figma. Each prototype was the intended look of the final 
      project. I then used the prototypes as reference to code the web page (shown below).
    </p>
    <figure>
      <img className='image' src={require('./assets/tile-1/style-guide.png')}></img>
      <figcaption><i>Fig. 1b: the style guide</i></figcaption>
    </figure>
    <figure>
      <img className='image' src={require('./assets/tile-1/webpage-prototype.png')}></img>
      <figcaption><i>Fig. 1c: hi-fi prototype for home page</i></figcaption>
    </figure>
    <figure>
      <img className='image' src={require('./assets/tile-1/webpage-redesigned.png')}></img>
      <figcaption><i>Fig. 1d: the redesigned home page</i></figcaption>
    </figure>
    <h4 className='content-subheading'>An Introspection</h4>
    <p className='content-text'>
      I am extremely proud of how my redesigned website came out, even now. This was my first true attempt at coding a 
      site from the ground up. It was helpful to redesign a web page instead of creating one from scratch, both because 
      the original web page gave me a jumping off point and because I was able to see what mistakes people make. I am 
      happy that I was able to work my way out of each problem I encountered; I never had to compromise my initial design 
      in any fundamental way. This project, and the class overall, sparked an interest in website design in me!
    </p>
  </>

  const content2 = 
  <>
    <h4 className='content-subheading'>An Introduction</h4>
    <p className='content-text'>
      DLNA (a not-all-that clever portmanteau of DL and DLNA) was the final project 
      of a deep learning course I took at Brown. There was group interest in tackling 
      a problem related to computational biology, so we chose to improve upon a 
      published paper that classified viral DNA sequences. Feed the model a portion
      of a DNA sequence, and it would return a classification as one of the
      viruses in the dataset. The project was an opportunity for us to navigate 
      the entire the machine learning pipeline as well as present our findings 
      to our classmates in a conference-like setting.
    </p>
    <h4 className='content-subheading'>An Overview</h4>
    <p className='content-text'>
      For the project, I collected over 40,000 DNA samples across six different viruses.
      The authors did not include their dataset with the paper. They did, however,
      state the public database wherefrom they compiled their database. Hence, 
      I followed a similar process to generate a similar dataset for our model. 
      We then preprocessed the DNA samples. This step consumed the vast majority
      of our time, a rude reminder that data prep often takes a lot of time to do
      right. We designed a convolutional neural net (CNN) as well as two baseline models for comparison. 
      The model comprised two convolutional layers, two pooling layers, and three dense layers (as shown below).
    </p>
    <figure>
      <img className='graphic' src={require('./assets/tile-2/cnn-diagram.png')}></img>
      <figcaption><i>Fig. 2a: diagram of the layers in our CNN model</i></figcaption>
    </figure>
    <p className='content-text'>
      One baseline model used just length to make its predictions, and the other used guanine-cytosine content, 
      which measures the proportion of guanine and cytosine to all of the DNA bases in a given sequence. 
      Our CNN model greatly outperformed our baseline models. Our model also performed slightly better than the model 
      in the paper, but again, our data was not exactly the same as those in the paper. Therefore, any comparison is 
      merely speculative. Having run our models, we bundled together our findings, our methodology, and more into a 
      written report and an academic poster, the latter of which we presented in a conference-style setting on campus 
      with other classmates! I took charge on writing and laying out the report and the poster.
    </p>
    <figure>
      <img className='graphic' src={require('./assets/tile-2/models-test-acc.svg').default}></img>
      <figcaption><i>Fig. 2b: test accuracies of the four models</i></figcaption>
    </figure>
    <h4 className='content-subheading'>An Introspection</h4>
    <p className='content-text'>
      One important lesson from this project (and it really is also a life lesson) is that simpler is sometimes better! 
      While the CNN performed better overall, for certain viruses, the baseline models were just as good. 
      The project was also a unique opportunity in my coursework to tackle a problem in its entirety, from start to finish. 
      Often a project for a class has you pick up somewhere in the middle, whereas here we started from the very beginning. 
      This was more challenging, but also more rewarding!
    </p>
    <figure>
      <img className='graphic' src={require('./assets/tile-2/models-test-acc-per.svg').default}></img>
      <figcaption><i>Fig. 2c: test accuracies per virus for our three models</i></figcaption>
    </figure>
  </>

  const content3 = 
  <>
    <h4 className='content-subheading'>An Introduction</h4>
    <p className='content-text'>
      HyperClef is a hypertext/hypermedia system for creating, sharing, and archiving musical compositions in all their forms. 
      The idea was to create a central repository for all things music. A band member could share the sheet music she is working on
      with her bandmates as well as share a recording of her playing what she has so far. Meanwhile, fans could be working together
      to write down the lyrics to a song, linking to live performances to point out differences and such. This was a project I and two
      groupmates worked on in the last final weeks of the class (and of my time at Brown). HyperClef built upon the rudimentary
      hypermedia system we all had been working on throughout the course, which was an experimental class in the history
      of hypertext/hypermedia. The name of the class really sums it up well: &#34;Hypertext/Hypermedia: The Web Was Not the Beginning and the Web Is Not the End.&#34;
      A funky and relatively new class taught by two behemoths in the field of hypermedia (Andy van Dam and Norm Meyrowitz) that I&#39;m glad 
      fit in my schedule.
    </p>
    <figure>
      <img className='image' src={require('./assets/tile-3/dashboard.png')}></img>
      <figcaption><i>Fig. 3a: HyperClef dashboard</i></figcaption>
    </figure>
    <h4 className='content-subheading'>An Overview</h4>
    <p className='content-text'>
      We knew from the outset that we wanted to do something about music. We considered allowing users to upload short song clips through
      our hypermedia system to OpenAI&#39;s Jukebox model and get back the generated samples. However, we had to nix that idea once we 
      realized how long the neural net took before it spit out the new samples. Instead we went with an equally fun idea to include
      sheet music as a potential node in our system, alongside text, audio, video, and image nodes. 
    </p>
    <figure>
      <img className='image' src={require('./assets/tile-3/node-video.png')}></img>
      <figcaption><i>Fig. 3b: HyperClef node view: video node</i></figcaption>
    </figure>
    <p className='content-text'>
      We decided to embed Flat&#39;s music score
      system in our system. The bulk of my work involved the integration of the embedded score editor into our hypermedia system.
      I tackled the early steps of adding the basic editor to our system and then how to upload scores in their different formats, how
      to save them to our database such that they were retrievable, how to reflect changes to the scores in real time, and more. 
    </p>
    <figure>
      <img className='image' src={require('./assets/tile-3/node-sheet.png')}></img>
      <figcaption><i>Fig. 3c: HyperClef node view: sheet music node</i></figcaption>
    </figure>
    <p className='content-text'>
      Another teammate
      tackled access rights, and I and the third teammate worked on linking to notes in a score. Here I considered the different roles a user 
      might embody when attempting to link and developed three distinct ways wherein a user could to a note or group of notes. Finally,
      I styled the user interface somewhat, including doodling a little mascot for our system (pictured above).
    </p>
    <figure>
      <img className='image' src={require('./assets/tile-3/node-sheet-extent.png')}></img>
      <figcaption><i>Fig. 3d: HyperClef node view: selecting extent in sheet music node</i></figcaption>
    </figure>
    <figure>
      <img className='image' src={require('./assets/tile-3/node-sheet-link.png')}></img>
      <figcaption><i>Fig. 3e: HyperClef node view: linking in sheet music node</i></figcaption>
    </figure>
    <h4 className='content-subheading'>An Introspection</h4>
    <p className='content-text'>
      I&#39;m very happy with how HyperClef turned out! We encountered many problems related to incorporating a third-party
      element into our hypermedia system, but we took each one in stride and found a solution every time. In this project (and
      the class at large), I was a full-stack developer (working both on the front-end and the back-end).
    </p>
  </>

  const content4 = 
  <>
    <h4 className='content-subheading'>Education</h4>
    <p className='content-text'>
      <b>Brown University, Providence, RI, US</b>—Dec. 2022
      <br></br>
      Computer Science (B.S.)
      <ul>
        <li>GPA: 3.9/4.0; major GPA: 4.0/4.0</li>
        <li>2019 winner of Wunderbar Together Visual Arts/Writing Competition</li>
        <li>Brown University Mahjong Club e-board member; organized Fall 2021 & 2022 tournaments</li>
      </ul>
    </p>
    <h4 className='content-subheading'>Skills & Interests</h4>
    <p className='content-text'>
      <ul>
        <li>C#, CSS, Gherkin, HTML, JavaScript, Python, React, regex, SQL, TypeScript</li>
        <li>German (conversational)</li>
        <li>Board games, cooking, playing banjo, reading, and weightlifting</li>
      </ul>
    </p>
    <h4 className='content-subheading'>Publications</h4>
    <p className='content-text'>
      <ul>
        <li>“Data Science Fellow Spotlight,” <i>Data Science Initiative</i>—Mar. 2022</li>
        <li>“Data Science Fellows in Action,” <i>Data Science Initiative</i>—Jan. 2022</li>
        <li>“Data Science Fellows help create language learning tool,” <i>Data Science Initiative</i>—Oct. 2021</li>
      </ul>
    </p>
    <h4 className='content-subheading'>Professional Experience</h4>
    <p className='content-text'>
      <b>Software Engineering Intern</b>—May–Aug. 2022
      <br></br>
      Blackbaud, Charleston, SC, United States
      <ul>
        <li>Wrote automated test suites for flagship software</li>
        <li>Worked according to SCRUM and behavior-driven development frameworks</li>
      </ul>
      <b>Teaching Assistant</b>—Sep. 2021–May 2022
      <br></br>
      Brown University, Providence, RI, United States
      <ul>
        <li>In Fall 2021, for Data Science Fellows; in Spring 2022, for Principles of Economics</li>
        <li>Writer for Data Science Initiative at Brown University</li>
      </ul>
      <b>Virtual Summer Camp Leader</b>—June–Aug. 2021
      <br></br>
      Inspirit AI, Palo Alto, CA, United States
      <ul>
        <li>Taught camps about artificial intelligence and machine learning to cohorts of middle schoolers</li>
      </ul>
      <b>Virtual Summer Camp Leader</b>—May–Aug. 2021
      <br></br>
      Ivy Camps USA, Aspen, CO, United States
      <ul>
        <li>Taught camps on topics ranging from science to architecture to K-12 students</li>
      </ul>
      <b>SPRINT Award Virtual Intern</b>—June–Aug. 2020
      <br></br>
      Brown University, Providence, RI, United States
      <ul>
        <li>Worked with a professor in the Data Science Initiative at Brown University to revise
      course materials using funding from the University</li>
      </ul>
      <b>Data Science Fellow</b>—Jan.–Aug. 2020
      <br></br>
      Brown University, Providence, RI, United States
      <ul>
        <li>Worked to create a searchable catalog of texts for university’s German department</li>
        <li>Initial funding provided through an experimental class offered by Brown University</li>
        <li>Secured additional funding to continue work with a focus on teaching tool creation</li>
      </ul>
      <b>Community Advisor</b>—Aug. 2019–May 2020
      <br></br>
      Brown University Office of Residential Life, Providence, RI, United States
      <ul>
        <li>Residential peer leader/resident advisor for a sophomore dormitory housing Brown and RISD students</li>
        <li>University delegate at the 2019 Rhode Island Resident Assistant Leadership Conference</li>
      </ul>
    </p>
  </>

  const path = `./assets/${isLightMode ? 'light-theme' : 'dark-theme'}`

  return (
      <div className={`App${isLightMode  ? '' : ' dark-theme'}`}>
        <Navbar className="custom-nav-bar" fixed="top">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={require(path + '/smile.svg')}
                width="50"
                height="50"
                className="d-inline-block align-center brand-logo"
              />{' '}
              <div className='custom-navbar-brand'>Home</div>
            </Navbar.Brand>
            <Navbar.Brand className='navbar-right clickable' onClick={(() => setIsLightMode(!isLightMode))}>
              <div className='custom-navbar-brand'>{isLightMode ? 'Light mode ' : 'Dark mode '}</div>
              <img
                alt=""
                src={require(path + '/lightbulb.svg')}
                width="50"
                height="50"
                className="d-inline-block align-center light-mode-icon"
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container id='home' className='body'>
          <Row>
            <Col className='header-col tile-col'>
              <Row className='header-body'>
                <Col xs={12} md={4}>
                <img className='doodle' src={require(path + '/goober.svg')}></img>
                </Col>
                <Col className='header-body-text' xs={12} md={8}>
                  <h1 className='greeting clickable' onClick={getSalutation}>{salutation}</h1>
                  <h2>I&#39;m Sam Murk Caya, a former software engineering intern at Blackbaud and a recent alum from Brown University who
                    studied AI/ML and design! When I&#39;m not coding, you can find me 
                    cooking, playing banjo, and writing letters on my typewriter!
                  </h2>
                  <div className='social-container'>
                    <a href="https://www.linkedin.com/in/samuel-murk-caya/" target="_blank" rel="noreferrer"><img className='social' src={require(path + '/linkedin.svg')}></img></a>
                    <a href="https://github.com/tukensam" target="_blank" rel="noreferrer"><img className='social' src={require(path + '/github.svg')}></img></a>
                  </div>
                  <h2>
                    Feel free to explore below to see what I&#39;ve been up to!
                  </h2>
                </Col>
              </Row>
              <Row className='header-body'>
                <h1 className='subheader'>Languages</h1>
                <h2>C#, CSS, German, Gherkin, HTML, JS, Python, SQL, TypeScript </h2>
              </Row>
            </Col>
          </Row>

          <TwoTileRow id={'row-1'} id1={'tile-1'} id2={'tile-2'} title1={'Responsive Redesign'} title2={'DLNA'} desc1={'I redesign the home page of an Italian restaurant from my hometown...'} desc2={'A final project using deep learning to identify viral DNA...'} start_width1={8} start_width2={''} content1={content1} content2={content2} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} openTile={openTile} setOpenTile={(id) => setOpenTile(id)} tileToClose={tileToClose} setTileToClose={(id) => setTileToClose(id)}></TwoTileRow>
          <TwoTileRow id={'row-2'} id1={'tile-3'} id2={'tile-4'} title1={'HyperClef'} title2={'Resume'} desc1={'I build a collobarative temporal hypertext system...'} desc2={"Get right to the meat and potatoes of who I am, where I've been, and what I've done over the years..."} start_width1={6} start_width2={''} content1={content3} content2={content4} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} openTile={openTile} setOpenTile={(id) => setOpenTile(id)} tileToClose={tileToClose} setTileToClose={(id) => setTileToClose(id)} icon1={require(path + '/conductor.svg')}></TwoTileRow>
          {/* <TwoTileRow id={'row-3'} id1={'tile-5'} id2={'tile-6'} title1={'Placeholder'} title2={'Placeholder'} desc1={'A placeholder...'} desc2={'A placeholder...'} intro1={''} intro2={''} start_width1={7} start_width2={''} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} openTile={openTile} setOpenTile={(id) => setOpenTile(id)} tileToClose={tileToClose} setTileToClose={(id) => setTileToClose(id)}></TwoTileRow> */}
          
          <Row>
            <Col className='tile-col'>
              <Row className='header-body'>
                <Col className='header-body-text-2' xs={12} md={8}>
                  <h2>This site is under active construction! I am still making tweaks and adding projects, 
                    so check back every now and then to see what&#39;s new!
                  </h2>
                </Col>
                <Col xs={12} md={4} >
                  <div className='doodle-container'>
                    <img className='doodle-2' src={require(path + `/constructor-hammer.svg`)}></img>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <footer>
          <p>Made with &hearts;, React-Bootstrap, HTML, JS, and CSS, but mostly &hearts;.</p>
        </footer>
      </div>
  );
}

export default App;
