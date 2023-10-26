import { useState, useEffect } from "react";
import useClient from "src/utils/useClient";
import { Article } from "src/types";
import ArticleGrid from "./ArticleGrid";
import { Link } from "react-router-dom";
import Socials from "src/pages/home/socials";

export default function Articles() {
  const [articles, setArticles] = useState<Article[] | undefined>(undefined);
  const { get, baseUrl } = useClient();

  useEffect(() => {
    const getArticles = async () => {
      const [res, err] = await get(`${baseUrl}/articles`);
      if (err) return;
      setArticles(res as Article[]);
    };

    getArticles();
  }, []);

  return (
    <div className="p-6 md:px-12 md:py-8 lg:px-24 ">
      <div className="flex items-end justify-between">
        <h1 className="font-highlight font-white mb-4 text-5xl font-bold tracking-tight">
          Articles
        </h1>
        <div className="mb-4">
          <Link
            to="/articles/create"
            className=" rounded-md p-1 text-white transition-all hover:bg-white hover:text-black"
          >
            <i className="fas fa-plus fa-lg"></i>
          </Link>
        </div>
      </div>
      {articles && articles.length > 0 && (
        <ArticleGrid articleList={articles} />
      )}
      <div
        className="fixed bottom-0 right-6 flex items-center justify-center rounded-t-xl border border-b-0 border-grey
        bg-zinc-900 px-3 pb-3 pt-2 transition-all ease-in-out hover:bg-zinc-800"
      >
        <Socials />
      </div>
    </div>
  );
}
