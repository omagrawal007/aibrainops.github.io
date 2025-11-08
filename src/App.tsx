import { Routes, Route } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/layouts/Layout';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import NotFoundPage from '@/pages/NotFoundPage';
import '@/styles/main.scss';

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
