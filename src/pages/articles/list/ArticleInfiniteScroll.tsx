import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Article } from "src/types";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "src/utils/userContext";

type Props = {
  articleList: Article[] | undefined;
};

export default function ArticleInfiniteScroll({ articleList }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const pageSize = 6;
  const { isAuthenticated } = useAuth0();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newArticles = articleList!.slice(startIndex, endIndex);
    setCurrentArticles((prevArticles) => [...prevArticles, ...newArticles]);
  }, [currentPage, articleList]);

  useEffect(() => {
    setCurrentArticles(articleList!.slice(0, pageSize));
  }, [articleList]);

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-1">
      {currentArticles.map((article) => (
        <li key={article.id}>
          <div className="dark:border-cod-gray-900 max-w-full rounded-lg p-4 shadow dark:border">
            <div className="p-5">
              <div className="flex items-center justify-start">
                <h2 className="mb-2 inline-block text-2xl font-bold tracking-tight">
                  {article.title}
                </h2>
                {(isAuthenticated || userContext?.isPreview) && (
                  <Link
                    to={`/articles/edit/${article.id}`}
                    aria-label={`Edit post #${article.id}`}
                  >
                    <i className="fas fa-pencil-alt -translate-y-1 px-2 hover:scale-110"></i>
                  </Link>
                )}
              </div>
              <p className="mb-3 font-normal  text-opacity-70">
                {article.description}
              </p>
              <Link to={`/articles/${article.id}`}>
                <Button
                  variant="gradient"
                  tabIndex={-1}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-light-blue-400 to-blue-500 dark:from-light-blue-500 dark:to-blue-800"
                >
                  Read More{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
