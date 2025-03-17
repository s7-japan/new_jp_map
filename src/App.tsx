import Footer from "./components/Footer";
import Header from "./components/Header";
import Direction from "./components/Direction";
import Map from "./components/Map";
import EventCalendar from "./components/EventCalendar";
import { BrowserRouter, Routes, Route } from "react-router";
import Event from "./components/Event";
import BackToMap from "./components/BackToMap";
import EventMapHeader from "./components/EventMapHeader";
const App = () => {
  return (
    <div className="h-[100dvh] w-[100dvw] overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-white">
                <Header />
                <Direction />
                <Map />
                <EventCalendar />
              </div>
            }
          />
          <Route
            path="/event"
            element={
              <>
                <EventMapHeader />
                <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100">
                  <Event />
                </div>
                <BackToMap />
              </>
            }
          />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
