import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import CreateChannelModal from "./pages/CreateChannelModal";
import { getToken } from "./api";

// App is the main component that controls which page is shown
// We use a simple state variable called "currentPage" instead of a router
function App() {
  // If a token is already saved (page reload), skip straight to chat
  const [currentPage, setCurrentPage] = useState(getToken() ? "chat" : "landing");
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  // This function is passed to child components so they can change pages
  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Show the correct page based on currentPage value */}
      {currentPage === "landing" && <LandingPage navigate={navigate} />}
      {currentPage === "login" && <LoginPage navigate={navigate} />}
      {currentPage === "register" && <RegisterPage navigate={navigate} />}
      {currentPage === "chat" && (
        <ChatPage
          navigate={navigate}
          openCreateChannel={() => setShowCreateChannel(true)}
        />
      )}
      {currentPage === "settings" && <SettingsPage navigate={navigate} />}

      {/* The create channel modal can appear on top of the chat page */}
      {showCreateChannel && (
        <CreateChannelModal onClose={() => setShowCreateChannel(false)} />
      )}
    </div>
  );
}

export default App;
