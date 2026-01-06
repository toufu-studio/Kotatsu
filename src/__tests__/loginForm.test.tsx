import { expect, test, vi, afterEach, } from "vitest"
import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import LoginForm from "../app/components/loginForm";

afterEach(() => {
    cleanup();
});

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/supabase", () => ({
    supabase: {
        auth: {
            signUp: vi.fn().mockResolvedValue({
                data: null,
                error: { status: 422 }
            }),
            getUser: vi.fn().mockResolvedValue({
                data: { user: null },
                error: null
            }),
            onAuthStateChange: vi.fn(() => ({
                data: { subscription: { unsubscribe: vi.fn() } }
            })),
            signInWithPassword: vi.fn().mockResolvedValue({
                data: null,
                error: { status: 400 }
            }),
        },
    },
}));

//サインアップ関連
test("サインアップ：ユーザー名にスペースを入れた場合、エラーが発生するか", async () => {
    render(<LoginForm />)
    const userNameInput = screen.getByPlaceholderText("John_Smith");
    await act(async () => {
        fireEvent.change(userNameInput, { target: { value: "John Smith" } });
    })
    expect(screen.getByText("スペースは使用できません。")).toBeInTheDocument();
})

test("サインアップ：パスワードにスペースを入れた場合、エラーが発生するか", async () => {
    render(<LoginForm />)
    const userPasswordInput = screen.getByPlaceholderText("Password123");
    await act(async () => {
        fireEvent.change(userPasswordInput, { target: { value: "Password 123" } });
    })
    expect(screen.getByText("スペースは使用できません。")).toBeInTheDocument();
})

test("サインアップ：ユーザー名が重複していた場合、エラーが発生するか", async () => {
    render(<LoginForm />)

    const userNameInput = screen.getByPlaceholderText("John_Smith");
    const passwordInput = screen.getByPlaceholderText("Password123");
    const submitButton = screen.getByText("サインアップ");

    await act(async () => {
        fireEvent.change(userNameInput, { target: { value: "John_Smith" } });
        fireEvent.change(passwordInput, { target: { value: "Password123" } })
        fireEvent.click(submitButton);
    })

    const errorText = await screen.findByText("ユーザー名が既に使用されています。");
    expect(errorText).toBeInTheDocument();
})

//サインイン関連
test("サインイン：パスワードにスペースを入れた場合、エラーが発生するか", async () => {
    render(<LoginForm />)

    await act(async () => {
        const isLoginOpen = screen.getByText("アカウントをお持ちの場合");
        fireEvent.click(isLoginOpen);
    });

    const userPasswordInput = screen.getAllByPlaceholderText("Password123");
    await act(async () => {
        fireEvent.change(userPasswordInput[1], { target: { value: "Password 123" } });
    });

    const errorMessages = screen.getAllByText("スペースは使用できません。");
    expect(errorMessages[1]).toBeInTheDocument();
})

test("サインイン：ユーザー名かパスワードが間違っていた場合、エラーが発生するか", async () => {
    render(<LoginForm />)

    await act(async () => {
        const isLoginOpen = screen.getByText("アカウントをお持ちの場合");
        fireEvent.click(isLoginOpen);
    })

    const userNameInput = screen.getAllByPlaceholderText("John_Smith");
    const passwordInput = screen.getAllByPlaceholderText("Password123");
    const submitButton = screen.getByText("サインイン");

    await act(async () => {
    fireEvent.change(userNameInput[1], { target: { value: "John_Smith" } });
    fireEvent.change(passwordInput[1], { target: { value: "Password123" } })
    fireEvent.click(submitButton);
    });

    const errorText = await screen.findByText("ユーザー名またはパスワードが違います。");
    expect(errorText).toBeInTheDocument();
})