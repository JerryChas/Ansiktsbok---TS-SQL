export const errorHandler = (err) => {
    if (err instanceof Error) {
        console.error("Error message:", err.message);
    }
    else {
        console.error("Unexpected error", err);
    }
};
