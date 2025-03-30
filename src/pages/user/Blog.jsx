import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {
  faHome,
  faChevronRight,
  faClock,
  faUser,
  faTag,
  faSearch,
  faSpinner,
  faArrowLeft,
  faShareAlt,
  faThumbsUp,
  faComment,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';

// Component hiển thị chi tiết blog khi xem một bài viết cụ thể
const BlogDetail = ({ generateMockArticles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Giả lập độ trễ mạng

        // Lấy tất cả bài viết để tìm bài theo ID
        const mockData = generateMockArticles('general', 1);
        const allArticles = mockData.articles;

        // Tìm bài viết theo id
        const foundArticle = allArticles.find((article) => article.id === parseInt(id));

        if (foundArticle) {
          setArticle(foundArticle);

          // Lấy các bài viết liên quan (cùng danh mục)
          const related = allArticles
            .filter((a) => a.category === foundArticle.category && a.id !== parseInt(id))
            .slice(0, 3);

          setRelatedArticles(related);
        } else {
          // Nếu không tìm thấy bài viết, quay về trang blog
          navigate('/blog');
        }
      } catch (err) {
        console.error('Error fetching article details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetail();
    }
  }, [id, generateMockArticles, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  if (loading) {
    return (
      <div className="blog">
        <div className="blog__loading">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <p>Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="blog">
        <div className="blog__error">
          <p>Không tìm thấy bài viết</p>
          <button onClick={() => navigate('/blog')}>Quay lại Blog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      {/* Breadcrumb */}
      <div className="user__breadcrumb">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Trang chủ
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" />
        <Link to="/blog">Blog</Link>
        <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" />
        <span>{article.title}</span>
      </div>

      <div className="blog-detail">
        <div className="blog-detail__content">
          <button className="blog-detail__back-btn" onClick={() => navigate('/blog')}>
            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
          </button>

          <div className="blog-detail__category">
            <FontAwesomeIcon icon={faTag} />
            <span>{article.category}</span>
          </div>

          <h1 className="blog-detail__title">{article.title}</h1>

          <div className="blog-detail__meta">
            <div className="blog-detail__author">
              <FontAwesomeIcon icon={faUser} />
              <span>{article.author}</span>
            </div>
            <div className="blog-detail__date">
              <FontAwesomeIcon icon={faClock} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          <div className="blog-detail__featured-image">
            <img src={article.urlToImage} alt={article.title} />
          </div>

          <div className="blog-detail__body">
            <p>{article.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis semper nisl, ac feugiat purus. Etiam
              tincidunt nisl id ex pulvinar, a scelerisque massa facilisis. Nullam tincidunt orci eu diam aliquet, in
              maximus ex tempus. Nulla facilisi. Mauris auctor malesuada pretium.
            </p>
            <h2>Phân tích chi tiết</h2>
            <p>
              Praesent dapibus ultrices ipsum nec lobortis. Morbi quis diam ac magna tempus volutpat. Suspendisse ut
              pharetra nunc. Phasellus sit amet est vulputate, aliquet lectus vitae, placerat nisl. Integer imperdiet
              consectetur enim at tincidunt. Proin varius interdum leo id vestibulum. Cras imperdiet est in nisi
              pellentesque, sit amet malesuada risus commodo.
            </p>
            <blockquote>
              Nulla non est quam. Nam id dui et magna blandit suscipit. Integer tempor, odio at eleifend tempus, purus
              dui dignissim nisl, vel sollicitudin purus magna quis sem.
            </blockquote>
            <p>
              Sed rutrum sagittis purus, non molestie felis placerat ac. Quisque ut justo nec nisl facilisis dapibus a
              non magna. Phasellus volutpat ultricies consectetur. Morbi feugiat iaculis eros, quis accumsan tellus
              tempus eu. Mauris et pulvinar mi, sit amet ullamcorper lorem. Suspendisse potenti.
            </p>
            <h2>Kết luận</h2>
            <p>
              Aliquam erat volutpat. Nullam pellentesque rutrum felis, in porttitor massa commodo eu. Curabitur est est,
              dapibus at mauris id, molestie malesuada purus. Nam at pellentesque eros. Vestibulum tempor massa in justo
              sollicitudin sodales. Donec magna justo, tincidunt at eros vitae, ornare condimentum metus.
            </p>
          </div>

          <div className="blog-detail__actions">
            <button className="blog-detail__action-btn">
              <FontAwesomeIcon icon={faThumbsUp} /> Thích
            </button>
            <button className="blog-detail__action-btn">
              <FontAwesomeIcon icon={faComment} /> Bình luận
            </button>
            <button className="blog-detail__action-btn">
              <FontAwesomeIcon icon={faShareAlt} /> Chia sẻ
            </button>
            <button className="blog-detail__action-btn">
              <FontAwesomeIcon icon={faBookmark} /> Lưu
            </button>
          </div>
        </div>

        <div className="blog-detail__sidebar">
          <div className="blog-detail__related">
            <h3 className="blog-detail__related-title">Bài viết liên quan</h3>
            {relatedArticles.map((article, index) => (
              <div key={index} className="blog-detail__related-item">
                <div className="blog-detail__related-image">
                  <img src={article.urlToImage} alt={article.title} />
                </div>
                <div className="blog-detail__related-content">
                  <h4>
                    <Link to={`/blog/${article.id}`}>{article.title}</Link>
                  </h4>
                  <div className="blog-detail__related-date">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

BlogDetail.propTypes = {
  generateMockArticles: PropTypes.func.isRequired,
};

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();

  // Danh sách category
  const categories = [
    { value: 'general', label: 'Tất cả' },
    { value: 'business', label: 'Kinh doanh' },
    { value: 'entertainment', label: 'Giải trí' },
    { value: 'health', label: 'Sức khỏe' },
    { value: 'science', label: 'Khoa học' },
    { value: 'sports', label: 'Thể thao' },
    { value: 'technology', label: 'Công nghệ' },
  ];

  useEffect(() => {
    if (!id) {
      fetchArticles();
    }
  }, [category, page, id]);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      // Sử dụng NewsAPI.org hoặc Gnews API
      // Lưu ý: NewsAPI chỉ miễn phí trên localhost
      // const apiKey = 'YOUR_API_KEY'; // Thay thế bằng API key của bạn
      // const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=12&apiKey=${apiKey}`;

      // Vì API key có thể cần đăng ký và có giới hạn, sử dụng mock data cho mục đích demo
      // Trong ứng dụng thực, bạn sẽ gọi API thực tế
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập độ trễ mạng

      // Mock data cho demo
      const mockData = generateMockArticles(category, page);

      setArticles(mockData.articles);
      setTotalPages(mockData.totalPages);
      setError(null);
    } catch (err) {
      setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tạo dữ liệu mẫu cho demo
  const generateMockArticles = (category, page) => {
    const articlesPerPage = 12;
    const totalItems = 50;

    const baseArticles = [
      {
        title: 'Xu hướng công nghệ mới nhất năm 2023',
        description:
          'Khám phá những công nghệ đột phá và xu hướng mới nhất trong năm 2023, từ AI đến blockchain và hơn thế nữa.',
        urlToImage:
          'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-05-10T09:15:00Z',
        author: 'Nguyễn Văn A',
        category: 'technology',
      },
      {
        title: 'Phương pháp học tập hiệu quả cho sinh viên IT',
        description:
          'Những phương pháp và chiến lược giúp sinh viên công nghệ thông tin học tập hiệu quả trong thời đại số.',
        urlToImage:
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-05-08T14:30:00Z',
        author: 'Trần Thị B',
        category: 'education',
      },
      {
        title: 'Bí quyết giữ sức khỏe cho dân văn phòng',
        description:
          'Làm thế nào để duy trì sức khỏe tốt khi phải ngồi nhiều giờ trước máy tính? Bài viết chia sẻ những bí quyết đơn giản nhưng hiệu quả.',
        urlToImage:
          'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-05-05T08:45:00Z',
        author: 'Lê Văn C',
        category: 'health',
      },
      {
        title: 'Top 10 địa điểm du lịch hàng đầu Việt Nam năm 2023',
        description:
          'Khám phá những điểm đến tuyệt vời nhất Việt Nam trong năm 2023, từ bãi biển đẹp đến những địa danh văn hóa lịch sử nổi tiếng.',
        urlToImage:
          'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-05-03T11:20:00Z',
        author: 'Phạm Thị D',
        category: 'travel',
      },
      {
        title: 'Những quy tắc đầu tư chứng khoán cho người mới bắt đầu',
        description:
          'Hướng dẫn chi tiết về cách thức bắt đầu đầu tư chứng khoán an toàn và hiệu quả cho những người mới.',
        urlToImage:
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-05-01T10:00:00Z',
        author: 'Hoàng Văn E',
        category: 'business',
      },
      {
        title: 'Cách chăm sóc cây trồng trong nhà hiệu quả',
        description:
          'Những mẹo và bí quyết giúp bạn chăm sóc cây cảnh trong nhà luôn xanh tốt và phát triển khỏe mạnh.',
        urlToImage:
          'https://images.unsplash.com/photo-1511971547031-47c724e0365c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-28T09:30:00Z',
        author: 'Nguyễn Thị F',
        category: 'lifestyle',
      },
      {
        title: 'Tổng hợp các bộ phim hay nhất 2023 đến nay',
        description:
          'Điểm qua những bộ phim đáng xem nhất đã ra mắt trong nửa đầu năm 2023, từ phim hành động đến tâm lý, tình cảm.',
        urlToImage:
          'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-25T16:45:00Z',
        author: 'Trần Văn G',
        category: 'entertainment',
      },
      {
        title: 'Những phát hiện khoa học đáng chú ý năm 2023',
        description:
          'Tổng hợp những phát hiện và tiến bộ khoa học quan trọng nhất trong năm 2023 có thể thay đổi tương lai nhân loại.',
        urlToImage:
          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-20T13:15:00Z',
        author: 'Lê Thị H',
        category: 'science',
      },
      {
        title: 'Đội tuyển Việt Nam chuẩn bị cho vòng loại World Cup',
        description:
          'Thông tin mới nhất về đội tuyển bóng đá Việt Nam và công tác chuẩn bị cho vòng loại World Cup sắp tới.',
        urlToImage:
          'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-18T08:00:00Z',
        author: 'Phạm Văn I',
        category: 'sports',
      },
      {
        title: 'Làm thế nào để bắt đầu một startup thành công?',
        description:
          'Những bước đi cụ thể và chiến lược quan trọng giúp bạn khởi nghiệp thành công trong thời đại công nghệ số.',
        urlToImage:
          'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-15T11:30:00Z',
        author: 'Hoàng Thị K',
        category: 'business',
      },
      {
        title: 'Phòng chống bệnh mùa hè hiệu quả',
        description:
          'Những biện pháp và lời khuyên giúp phòng chống các bệnh thường gặp trong mùa hè, đặc biệt là đối với trẻ nhỏ.',
        urlToImage:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-12T09:45:00Z',
        author: 'Nguyễn Văn L',
        category: 'health',
      },
      {
        title: 'Xu hướng thời trang mùa hè 2023',
        description:
          'Khám phá những xu hướng thời trang nổi bật nhất trong mùa hè 2023, từ màu sắc đến kiểu dáng và phụ kiện.',
        urlToImage:
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        publishedAt: '2023-04-10T14:20:00Z',
        author: 'Trần Thị M',
        category: 'fashion',
      },
    ];

    // Tạo thêm bài viết để có đủ dữ liệu cho phân trang
    const allArticles = [];
    for (let i = 0; i < totalItems; i++) {
      const baseArticle = baseArticles[i % baseArticles.length];
      allArticles.push({
        ...baseArticle,
        id: i + 1,
        title: `${baseArticle.title} - ${i + 1}`,
        publishedAt: new Date(new Date(baseArticle.publishedAt).getTime() - i * 86400000).toISOString(),
      });
    }

    // Lọc theo danh mục nếu cần
    const filteredArticles =
      category === 'general' ? allArticles : allArticles.filter((article) => article.category === category);

    // Phân trang
    const paginatedArticles = filteredArticles.slice((page - 1) * articlesPerPage, page * articlesPerPage);

    return {
      articles: paginatedArticles,
      totalPages: Math.ceil(filteredArticles.length / articlesPerPage),
    };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trong trường hợp thực tế, bạn sẽ gọi API với tham số tìm kiếm
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setArticles(filtered);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset về trang đầu tiên khi đổi danh mục
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Nếu có ID, hiển thị trang chi tiết bài viết
  if (id) {
    return <BlogDetail generateMockArticles={generateMockArticles} />;
  }

  return (
    <div className="blog">
      {/* Breadcrumb */}
      <div className="user__breadcrumb">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Trang chủ
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" />
        <span>Blog</span>
      </div>

      <div className="blog__header">
        <div className="blog__header-content">
          <h1 className="blog__title">Tin tức & Bài viết</h1>
          <p className="blog__subtitle">Cập nhật những tin tức mới nhất về sản phẩm, xu hướng và thị trường</p>
        </div>

        {/* Search Bar */}
        <div className="blog__search">
          <form onSubmit={handleSearch}>
            <div className="blog__search-input">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="blog__categories">
        <ul>
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                className={category === cat.value ? 'active' : ''}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Articles Grid */}
      <div className="blog__content">
        {loading ? (
          <div className="blog__loading">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p>Đang tải bài viết...</p>
          </div>
        ) : error ? (
          <div className="blog__error">
            <p>{error}</p>
            <button onClick={fetchArticles}>Thử lại</button>
          </div>
        ) : (
          <>
            <div className="blog__grid">
              {articles.map((article, index) => (
                <div key={index} className="blog__card">
                  <div className="blog__card-image">
                    <img src={article.urlToImage} alt={article.title} />
                  </div>
                  <div className="blog__card-content">
                    <div className="blog__card-category">
                      <FontAwesomeIcon icon={faTag} />
                      <span>{article.category}</span>
                    </div>
                    <h2 className="blog__card-title">{article.title}</h2>
                    <p className="blog__card-description">{article.description}</p>
                    <div className="blog__card-meta">
                      <div className="blog__card-author">
                        <FontAwesomeIcon icon={faUser} />
                        <span>{article.author}</span>
                      </div>
                      <div className="blog__card-date">
                        <FontAwesomeIcon icon={faClock} />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${article.id}`} className="blog__card-link">
                      Đọc tiếp
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="blog__pagination">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="blog__pagination-btn"
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`blog__pagination-number ${page === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="blog__pagination-btn"
              >
                Sau
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
