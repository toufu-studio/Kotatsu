import { expect, test, vi, afterEach } from "vitest"
import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import ApplyButton from "@/app/components/applyButton";
import { supabase } from "@/lib/supabase";
import { error } from "console";

vi.mock("@/lib/supabase", () => ({
    supabase: {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockResolvedValue({ data: null, error: null }),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
        auth: {
            getUser: vi.fn().mockResolvedValue({
                data: { user: { id: "test-user-id" } },
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

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});


test("募集時間外に応募ボタンを押した場合、エラーが発生するか", async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date(2026, 0, 1, 0, 50));

    render(<ApplyButton />)

    await act(async () => {
        const applyButton = screen.getByText("トピックを応募")
        fireEvent.click(applyButton);
    });

    await act(async () => {
        const titleInput = screen.getByPlaceholderText("新作のゲームでおすすめ教えて")
        fireEvent.change(titleInput, { target: { value: "テストタイトル" } });

        const postInput = screen.getByPlaceholderText("セールが来てるのに何買えばいいかわからないので頼む")
        fireEvent.change(postInput, { target: { value: "テスト投稿" } });
    });

    vi.setSystemTime(new Date(2026, 0, 1, 1, 0));

    await act(async () => {
        vi.advanceTimersByTime(1000);
    });

    await act(async () => {
        const submitButton = screen.getByText("応募する")
        fireEvent.click(submitButton);
    });

    const errorText = screen.getByText("募集時間外です :)")
    expect(errorText).toBeInTheDocument();
})

test("ユーザーが1回の募集で2件の応募を行った場合、エラーが発生するか", async () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date(2026, 0, 1, 0, 50));

    const mockInsert = vi.mocked(supabase.insert) as any;
    mockInsert.mockResolvedValueOnce({
        data: null,
        error: { code: '23505' } as any
    });

    render(<ApplyButton />)

    await act(async () => {
        const applyButton = screen.getByText("トピックを応募")
        fireEvent.click(applyButton);
    });

    await act(async () => {
        const titleInput = screen.getByPlaceholderText("新作のゲームでおすすめ教えて")
        fireEvent.change(titleInput, { target: { value: "テストタイトル" } });

        const postInput = screen.getByPlaceholderText("セールが来てるのに何買えばいいかわからないので頼む")
        fireEvent.change(postInput, { target: { value: "テスト投稿" } });
    });

    await act(async () => {
        vi.advanceTimersByTime(1000);
    });

    await act(async () => {
        const submitButton = screen.getByText("応募する")
        fireEvent.click(submitButton);
        await vi.runAllTicks();
    });

    const errorText = screen.getByText("既に応募済みです :)")
    expect(errorText).toBeInTheDocument();
})