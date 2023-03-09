// sampath is the good coder
import "./App.css";
import Home from "./pages/Home";
import Restaurant from "./components/ResList/Restaurant";
import { Routes, Route } from "react-router-dom";
import RestaurantIntake from "./components/AddRestaurant/RestaurantIntake";
import SectionIntake from "./components/AddRestaurant/SectionIntake";
import MenuIntake from "./components/AddRestaurant/MenuIntake";
import TimingsIntake from "./components/AddRestaurant/TimingsIntake";
import Signup from "./components/Registration/Signup";
import Login from "./components/Registration/Login";
import Navbar from "./components/NavBar/NavBar";
import LocationSelector from "./components/AddRestaurant/LocationSelector";
import Blog from "./components/Blogs/Blog";
import Booking from "./components/ResList/Booking";
import Profile from "./components/CustomerModule/Profile";
import BookingSummary from "./components/CustomerModule/BookingSummary";
import PhotoUploader from "./components/AddRestaurant/PhotoUploader";
import Reviews from "./components/Reviews/Reviews";
import ReviewIntake from "./components/Reviews/ReviewIntake";
import CateringIntake from "./components/Caterings/CateringIntake";
import BookCatering from "./components/Caterings/BookCatering";
import ProfilePage from "./components/CustomerModule/ProfilePage";
import MenuCategory from "./components/Menu/MenuCategory";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Restaurants/:id" element={<Restaurant />} />
        <Route exact path="/RestaurantIntake" element={<RestaurantIntake />} />
        <Route exact path="/SectionIntake" element={<SectionIntake />} />
        <Route exact path="/MenuIntake" element={<MenuIntake />} />
        <Route exact path="/TimingsIntake" element={<TimingsIntake />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Blogs" element={<Blog />} />
        <Route exact path="/Booking" element={<Booking />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/LocationSelector" element={<LocationSelector />} />
        <Route exact path="/BookingSummary" element={<BookingSummary />} />
        <Route exact path="/PhotoUploader" element={<PhotoUploader />} />
        <Route exact path="/Reviews" element={<Reviews />} />
        <Route exact path="/ReviewIntake" element={<ReviewIntake />} />
        <Route exact path="/CateringIntake" element={<CateringIntake />} />
        <Route exact path="/BookCatering" element={<BookCatering />} />
        <Route exact path="/ProfilePage" element={<ProfilePage />} />
        <Route exact path="/MenuCategory" element={<MenuCategory />} />
      </Routes>
    </div>
  );
}

export default App;
