import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Cocktail from "./pages/Cocktail";
import NewsLetter from "./pages/NewsLetter";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import { loader as landingLoader } from "./pages/Landing"
import { loader as singleCocktailLoader } from "./pages/Cocktail"
import SinglePageError from "./pages/SinglePageError";
import { action as newsletterAction } from "./pages/NewsLetter"
import { queryClient } from "./queryClient";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
                errorElement:<SinglePageError />,
                loader: landingLoader(queryClient)
            },
            {
                path: "cocktail/:id",
                errorElement:<SinglePageError />,
                loader:singleCocktailLoader(queryClient),
                element: <Cocktail />
            },
            {   
                path: "newsletter",
                element: <NewsLetter />,
                action: newsletterAction
            },
            {
                path: "about",
                element: <About />
            },
           
        ]
    }
], {
  future: {
    v7_startTransition: true,
  },
})
export default router