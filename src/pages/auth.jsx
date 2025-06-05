import { useState } from "react";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Button from "../components/common/button";

export default function Auth() {
  const [isTryingtologin, setisTryingtologin] = useState(true);

  return (
    <>
      <div className="w-screen h-screen bg-fuchsia-700 flex justify-around items-center">
        {isTryingtologin ? (
          <>
            <Login />
            <Button
              onClick={() => setisTryingtologin(false)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              type="button"
            >
              New to the app? Register
            </Button>
          </>
        ) : (
          <>
            <Register />
            <Button
              onClick={() => setisTryingtologin(true)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              type="button"
            >
              Already have an account? Login
            </Button>
          </>
        )}
      </div>
    </>
  );
}
