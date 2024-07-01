import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

// {
//     "title": "Feed List App",
//     "bodyText": "- An Android App that loads list of feeds from a **paginated** API and shows in a RecyclerView.\n - Uses the **MVVM** architecture.\n - Uses **Paging 3** library along with other Architecture Components.",
//     "links": [
//         {
//             "text": "GitHub",
//             "href": "https://github.com/mayankagarwal09/Paginated-App-Feeds-List"
//         }
//     ],
//     "tags" : [
//         "Kotlin",
//         "Android",
//         "MVVM",
//         "Paging 3",
//         "Coroutines",
//         "Flow"
//     ]
// },
// {
//     "title": "Task Tracker",
//     "bodyText": "- A simple Task Tracker web app made with **Angular 12**.\n - Uses **mock JSON server** to get, add, delete or update tasks.",
//     "links": [
//         {
//             "text": "GitHub",
//             "href": "https://github.com/mayankagarwal09/task-tracker-app"
//         }
//     ],
//     "tags" : [
//         "TypeScript",
//         "Angular 12",
//         "JavaScript"
//     ]
// },
// {
//     "title": "Image Encryption/Decryption",
//     "bodyText": "- A Web App for Image Encryption and Decryption made in **Django**.\n - Uses **SDES** algorithm for encryption/decryption.",
//     "links": [
//         {
//             "text": "GitHub",
//             "href": "https://github.com/mayankagarwal09/img-encrypt-sdes"
//         }
//     ],
//     "tags" : [
//         "Python",
//         "Django",
//         "SDES",
//         "Cryptography"
//     ]
// }
const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);
  const numberOfItems = showMore && data ? data.length : 6;
  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.projects?.slice(0, numberOfItems).map((project) => (
                  <Fade key={project.title}>
                    <ProjectCard project={project} />
                  </Fade>
                ))}
              </Row>

              {!showMore
                && (
                <Button
                  style={styles.showMoreStyle}
                  variant={theme.bsSecondaryVariant}
                  onClick={() => setShowMore(true)}
                >
                  show more
                </Button>
                )}
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
