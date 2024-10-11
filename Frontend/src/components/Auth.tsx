import { Link, useNavigate } from 'react-router-dom';
import { InputComponent } from "../components/InputComponent";
import { Quote } from "../components/Quote";
import { SignupInput } from '@miravanisri/medium-common';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

// Regular expression for validating email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
        errors.push("At least 8 characters");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("At least one lowercase character");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase character");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("At least one numeric character");
}
    if (!/[!@#?]/.test(password)) {
        errors.push("At least one special character, e.g., ! @ # ?");
    }

    return errors;
};

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    // Error states for each input field
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | string[] | null>(null);

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    // Client-side validation
    const validateInputs = (): boolean => {
        let valid = true;
        // Clear previous errors
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);

        // Name validation (for signup only)
        if (type === 'signup' && !postInputs.name) {
            setNameError("Name is required");
            valid = false;
        }

        // Email validation
        if (!postInputs.username) {
            setEmailError("Email is required");
            valid = false;
        } else if (!emailRegex.test(postInputs.username)) {
            setEmailError("Invalid email format");
            valid = false;
        }

        // Password validation
        if (!postInputs.password) {
            setPasswordError("Password is required");
            valid = false;
        } else if (type === 'signup') {
            const passwordErrors = validatePassword(postInputs.password);
            if (passwordErrors.length > 0) {
                setPasswordError(passwordErrors);
                valid = false;
            }
        }

        return valid;
    };

    // Submit form to backend
    async function sendRequest() {
        if (!validateInputs()) return; // Run client-side validation first

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`, postInputs);
            console.log(response.data)
            const jwt = response.data;

            console.log(jwt);
            localStorage.setItem("token", "bearer " + jwt.token);
            navigate("/blogs");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data) {
               
                const { message } = error.response.data;
                console.log(message)


                // Backend validation for sign-in errors
                if (error.response.status === 404) {
                    setEmailError("Email not found");
                } else if (error.response.status === 401) {
                    setPasswordError("Incorrect password");
                } else {
                    setEmailError("An error occurred. Please try again.");
                }
            } else {
                setEmailError("Network error. Please check your connection.");
            }
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-screen flex flex-col justify-center items-center mt-16">
                    <div className="mb-6">
                        <p className="text-3xl font-bold mb-2">
                            {type === 'signup' ? "Create an account" : "Sign in"}
                        </p>
                        <p className="text-slate-600 text-sm ml-4">
                            {type === 'signup' ? "Already have an account?" : "Don't have an account?"}
                            <Link to={type === 'signin' ? "/Signup" : "/Signin"} className="underline">
                                {type === 'signin' ? "Signup" : "Signin"}
                            </Link>
                        </p>
                    </div>

                    {type === 'signup' && (
                        <>
                            <InputComponent label={"Name"} placeholder={"Enter your name"} onChange={(e) => { setPostInputs((c) => ({ ...c, name: e.target.value })) }} />
                            {/* Display name error below the input */}
                            {nameError && <p className="text-red-800 text-sm mt-1">{nameError}</p>}
                        </>
                    )}

                    <InputComponent label={"Email"} placeholder={"m@example.com"} onChange={(e) => { setPostInputs((c) => ({ ...c, username: e.target.value })) }} />
                    {/* Display email error below the input */}
                    {emailError && <p className="text-red-800 text-sm mt-1">{emailError}</p>}

                    <InputComponent label={"Password"} placeholder={""} type1={"password"} onChange={(e) => { setPostInputs((c) => ({ ...c, password: e.target.value })) }} />
                    {/* Display password error below the input */}
                    {passwordError && Array.isArray(passwordError) ? (
                        <ul className="text-red-800 text-sm mt-1 list-disc list-inside">
                            {passwordError.map((line, idx) => (
                                <li key={idx}>{line}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red-800 text-sm mt-1">{passwordError}</p>
                    )}

                    <button onClick={sendRequest} type='button' className="border rounded-md w-96 p-2 h-10 bg-black text-white font-semibold">
                        {type === 'signup' ? "Sign up" : "Sign in"}
                    </button>
                </div>

                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>
        </>
    );
};
