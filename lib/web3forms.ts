// Web3Forms access keys are public by design: they ship in the browser bundle
// either way. Submissions are delivered to info@eahac.com. Setting
// NEXT_PUBLIC_WEB3FORMS_KEY at build time overrides this default.
export const WEB3FORMS_KEY =
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "c07ed29a-c5f1-47ff-a3ea-1e78c98ca24c";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitWeb3Form(fields: Record<string, string>) {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...fields }),
    });
    const data: { success?: boolean; message?: string } | null = await res.json().catch(() => null);
    return { ok: res.ok && !!data?.success, status: res.status, message: data?.message };
}
