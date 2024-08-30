export const errorHandler = (err: unknown) => {

  if (err instanceof Error) {
    console.error("Error message:", err.message)
  } else {
    console.error("Unexpected error", err);
  }
}