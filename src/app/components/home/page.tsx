"use client";

import { useState } from "react";
import { useLoginChecker } from "../../../lib/loginChecker";

import Header from "../../components/header";
import LoginForm from "../../components/loginForm"


export default function Main() {

    const { user, loading } = useLoginChecker();

    return (
        <div className="flex flex-col min-h-screen">
            {user ? (<Header />) : (<LoginForm />)}
        </div>
    );
}