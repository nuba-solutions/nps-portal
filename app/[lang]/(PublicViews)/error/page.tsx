import { redirect } from "next/navigation";

export default async function NotFound({params : {lang}}: any) {
    redirect(`/${lang}/404`);
}
