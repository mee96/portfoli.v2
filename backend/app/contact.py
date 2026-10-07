import logging
import os

import resend
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field, field_validator

from app.ratelimit import SlidingWindowLimiter, client_ip

logger = logging.getLogger(__name__)

router = APIRouter()

CONTACT_RECIPIENT = "dev.mee96@gmail.com"
# Resend's shared testing domain. Swap for a verified custom domain once one
# exists — until then this is the only address Resend lets us send "from".
FROM_ADDRESS = "Bunsen <onboarding@resend.dev>"

MAX_NAME_CHARS = 100
MAX_MESSAGE_CHARS = 5000

# Emails per client IP per hour, plus a global ceiling that still holds if the
# client IP can't be trusted.
ip_limiter = SlidingWindowLimiter(limit=5, window_seconds=3600)
global_limiter = SlidingWindowLimiter(limit=40, window_seconds=3600)


class ContactRequest(BaseModel):
    name: str = Field(max_length=MAX_NAME_CHARS)
    email: EmailStr
    message: str = Field(max_length=MAX_MESSAGE_CHARS)

    @field_validator("name")
    @classmethod
    def single_line_name(cls, value: str) -> str:
        # The name goes into the email subject, so no line breaks.
        cleaned = " ".join(value.split())
        if not cleaned:
            raise ValueError("name must not be blank")
        return cleaned

    @field_validator("message")
    @classmethod
    def non_blank_message(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("message must not be blank")
        return cleaned


@router.post("/contact")
def send_contact_message(payload: ContactRequest, request: Request) -> dict[str, str]:
    if not (ip_limiter.allow(client_ip(request)) and global_limiter.allow("global")):
        raise HTTPException(status_code=429, detail="Too many messages, try again later.")

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
        # Keep the provider's error (it can mention keys or internal details)
        # in the logs, not in the response.
        logger.exception("Resend failed to deliver a contact message")
        raise HTTPException(status_code=500, detail="Could not send the message.") from exc

    return {"status": "sent"}
