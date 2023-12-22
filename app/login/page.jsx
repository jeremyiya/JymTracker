import "@styles/account.css";
import Form from "./form.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();

  if(session) {
    redirect('/');
  }
  return <Form />;
};

export default Login;
