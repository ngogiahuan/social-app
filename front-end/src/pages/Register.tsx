import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
    userName: "",
    fullName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
};

const genderOptions = [
    {
        label: "Male",
        value: "male",
    },
    {
        label: "Female",
        value: "female",
    },
    {
        label: "Others",
        value: "others",
    },
];

const Register = () => {
    const formik = useFormik({
        initialValues,
        validationSchema: yup.object({
            userName: yup
                .string()
                .required("User name is required")
                .min(6, " must be at least 6 characters"),
            fullName: yup.string().required("Full name is required"),
            gender: yup.string().required(" Required"),
            email: yup
                .string()
                .email("Email is invalid")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
                .min(8, " must be at least 8 characters"),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref("password")], "Passwords must match"),
            agree: yup.boolean().oneOf([true], "You must agree to the terms"),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className="bg-gray-100 w-screen min-h-screen flex justify-center items-center">
            <Card className="w-[450px] shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="userName"
                                className="font-semibold flex items-center gap-4"
                            >
                                User name
                                <div>
                                    {formik.errors.userName ? (
                                        <div className="text-red-500 text-sm italic">
                                            {formik.errors.userName}
                                        </div>
                                    ) : null}
                                </div>
                            </label>
                            <Input
                                type="text"
                                id="userName"
                                name="userName"
                                placeholder="Ex. ngogiahuan123"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            <div className="space-y-2 col-span-3">
                                <label
                                    htmlFor="fullName"
                                    className="font-semibold flex items-center gap-4"
                                >
                                    Full name
                                    <div>
                                        {formik.errors.fullName ? (
                                            <div className="text-red-500 text-sm italic">
                                                {formik.errors.fullName}
                                            </div>
                                        ) : null}
                                    </div>
                                </label>
                                <Input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Ex. Ngo Gia Huan"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label
                                    htmlFor="fruit"
                                    className="font-semibold flex items-center gap-4"
                                >
                                    Gender
                                    <div>
                                        {formik.errors.gender ? (
                                            <div className="text-red-500 text-sm italic">
                                                {formik.errors.gender}
                                            </div>
                                        ) : null}
                                    </div>
                                </label>
                                <Select
                                    name="gender"
                                    value={formik.values.gender}
                                    onValueChange={(value) =>
                                        formik.setFieldValue("gender", value)
                                    }
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {genderOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="font-semibold flex items-center gap-4"
                            >
                                Email
                                <div>
                                    {formik.errors.email ? (
                                        <div className="text-red-500 text-sm italic">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>
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
                                <div>
                                    {formik.errors.confirmPassword || formik.errors.password ? (
                                        <div className="text-red-500 text-sm italic">
                                            {formik.errors.password || formik.errors.confirmPassword}
                                        </div>
                                    ) : null}
                                </div>
                            </label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="agree"
                                name="agree"
                                checked={formik.values.agree}
                                onChange={formik.handleChange}
                                className=" peer h-4 w-4 border-gray-300 border border-2 rounded-sm text-primary focus:ring-primary checked:bg-primary transition-all duration-200 ease-in-out checked:border-transparent "
                            />
                            <div>
                                <label
                                    htmlFor="agree"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 select-none"
                                >
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-blue-500">
                                        terms and conditions
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={!formik.isValid}
                            >
                                Register
                            </Button>
                        </div>
                        <div>
                            Already has account?{" "}
                            <Link to="/login" className="text-blue-500">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
