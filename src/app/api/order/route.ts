import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, email, searchParams } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Пожалуйста, заполните все обязательные поля." },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append("formParams[first_name]", String(name).trim());
    formData.append("formParams[phone]", String(phone).trim());
    formData.append("formParams[email]", String(email).trim());
    formData.append("formParams[userCustomFields][19069802]", "true");
    formData.append("formParams[willCreatePaidDeal]", "1");
    formData.append("formParams[in_widget]", "1");
    formData.append(
      "__gc__internal__form__helper",
      "https://school.aisukam.ru/pl/lite/widget/widget?id=1656657"
    );

    // Forward UTM or tracking parameters if present
    if (searchParams) {
      try {
        const params = new URLSearchParams(searchParams);
        for (const [key, value] of params.entries()) {
          if (
            key.startsWith("utm_") ||
            key === "partner_code" ||
            key === "gcSession" ||
            key === "gcVisitor" ||
            key === "gcVisit"
          ) {
            formData.append(key, value);
          }
        }
      } catch {
        // ignore malformed search params
      }
    }

    const gcRes = await fetch(
      "https://school.aisukam.ru/pl/lite/block-public/process?id=2251411884",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        body: formData.toString(),
      }
    );

    const data = await gcRes.json();

    if (data.success && data.data?.redirectUrl) {
      return NextResponse.json({
        success: true,
        redirectUrl: data.data.redirectUrl,
        dealId: data.data.dealId,
      });
    }

    if (data.data?.error) {
      return NextResponse.json({ error: data.data.error }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Не удалось сформировать заказ. Попробуйте еще раз." },
      { status: 500 }
    );
  } catch (err) {
    console.error("Order processing error:", err);
    return NextResponse.json(
      { error: "Ошибка сервера при оформлении заказа." },
      { status: 500 }
    );
  }
}
