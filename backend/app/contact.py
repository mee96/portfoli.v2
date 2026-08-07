import os

import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter()

CONTACT_RECIPIENT = "dev.mee96@gmail.com"
# Resend's shared testing domain. Swap for a verified custom domain once one
# exists — until then this is the only address Resend lets us send "from".
FROM_ADDRESS = "Bunsen <onboarding@resend.dev>"


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


@router.post("/contact")
def send_contact_message(payload: ContactRequest) -> dict[str, str]:
    resend.api_key = os.environ["RESEND_API_KEY"]

    try:
        resend.Emails.send(
            {
                "from": FROM_ADDRESS,
                "to": [CONTACT_RECIPIENT],
                "reply_to": payload.email,
                "subject": f"Portfolio contact — {payload.name}",
                "text": f"De: {payload.name} <{payload.email}>\n\n{payload.message}",
            }
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {"status": "sent"}
