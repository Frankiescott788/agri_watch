import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Image,
  Input,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";

const Signin = () => {
  const {
    setFirstName,
    setEmail,
    setLastName,
    setPassword,
    setOrganizationName,
    setPhoneNumber,
    isLoading,
    setLocation,
    sign_up,
    sign_in,
  } = useAuth();
  return (
    <section className="px-10">
      <div className="absolute top-0 mt-5">
        <Image src={Logo} alt="logo" className="w-[10rem]" />
        <Breadcrumbs>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>
            {" "}
            <span className="text-[#70e000] font-bold my-2">Sign in</span>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-5">
          <div className="mt-[17rem]">
            <div className="mt-[12rem] absolute top-0">
              <p className="text-2xl  ">
                Welcome Back, Please{" "}
                <span className="text-[#70e000]">Sign in</span>{" "}
              </p>
              <p className="text-gray-400 text-sm"> Log in to access your dashboard</p>
            </div>

            <Input
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              className="my-2"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center pt-3 pb-1">
              {!isLoading && (
                <Button
                  className="px-[10rem] bg-[#70e000] text-white shadowed-btn"
                  onClick={sign_in}
                >
                  Sign In
                </Button>
              )}
              {isLoading && (
                <Button className="px-[10rem] bg-[#70e000] text-white shadowed-btn">
                  Loading...
                </Button>
              )}
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#70e000] font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="col-span-7 sign-up-bg h-[94dvh] px-4 mt-4 rounded-md pt-[16rem] ms-10">
          <div className="text-center">
            <p className="text-5xl text-white">
              Your gateway to smarter food management—let's get you back to
              making an impact!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
