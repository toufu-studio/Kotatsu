"use client";

export default function tos() {
    return (
        <div className="flex fixed w-screen h-screen inset-0 bg-white z-50 justify-center overflow-auto">
            <div className="flex flex-col text-center mt-20 w-250 text-left">
                <h1 className="text-5xl mb-10 font-bold">プライバシーポリシー</h1>
                <h2 className="text-2xl font-bold my-5">定義</h2>
                <p>
                    &nbsp;&nbsp;&nbsp;個人情報とは、特定の個人を識別できる情報（氏名、生年月日、メールアドレス等）のことをいいます。
                </p>
                <h2 className="text-2xl font-bold my-5">個人情報の取得</h2>
                <p>
                    &nbsp;&nbsp;&nbsp;1&nbsp;本サービスでは、ユーザー登録時に個人情報を一切取得いたしません。<br/>
                     &nbsp;&nbsp;&nbsp;2&nbsp;登録アカウントの識別は、システムが自動発行する識別子（ユーザーID）のみを用いて行います。
                </p>
                <h2 className="text-2xl font-bold my-5">データの収集について</h2>
                <p>
                    &nbsp;&nbsp;&nbsp;本サービスでは、サービスの保守やセキュリティ維持、および利便性向上のためにIPアドレス、Cookie等の情報を自動的に収集する場合があります。
                </p>
                <h2 className="text-2xl font-bold my-5">データの利用について</h2>
                <p>
                    &nbsp;&nbsp;&nbsp;収集したデータは、不正利用の防止、サービスの改善および統計データの分析の目的にのみ利用します。
                </p>
            </div>
        </div>
    )
}