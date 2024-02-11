import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const formik = useFormik({
        initialValues,
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Email is invalid")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
                .min(8, "Password is must be at least 8 characters"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className="bg-gray-100 w-screen min-h-screen flex justify-center items-center">
            <Card className="w-[400px] shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="font-semibold flex items-center gap-4"
                            >
                                Email
                                {formik.errors.email ? (
                                    <div className="text-red-500 text-sm italic">
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ex. ngogiahuan123@gmail.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="font-semibold flex items-center gap-4"
                            >
                                Password
                                {formik.errors.password ? (
                                    <div className="text-red-500 text-sm italic">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="flex items-center space-x-2 ">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className=" peer h-4 w-4 border-gray-300 border border-2 rounded-sm text-primary focus:ring-primary checked:bg-primary transition-all duration-200 ease-in-out checked:border-transparent "
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        <div>
                            Need an account?{" "}
                            <Link to="/register" className="text-blue-500">
                                Register
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
