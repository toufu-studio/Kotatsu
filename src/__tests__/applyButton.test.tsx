import { expect, test, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import ApplyButton from "@/app/components/applyButton";

const { insertMock } = vi.hoisted(() => ({
    insertMock: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
    supabase: {
        from: vi.fn().mockReturnThis(),
        insert: insertMock,
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
        auth: {
            getUser: vi.fn().mockResolvedValue({
                data: {
                    user: {
                        id: "test-user-id",
                        user_metadata: { display_name: "テストユーザー" },
                    },
                },
                error: null
            }),
        }
    }
}))

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/themeContext", () => ({
    useBGTheme: () => ({ themeColor: "rgb(249, 250, 251)" }),
}));

beforeEach(() => {
    insertMock.mockReset();
    insertMock.mockResolvedValue({ data: null, error: null });
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

const openAndFillForm = async () => {
    render(<ApplyButton />);

    fireEvent.click(screen.getByText("トピックを応募"));
    fireEvent.change(screen.getByPlaceholderText("新作のゲームでおすすめ教えて"), {
        target: { value: "テストタイトル" },
    });
    fireEvent.change(screen.getByPlaceholderText("最初に投稿される文章を入力..."), {
        target: { value: "テスト投稿" },
    });
};

test("募集時間外に応募ボタンを押した場合、エラーが発生するか", async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date(2026, 0, 1, 0, 50));

    await openAndFillForm();

    vi.setSystemTime(new Date(2026, 0, 1, 1, 0));

    await act(async () => {
        vi.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByText("応募する"));

    const errorText = screen.getByText("募集時間外です :)")
    expect(errorText).toBeInTheDocument();
})

test("ユーザーが1回の募集で2件の応募を行った場合、エラーが発生するか", async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date(2026, 0, 1, 0, 50));

    insertMock.mockResolvedValueOnce({
        data: null,
        error: { code: '23505' }
    });

    await openAndFillForm();

    await act(async () => {
        fireEvent.click(screen.getByText("応募する"));
    });

    const errorText = screen.getByText("既に応募済みです :)")
    expect(errorText).toBeInTheDocument();
    expect(screen.queryByText("応募が完了しました！ :)")).not.toBeInTheDocument();
});

test("応募に失敗した場合、成功表示を出さず入力内容を保持する", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 0, 50));

    insertMock.mockResolvedValueOnce({
        data: null,
        error: { code: "42501" },
    });

    await openAndFillForm();

    await act(async () => {
        fireEvent.click(screen.getByText("応募する"));
    });

    expect(screen.getByText("応募に失敗しました。もう一度お試しください。")).toBeInTheDocument();
    expect(screen.queryByText("応募が完了しました！ :)")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("テストタイトル")).toBeInTheDocument();
    expect(screen.getByDisplayValue("テスト投稿")).toBeInTheDocument();
});

test("応募に成功した場合だけ完了メッセージを表示する", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 0, 50));

    await openAndFillForm();

    await act(async () => {
        fireEvent.click(screen.getByText("応募する"));
    });

    expect(screen.getByText("応募が完了しました！ :)")).toBeInTheDocument();
    expect(screen.queryByText("応募に失敗しました。もう一度お試しください。")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("新作のゲームでおすすめ教えて")).toHaveValue("");
    expect(screen.getByPlaceholderText("最初に投稿される文章を入力...")).toHaveValue("");
});
