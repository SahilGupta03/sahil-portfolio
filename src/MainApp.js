import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error fetching routes:', err));
  }, []);

  return (
    <div className="MainApp">
      <Router>
        {/* Router is placed here as the top-level router */}
        <NavBarWithRouter />
        <main className="main">
          <Suspense fallback={<FallbackSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {data &&
                data.sections.map((route) => {
                  const SectionComponent = React.lazy(() =>
                    import(`./components/${route.component}`)
                  );

                  return (
                    <Route
                      key={route.headerTitle}
                      path={route.path}
                      element={<SectionComponent header={route.headerTitle} />}
                    />
                  );
                })}
            </Routes>
          </Suspense>
        </main>
      </Router>
    </div>
  );
}

export default MainApp;
