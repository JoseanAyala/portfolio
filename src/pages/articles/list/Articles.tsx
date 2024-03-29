import ArticleList from "./ArticleList";
import ProfileCard from "src/components/ProfileCard";
import { StickyNavbar } from "src/components/StickyNavbar";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "src/utils/userContext";
import React from "react";
function CreateButton() {
  return (
    <Link
      to={"/articles/create"}
      className="group pointer-events-auto mb-4 flex w-full flex-col items-center  justify-center rounded-full bg-blue-gray-50 from-light-blue-50 to-blue-100 px-6 py-4 transition-all ease-in-out hover:bg-gradient-to-r dark:bg-gray-900 dark:hover:from-light-blue-800 dark:hover:to-deep-purple-900 lg:items-start"
    >
      <div className="flex items-center justify-center">
        <i className="fas fa-edit mr-4 h-5 w-5 lg:ml-4"></i>
        <Typography variant="lead">Create a new article</Typography>
      </div>
    </Link>
  );
}

export default function Articles() {
  const { isAuthenticated } = useAuth0();
  const userContext = React.useContext(UserContext);
  return (
    <>
      <StickyNavbar />
      <div className="container mx-auto p-4 md:px-12 md:py-8 lg:flex lg:gap-8 lg:p-8 lg:px-24">
        <div className="mx-auto flex w-full justify-center lg:w-1/3 lg:flex-col lg:justify-between">
          <ProfileCard />
        </div>
        <div className="w-full">
          <Typography variant="h1" className="hidden">
            View all articles
          </Typography>
          {(isAuthenticated || userContext?.isPreview) && <CreateButton />}
          <ArticleList />
        </div>
      </div>
    </>
  );
}
