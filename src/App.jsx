import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Header from '@components/layout/Header.jsx';
import Footer from '@components/layout/Footer.jsx';
import routes from '@routes/routes.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';

// eslint-disable-next-line react/prop-types
const PublicLayout = ({ children }) => (
  <Fragment>
    <Header />
    <div className="container">{children}</div>
    <Footer />
  </Fragment>
);

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, isProtected, allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth.login);

  // Nếu route yêu cầu bảo vệ
  if (isProtected) {
    // Nếu không có user (chưa đăng nhập), điều hướng về login
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    // Nếu có user nhưng vai trò không được phép truy cập
    // eslint-disable-next-line react/prop-types
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      // Nếu là admin nhưng truy cập route của user, hoặc ngược lại
      if (currentUser.role === 'Admin') {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {routes.map(({ path, page: Page, children, isProtected, allowedRoles, isPublic }, index) => {
        // Route cho admin (có children)
        if (path === '/admin') {
          return (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute isProtected={isProtected} allowedRoles={allowedRoles}>
                  <Page />
                </ProtectedRoute>
              }
            >
              {children &&
                children.map(({ path: subPath, page: SubPage }, subIndex) => (
                  <Route
                    key={subIndex}
                    path={subPath}
                    element={
                      <ProtectedRoute isProtected={isProtected} allowedRoles={allowedRoles}>
                        <SubPage />
                      </ProtectedRoute>
                    }
                  />
                ))}
            </Route>
          );
        }

        // Các route khác (public hoặc user)
        return (
          <Route
            key={index}
            path={path}
            element={
              <ProtectedRoute isProtected={isProtected} allowedRoles={allowedRoles}>
                {isPublic ? (
                  <Page />
                ) : (
                  <PublicLayout>
                    <Page />
                  </PublicLayout>
                )}
              </ProtectedRoute>
            }
          />
        );
      })}
    </Routes>
  );
};

export default App;
