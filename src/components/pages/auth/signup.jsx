import { BreadcrumbItem, Breadcrumbs, Button, Image, Input } from "@nextui-org/react"
import { Link } from "react-router-dom"
import Logo from './../../../assets/logo.png'
import useAuth from "../../../hooks/useAuth"

const Signup = () => {
    const { setFirstName, setEmail, setLastName, setPassword, setOrganizationName, setPhoneNumber, isLoading, setLocation, sign_up } = useAuth();
    return (
        <section className="px-10">
            <div className="absolute top-0 mt-5">
               <Image src={Logo} alt="logo" className="w-[10rem]" />
               <p className="text-2xl mt-5">Create an <span className="text-[#70e000]">Account</span> </p>
            </div>
            <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-5">
                    <div className="mt-[8rem]">
                        <Input label="First Name" onChange={e => setFirstName(e.target.value)}/>
                        <Input label="Last Name" className="my-2" onChange={e => setLastName(e.target.value)}/>
                        <Input label="Email" type="email" onChange={e => setEmail(e.target.value)}/>
                        <Input label="Password" type="password" className="my-2" onChange={e => setPassword(e.target.value)}/>
                        <Input label="Organization Name" onChange={e => setOrganizationName(e.target.value)}/>
                        <Input label="Phone Number" type="tel" className="my-2" onChange={e => setPhoneNumber(e.target.value)}/>
                        <Input label="Location" onChange={e => setLocation(e.target.value)}/>
                        <div className="flex justify-center pt-3 pb-1">
                            { !isLoading && <Button className="px-[10rem] bg-[#70e000] text-white shadowed-btn" onClick={sign_up}>Sign Up</Button>}
                            { isLoading && <Button className="px-[10rem] bg-[#70e000] text-white shadowed-btn">Loading...</Button>}
                        </div>
                        <p className="text-center">Already have an account? <Link to="/signin" className="text-[#70e000] font-bold">Sign in</Link></p>
                    </div>
                </div>
                <div className="col-span-7 sign-up-bg h-[94dvh] px-4 mt-4 rounded-md pt-[16rem] ms-10">
                    <div className="text-center">
                        <p className="text-5xl text-white">Join us in building a more secure future for food and agriculture.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup