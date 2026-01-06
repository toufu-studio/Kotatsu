"use client";

export default function tos() {
    return (
        <div className="flex fixed w-screen h-screen inset-0 bg-white z-50 justify-center overflow-auto">
            <div className="flex flex-col text-center mt-20 mx-10 w-250 text-left h-250">
                <h1 className="text-5xl mb-10 font-bold">プライバシーポリシー</h1>
                <h2 className="text-2xl font-bold my-5">定義</h2>
                <p>
                    個人情報とは、特定の個人を識別できる情報（氏名、生年月日、メールアドレス等）のことをいいます。
                </p>
                <h2 className="text-2xl font-bold my-5">個人情報の取得</h2>
                <p>
                    1&nbsp;&nbsp;&nbsp;本サービスでは、ユーザー登録時に個人情報を一切取得いたしません。<br/>
                    2&nbsp;&nbsp;&nbsp;登録アカウントの識別は、システムが自動発行する識別子（ユーザーID）のみを用いて行います。
                </p>
                <h2 className="text-2xl font-bold my-5">データの収集について</h2>
                <p>
                    本サービスでは、サービスの保守やセキュリティ維持、および利便性向上のためにIPアドレス、Cookie等の情報を自動的に収集する場合があります。
                </p>
                <h2 className="text-2xl font-bold my-5">データの利用について</h2>
                <p>
                    収集したデータは、不正利用の防止、サービスの改善および統計データの分析の目的にのみ利用します。
                </p>
                <h2 className="text-2xl font-bold my-5">アカウント削除後のデータについて</h2>
                <p>
                    1&nbsp;&nbsp;&nbsp;アカウントを削除した場合も、投稿やトピック等に紐づけられた識別子は消去されないことがあります。<br/>
                    2&nbsp;&nbsp;&nbsp;削除前に投稿された文章については、ユーザー名も含め、引き続きサービス上に掲載されます。
                </p>
                <h2 className="text-2xl font-bold my-5">第三者への提供について</h2>
                <p>
                    法令に基づく場合を除き、同意なく第三者へのデータの提供は致しません。
                </p>
            </div>
        </div>
    )
}