import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { LoginPage } from "./Login";
import { SignUpPage } from "./SignUp";
import { AllConversations } from "./AllConversations";
import { ConversationPage } from "./ConversationPage"

export const App = () => {
  return (
      <Router>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/conversations" element={<AllConversations />} />
          <Route path="/conversation" element={<ConversationPage />} />
          </Routes>
      </Router>
  )
}
