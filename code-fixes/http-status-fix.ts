
import { NextResponse } from "next/server";
import { ContactSchema } from "./server-action-validation";

export async function POST(request: Request) {
  let body: unknown;

  // Reject malformed JSON requests.
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON request body.",
      },
      { status: 400 }
    );
  }

  // Validate untrusted input on the server.
  const result = ContactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        errors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const contact = result.data;

  try {
    // TODO: Persist the validated contact using the
    // application's actual data-access layer.
    //
    // Return success only after the required operation
    // completes successfully.

    return NextResponse.json(
      {
        success: true,
        message: "Contact request processed.",
      },
      { status: 200 }
    );
  } catch {
    // Log a sanitized error with a request identifier
    // in a real production implementation.
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process the request.",
      },
      { status: 500 }
    );
  }
}
