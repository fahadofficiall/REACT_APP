import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home/Home";
import PropertyListing from "./Components/PropertyListing/PropertyListing";
import CreatePropertyListing from "./Components/PropertyListing/CreatePropertyListing";
import SellerDashboard from "./Components/PropertyListing/SellerDashboard";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {path:"/", element:<Home />},
            {path:"/PropertyListing", element:<PropertyListing />},
            {path:"/CreatePropertyListing", element:<CreatePropertyListing source="create"/>},
            {path:"/SellerDashboard", element:<SellerDashboard />},
        ]
    }

])